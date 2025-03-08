-- AlterTable
ALTER TABLE `Trade` ADD COLUMN `tradeSignalId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Trade` ADD CONSTRAINT `Trade_tradeSignalId_fkey` FOREIGN KEY (`tradeSignalId`) REFERENCES `Tradesignal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
