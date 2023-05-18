/*
  Warnings:

  - You are about to drop the `_DepartmentLabToExperiment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_DepartmentLabToExperiment` DROP FOREIGN KEY `_DepartmentLabToExperiment_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DepartmentLabToExperiment` DROP FOREIGN KEY `_DepartmentLabToExperiment_B_fkey`;

-- AlterTable
ALTER TABLE `DepartmentLab` ADD COLUMN `experimentId` INTEGER NULL;

-- DropTable
DROP TABLE `_DepartmentLabToExperiment`;

-- AddForeignKey
ALTER TABLE `DepartmentLab` ADD CONSTRAINT `DepartmentLab_experimentId_fkey` FOREIGN KEY (`experimentId`) REFERENCES `Experiment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
