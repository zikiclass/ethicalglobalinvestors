/*
  Warnings:

  - You are about to drop the column `tradeSignalId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the `Tradesignal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Trade` DROP FOREIGN KEY `Trade_tradeSignalId_fkey`;

-- AlterTable
ALTER TABLE `Trade` DROP COLUMN `tradeSignalId`,
    ADD COLUMN `duration` INTEGER NULL;

-- DropTable
DROP TABLE `Tradesignal`;
