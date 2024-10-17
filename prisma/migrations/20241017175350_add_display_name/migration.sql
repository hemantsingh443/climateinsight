
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Create new_User table
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "displayName" TEXT,  -- Initially as nullable
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Insert existing records into new_User from User table
INSERT INTO "new_User" ("createdAt", "id", "password", "updatedAt", "username")
SELECT "createdAt", "id", "password", "updatedAt", "username" FROM "User";

-- Drop old User table
DROP TABLE "User";

-- Rename new_User to User
ALTER TABLE "new_User" RENAME TO "User";

-- Update existing records with username as displayName
UPDATE "User" SET "displayName" = username WHERE "displayName" IS NULL;

-- Create unique index on username
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- Make the displayName column required
-- Note: You cannot directly alter a column to set it as NOT NULL after creation.
-- You will need to create a new table with the NOT NULL constraint.
CREATE TABLE "User_temp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,  -- Now required
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Copy data from User to User_temp
INSERT INTO "User_temp" ("id", "username", "displayName", "password", "createdAt", "updatedAt")
SELECT "id", "username", "displayName", "password", "createdAt", "updatedAt" FROM "User";

-- Drop the original User table
DROP TABLE "User";

-- Rename User_temp to User
ALTER TABLE "User_temp" RENAME TO "User";

-- Re-enable foreign keys
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

