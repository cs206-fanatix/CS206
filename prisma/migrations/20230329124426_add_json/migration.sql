/*
  Warnings:

  - Added the required column `attributes` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creators` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "attributes" JSON NOT NULL,
ADD COLUMN     "creators" JSON NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;
