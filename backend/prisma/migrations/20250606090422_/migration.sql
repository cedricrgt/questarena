-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "image_url" TEXT;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
