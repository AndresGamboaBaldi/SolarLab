/*
  Warnings:

  - You are about to drop the `Radiation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UVARadiation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Radiation`;

-- DropTable
DROP TABLE `UVARadiation`;

-- CreateTable
CREATE TABLE `Datalogger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` DATETIME(3) NOT NULL,
    `solarRadiationCMP` DOUBLE NOT NULL,
    `solarRadiationCMPAvg` DOUBLE NOT NULL,
    `uvaRadiationLP` DOUBLE NOT NULL,
    `uvaRadiationLPAvg` DOUBLE NOT NULL,
    `batteryVoltage` DOUBLE NOT NULL,
    `dataloggerTemperature` DOUBLE NOT NULL,
    `voltage` DOUBLE NULL,
    `current` DOUBLE NULL,
    `solarRadiationCS320` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
