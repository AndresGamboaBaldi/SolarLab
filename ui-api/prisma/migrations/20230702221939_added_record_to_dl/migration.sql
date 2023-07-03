/*
  Warnings:

  - Added the required column `record` to the `Datalogger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Datalogger` ADD COLUMN `record` INTEGER NOT NULL;
