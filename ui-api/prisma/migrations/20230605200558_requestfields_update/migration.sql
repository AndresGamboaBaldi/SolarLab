/*
  Warnings:

  - You are about to drop the column `email` on the `Request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Request` DROP FOREIGN KEY `Request_email_fkey`;

-- AlterTable
ALTER TABLE `Request` DROP COLUMN `email`,
    ADD COLUMN `studentEmail` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_studentEmail_fkey` FOREIGN KEY (`studentEmail`) REFERENCES `Student`(`userEmail`) ON DELETE SET NULL ON UPDATE CASCADE;
