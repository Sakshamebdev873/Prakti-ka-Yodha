/*
  Warnings:

  - Changed the type of `habitType` on the `CarbonLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `authorId` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `period` on the `Leaderboard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."LeaderboardPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME');

-- CreateEnum
CREATE TYPE "public"."HabitType" AS ENUM ('TRANSPORT', 'DIET', 'ENERGY', 'SHOPPING', 'OTHER');

-- AlterTable
ALTER TABLE "public"."CarbonLog" DROP COLUMN "habitType",
ADD COLUMN     "habitType" "public"."HabitType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Challenge" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Leaderboard" DROP COLUMN "period",
ADD COLUMN     "period" "public"."LeaderboardPeriod" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClassroomUser" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassroomUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_joinCode_key" ON "public"."Classroom"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "ClassroomUser_classroomId_studentId_key" ON "public"."ClassroomUser"("classroomId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "CarbonLog_userId_date_habitType_key" ON "public"."CarbonLog"("userId", "date", "habitType");

-- AddForeignKey
ALTER TABLE "public"."Challenge" ADD CONSTRAINT "Challenge_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassroomUser" ADD CONSTRAINT "ClassroomUser_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "public"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassroomUser" ADD CONSTRAINT "ClassroomUser_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
