/*
  Warnings:

  - You are about to drop the column `whatsappnumbeer` on the `Whatsapp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Whatsapp` DROP COLUMN `whatsappnumbeer`,
    ADD COLUMN `whatsappnumber` VARCHAR(191) NULL;
