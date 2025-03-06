/*
  Warnings:

  - You are about to alter the column `leverage` on the `TradeSignal` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `TradeSignal` MODIFY `leverage` DOUBLE NOT NULL;
