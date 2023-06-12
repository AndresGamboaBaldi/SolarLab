/*
  Warnings:

  - You are about to drop the column `experimentDatetime` on the `Experiment` table. All the data in the column will be lost.
  - Added the required column `experimentDate` to the `Experiment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experimentTime` to the `Experiment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Experiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Experiment` DROP COLUMN `experimentDatetime`,
    ADD COLUMN `experimentDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `experimentTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `timezone` VARCHAR(191) NOT NULL;
