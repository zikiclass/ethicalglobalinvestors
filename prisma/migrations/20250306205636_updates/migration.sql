/*
  Warnings:

  - You are about to drop the column `amount` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `TradeSignal` table. All the data in the column will be lost.
  - Added the required column `amount` to the `TradeSignal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leverage` to the `TradeSignal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Trade` DROP COLUMN `amount`,
    DROP COLUMN `symbol`;

-- AlterTable
ALTER TABLE `TradeSignal` DROP COLUMN `symbol`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `leverage` INTEGER NOT NULL,
    ADD COLUMN `profit` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
