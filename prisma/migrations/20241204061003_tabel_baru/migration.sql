/*
  Warnings:

  - You are about to drop the `pengembalian` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pengembalian` DROP FOREIGN KEY `pengembalian_borrow_id_fkey`;

-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `actual_return_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `pengembalian`;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);
