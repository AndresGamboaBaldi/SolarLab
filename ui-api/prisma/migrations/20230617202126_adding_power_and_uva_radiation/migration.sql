/*
  Warnings:

  - Added the required column `power` to the `DepartmentLab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uvaRadiation` to the `DepartmentLab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DepartmentLab` ADD COLUMN `power` DOUBLE NOT NULL,
    ADD COLUMN `uvaRadiation` DOUBLE NOT NULL;
