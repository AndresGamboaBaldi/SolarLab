/*
  Warnings:

  - Added the required column `modified` to the `Experiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Experiment` ADD COLUMN `modified` DATETIME(3) NOT NULL,
    MODIFY `experimentDatetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
