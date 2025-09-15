-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_institutionId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "institutionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "public"."Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
