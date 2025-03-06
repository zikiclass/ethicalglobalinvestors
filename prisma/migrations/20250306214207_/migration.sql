/*
  Warnings:

  - You are about to drop the `TradeSignal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TradeSignal`;

-- CreateTable
CREATE TABLE `Tradesignal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `leverage` DOUBLE NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `profit` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
