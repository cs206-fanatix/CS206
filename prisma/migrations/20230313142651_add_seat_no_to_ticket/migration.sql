/*
  Warnings:

  - Added the required column `seatNo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "seatNo" INTEGER NOT NULL;
