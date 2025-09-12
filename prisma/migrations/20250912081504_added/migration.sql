/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Institution" ADD COLUMN     "joinCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Institution_joinCode_key" ON "public"."Institution"("joinCode");
