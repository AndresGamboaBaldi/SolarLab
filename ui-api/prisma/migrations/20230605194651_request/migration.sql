/*
  Warnings:

  - You are about to drop the `_RequestToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RequestToStudent` DROP FOREIGN KEY `_RequestToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RequestToStudent` DROP FOREIGN KEY `_RequestToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `Request` ADD COLUMN `email` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_RequestToStudent`;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_email_fkey` FOREIGN KEY (`email`) REFERENCES `Student`(`userEmail`) ON DELETE SET NULL ON UPDATE CASCADE;
