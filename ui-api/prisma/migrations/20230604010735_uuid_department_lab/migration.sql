/*
  Warnings:

  - The primary key for the `DepartmentLab` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `TestRecord` DROP FOREIGN KEY `TestRecord_departmentlabId_fkey`;

-- AlterTable
ALTER TABLE `DepartmentLab` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TestRecord` MODIFY `departmentlabId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TestRecord` ADD CONSTRAINT `TestRecord_departmentlabId_fkey` FOREIGN KEY (`departmentlabId`) REFERENCES `DepartmentLab`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
