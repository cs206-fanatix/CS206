-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_buyerUserId_fkey";

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "buyerUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_buyerUserId_fkey" FOREIGN KEY ("buyerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
