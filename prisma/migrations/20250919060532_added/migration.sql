/*
  Warnings:

  - A unique constraint covering the columns `[studentId,challengeId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `challengeId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "challengeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."PlayedGame" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayedGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayedGame_studentId_gameId_key" ON "public"."PlayedGame"("studentId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_studentId_challengeId_key" ON "public"."Project"("studentId", "challengeId");

-- AddForeignKey
ALTER TABLE "public"."PlayedGame" ADD CONSTRAINT "PlayedGame_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
