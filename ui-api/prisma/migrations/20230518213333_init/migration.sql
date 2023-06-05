-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `experimentDatetime` DATETIME(3) NOT NULL,
    `studentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DepartmentLab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentName` VARCHAR(191) NOT NULL,
    `panelangle` INTEGER NOT NULL,
    `current` DOUBLE NOT NULL,
    `voltage` DOUBLE NOT NULL,
    `radiation` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EfficiencyTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestRecord` (
    `time` DATETIME(3) NOT NULL,
    `record` INTEGER NOT NULL,
    `radiation` DOUBLE NOT NULL,
    `current` DOUBLE NOT NULL,
    `voltage` DOUBLE NOT NULL,
    `efficiencyTestId` INTEGER NULL,

    PRIMARY KEY (`time`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DepartmentLabToExperiment` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DepartmentLabToExperiment_AB_unique`(`A`, `B`),
    INDEX `_DepartmentLabToExperiment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experiment` ADD CONSTRAINT `Experiment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestRecord` ADD CONSTRAINT `TestRecord_efficiencyTestId_fkey` FOREIGN KEY (`efficiencyTestId`) REFERENCES `EfficiencyTest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartmentLabToExperiment` ADD CONSTRAINT `_DepartmentLabToExperiment_A_fkey` FOREIGN KEY (`A`) REFERENCES `DepartmentLab`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartmentLabToExperiment` ADD CONSTRAINT `_DepartmentLabToExperiment_B_fkey` FOREIGN KEY (`B`) REFERENCES `Experiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
