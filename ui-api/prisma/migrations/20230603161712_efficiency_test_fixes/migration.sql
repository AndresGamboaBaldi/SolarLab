/*
  Warnings:

  - The primary key for the `TestRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `efficiencyTestId` on the `TestRecord` table. All the data in the column will be lost.
  - You are about to drop the column `radiation` on the `TestRecord` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `TestRecord` table. All the data in the column will be lost.
  - You are about to drop the `EfficiencyTest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `TestRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TestRecord` DROP FOREIGN KEY `TestRecord_efficiencyTestId_fkey`;

-- AlterTable
ALTER TABLE `TestRecord` DROP PRIMARY KEY,
    DROP COLUMN `efficiencyTestId`,
    DROP COLUMN `radiation`,
    DROP COLUMN `record`,
    ADD COLUMN `departmentlabId` INTEGER NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `EfficiencyTest`;

-- AddForeignKey
ALTER TABLE `TestRecord` ADD CONSTRAINT `TestRecord_departmentlabId_fkey` FOREIGN KEY (`departmentlabId`) REFERENCES `DepartmentLab`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
