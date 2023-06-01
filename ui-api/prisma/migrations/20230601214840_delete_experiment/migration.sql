-- DropForeignKey
ALTER TABLE `DepartmentLab` DROP FOREIGN KEY `DepartmentLab_experimentId_fkey`;

-- AddForeignKey
ALTER TABLE `DepartmentLab` ADD CONSTRAINT `DepartmentLab_experimentId_fkey` FOREIGN KEY (`experimentId`) REFERENCES `Experiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
