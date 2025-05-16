/*
  Warnings:

  - You are about to drop the column `target_id` on the `Vote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_challenge_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_participation_fkey";

-- DropIndex
DROP INDEX "Vote_users_id_target_id_target_type_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "target_id",
ADD COLUMN     "challenge_id" TEXT,
ADD COLUMN     "participation_id" TEXT;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_participation_id_fkey" FOREIGN KEY ("participation_id") REFERENCES "Participation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
