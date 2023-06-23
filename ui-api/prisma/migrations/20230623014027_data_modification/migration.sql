/*
  Warnings:

  - You are about to drop the column `code` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorized` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `TestRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `TestRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Teacher` ADD COLUMN `authorized` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `TestRecord` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `power` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `code`;

-- CreateTable
CREATE TABLE `UVARadiation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `uvaRadiation` DOUBLE NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
