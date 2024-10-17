
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcryptjs';

const prisma = new PrismaClient();

export async function createUser(username: string, password: string, displayName: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { error: 'Username already exists' };
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        displayName, // Add displayName here
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Error creating user' };
  }
}

export async function verifyUser(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return { error: 'Invalid password' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    console.error('Error verifying user:', error);
    return { error: 'Error verifying user' };
  }
}

