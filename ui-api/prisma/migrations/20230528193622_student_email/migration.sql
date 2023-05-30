/*
  Warnings:

  - You are about to drop the column `studentId` on the `Experiment` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Experiment` DROP FOREIGN KEY `Experiment_studentId_fkey`;

-- AlterTable
ALTER TABLE `Experiment` DROP COLUMN `studentId`,
    ADD COLUMN `studentEmail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`email`);

-- AddForeignKey
ALTER TABLE `Experiment` ADD CONSTRAINT `Experiment_studentEmail_fkey` FOREIGN KEY (`studentEmail`) REFERENCES `Student`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
