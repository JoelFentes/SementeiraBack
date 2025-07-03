/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `planta` table. All the data in the column will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Planta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `planta` DROP FOREIGN KEY `Planta_categoriaId_fkey`;

-- DropIndex
DROP INDEX `Planta_categoriaId_fkey` ON `planta`;

-- AlterTable
ALTER TABLE `planta` DROP COLUMN `categoriaId`,
    ADD COLUMN `categoria` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `categoria`;

-- CreateTable
CREATE TABLE `Carrinho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCarrinho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carrinhoId` INTEGER NOT NULL,
    `plantaId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrinho` ADD CONSTRAINT `ItemCarrinho_carrinhoId_fkey` FOREIGN KEY (`carrinhoId`) REFERENCES `Carrinho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrinho` ADD CONSTRAINT `ItemCarrinho_plantaId_fkey` FOREIGN KEY (`plantaId`) REFERENCES `Planta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
