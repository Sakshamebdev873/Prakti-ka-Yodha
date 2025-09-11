/*
  Warnings:

  - Added the required column `institutionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."InstitutionType" AS ENUM ('SCHOOL', 'COLLEGE', 'UNIVERSITY', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "institutionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."InstitutionType" NOT NULL,
    "address" TEXT,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeacherInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "invitedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "public"."Institution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherInvitation_token_key" ON "public"."TeacherInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherInvitation_email_institutionId_key" ON "public"."TeacherInvitation"("email", "institutionId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeacherInvitation" ADD CONSTRAINT "TeacherInvitation_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
