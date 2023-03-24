/*
  Warnings:

  - You are about to drop the `Bid` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyerUserId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerUserId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_listingDateTime_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_userId_fkey";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "buyerUserId" TEXT NOT NULL,
ADD COLUMN     "sellerUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bid";

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_buyerUserId_fkey" FOREIGN KEY ("buyerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_sellerUserId_fkey" FOREIGN KEY ("sellerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
