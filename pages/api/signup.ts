// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, displayName, password } = req.body;

  if (!username || !displayName || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        username,
        displayName,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        createdAt: true,
      },
    });

    res.status(200).json({ 
      message: 'User created successfully',
      user 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
