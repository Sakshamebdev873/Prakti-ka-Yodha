-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Submission" ADD COLUMN     "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."ClassroomChallenge" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassroomChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassroomChallenge_classroomId_challengeId_key" ON "public"."ClassroomChallenge"("classroomId", "challengeId");

-- AddForeignKey
ALTER TABLE "public"."ClassroomChallenge" ADD CONSTRAINT "ClassroomChallenge_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "public"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassroomChallenge" ADD CONSTRAINT "ClassroomChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
