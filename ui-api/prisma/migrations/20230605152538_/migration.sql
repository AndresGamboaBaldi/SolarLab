/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - You are about to alter the column `B` on the `_CourseToStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_RequestToStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[userEmail]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `Experiment` DROP FOREIGN KEY `Experiment_studentEmail_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseToStudent` DROP FOREIGN KEY `_CourseToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_RequestToStudent` DROP FOREIGN KEY `_RequestToStudent_B_fkey`;

-- DropIndex
DROP INDEX `Student_email_key` ON `Student`;

-- AlterTable
ALTER TABLE `Experiment` ADD COLUMN `courseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Request` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `code`,
    DROP COLUMN `email`,
    DROP COLUMN `fullname`,
    DROP COLUMN `password`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Teacher` DROP PRIMARY KEY,
    DROP COLUMN `code`,
    DROP COLUMN `email`,
    DROP COLUMN `fullname`,
    DROP COLUMN `password`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_CourseToStudent` MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_RequestToStudent` MODIFY `B` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `fullname` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_userEmail_key` ON `Student`(`userEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `Teacher_userEmail_key` ON `Teacher`(`userEmail`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`userEmail`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiment` ADD CONSTRAINT `Experiment_studentEmail_fkey` FOREIGN KEY (`studentEmail`) REFERENCES `Student`(`userEmail`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiment` ADD CONSTRAINT `Experiment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RequestToStudent` ADD CONSTRAINT `_RequestToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
