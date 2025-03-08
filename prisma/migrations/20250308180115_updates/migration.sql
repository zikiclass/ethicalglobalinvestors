/*
  Warnings:

  - You are about to alter the column `userId` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `leverage` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Trade` ADD COLUMN `loss` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `leverage` DOUBLE NOT NULL;
