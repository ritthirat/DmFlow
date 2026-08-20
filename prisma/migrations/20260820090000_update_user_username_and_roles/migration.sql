-- Preserve existing user identities while aligning the model with the Username field.
ALTER TABLE "User" ADD COLUMN "Username" TEXT;

UPDATE "User"
SET "Username" = "email"
WHERE "Username" IS NULL;

ALTER TABLE "User" ALTER COLUMN "Username" SET NOT NULL;
DROP INDEX "User_email_key";
ALTER TABLE "User" DROP COLUMN "email";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT '2';

CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");
