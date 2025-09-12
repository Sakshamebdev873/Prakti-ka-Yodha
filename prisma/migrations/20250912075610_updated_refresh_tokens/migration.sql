/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."RefreshToken_hashedToken_key";

-- AlterTable
ALTER TABLE "public"."RefreshToken" DROP COLUMN "hashedToken";
