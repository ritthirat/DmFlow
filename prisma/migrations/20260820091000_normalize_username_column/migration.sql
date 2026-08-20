-- Normalize the database column name to match the Prisma username field.
ALTER TABLE "User" RENAME COLUMN "Username" TO "username";
DROP INDEX "User_Username_key";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
