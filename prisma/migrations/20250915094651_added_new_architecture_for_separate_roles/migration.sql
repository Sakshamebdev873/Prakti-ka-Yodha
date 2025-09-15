/*
  Warnings:

  - You are about to drop the column `userId` on the `BadgeUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CarbonLog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ForumPost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LeaderboardEntry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recommendation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `invitedBy` on the `TeacherInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserChallenge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WasteScan` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,badgeId]` on the table `BadgeUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,date,habitType]` on the table `CarbonLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaderboardId,studentId]` on the table `LeaderboardEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,challengeId]` on the table `UserChallenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `BadgeUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `CarbonLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `ForumPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `LeaderboardEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Pledge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invitedByAccountId` to the `TeacherInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `UserChallenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `WasteScan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BadgeUser" DROP CONSTRAINT "BadgeUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CarbonLog" DROP CONSTRAINT "CarbonLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Challenge" DROP CONSTRAINT "Challenge_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Classroom" DROP CONSTRAINT "Classroom_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClassroomUser" DROP CONSTRAINT "ClassroomUser_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ForumPost" DROP CONSTRAINT "ForumPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LeaderboardEntry" DROP CONSTRAINT "LeaderboardEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pledge" DROP CONSTRAINT "Pledge_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recommendation" DROP CONSTRAINT "Recommendation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserChallenge" DROP CONSTRAINT "UserChallenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WasteScan" DROP CONSTRAINT "WasteScan_userId_fkey";

-- DropIndex
DROP INDEX "public"."BadgeUser_userId_badgeId_key";

-- DropIndex
DROP INDEX "public"."CarbonLog_userId_date_habitType_key";

-- DropIndex
DROP INDEX "public"."LeaderboardEntry_leaderboardId_userId_key";

-- DropIndex
DROP INDEX "public"."UserChallenge_userId_challengeId_key";

-- AlterTable
ALTER TABLE "public"."BadgeUser" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."CarbonLog" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ForumPost" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."LeaderboardEntry" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Pledge" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Recommendation" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."RefreshToken" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TeacherInvitation" DROP COLUMN "invitedBy",
ADD COLUMN     "invitedByAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserChallenge" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."WasteScan" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InstitutionAdmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "accountId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,

    CONSTRAINT "InstitutionAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "accountId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "ecoScore" INTEGER NOT NULL DEFAULT 0,
    "streakCount" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3),
    "accountId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AcademicProfile" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "branch" TEXT,
    "degree" TEXT,
    "yearOfStudy" INTEGER,
    "grade" TEXT,
    "section" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "public"."Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_accountId_key" ON "public"."Admin"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionAdmin_accountId_key" ON "public"."InstitutionAdmin"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_accountId_key" ON "public"."Teacher"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_accountId_key" ON "public"."Student"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicProfile_studentId_key" ON "public"."AcademicProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeUser_studentId_badgeId_key" ON "public"."BadgeUser"("studentId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "CarbonLog_studentId_date_habitType_key" ON "public"."CarbonLog"("studentId", "date", "habitType");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_leaderboardId_studentId_key" ON "public"."LeaderboardEntry"("leaderboardId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserChallenge_studentId_challengeId_key" ON "public"."UserChallenge"("studentId", "challengeId");

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InstitutionAdmin" ADD CONSTRAINT "InstitutionAdmin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InstitutionAdmin" ADD CONSTRAINT "InstitutionAdmin_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Teacher" ADD CONSTRAINT "Teacher_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Teacher" ADD CONSTRAINT "Teacher_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeacherInvitation" ADD CONSTRAINT "TeacherInvitation_invitedByAccountId_fkey" FOREIGN KEY ("invitedByAccountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BadgeUser" ADD CONSTRAINT "BadgeUser_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Challenge" ADD CONSTRAINT "Challenge_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChallenge" ADD CONSTRAINT "UserChallenge_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pledge" ADD CONSTRAINT "Pledge_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ForumPost" ADD CONSTRAINT "ForumPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WasteScan" ADD CONSTRAINT "WasteScan_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CarbonLog" ADD CONSTRAINT "CarbonLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recommendation" ADD CONSTRAINT "Recommendation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassroomUser" ADD CONSTRAINT "ClassroomUser_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AcademicProfile" ADD CONSTRAINT "AcademicProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
