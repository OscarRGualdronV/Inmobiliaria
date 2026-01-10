/*
  Warnings:

  - The values [FANEGADAS] on the enum `AreaUnidad` will be removed. If these variants are still used in the database, this will fail.
  - The values [ALQUILADO,NO_DISPONIBLE] on the enum `EstadoInmueble` will be removed. If these variants are still used in the database, this will fail.
  - The values [EUR] on the enum `Moneda` will be removed. If these variants are still used in the database, this will fail.
  - The values [EDIFICIO] on the enum `TipoInmueble` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `contactos` on the `Inmueble` table. All the data in the column will be lost.
  - You are about to drop the column `publicado` on the `Inmueble` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Inmueble` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vendedorId` to the `Inmueble` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AreaUnidad_new" AS ENUM ('METROS_CUADRADOS', 'HECTAREAS');
ALTER TABLE "Inmueble" ALTER COLUMN "areaUnidad" DROP DEFAULT;
ALTER TABLE "Inmueble" ALTER COLUMN "areaUnidad" TYPE "AreaUnidad_new" USING ("areaUnidad"::text::"AreaUnidad_new");
ALTER TYPE "AreaUnidad" RENAME TO "AreaUnidad_old";
ALTER TYPE "AreaUnidad_new" RENAME TO "AreaUnidad";
DROP TYPE "AreaUnidad_old";
ALTER TABLE "Inmueble" ALTER COLUMN "areaUnidad" SET DEFAULT 'METROS_CUADRADOS';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EstadoInmueble_new" AS ENUM ('DISPONIBLE', 'VENDIDO', 'RESERVADO');
ALTER TABLE "Inmueble" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Inmueble" ALTER COLUMN "estado" TYPE "EstadoInmueble_new" USING ("estado"::text::"EstadoInmueble_new");
ALTER TYPE "EstadoInmueble" RENAME TO "EstadoInmueble_old";
ALTER TYPE "EstadoInmueble_new" RENAME TO "EstadoInmueble";
DROP TYPE "EstadoInmueble_old";
ALTER TABLE "Inmueble" ALTER COLUMN "estado" SET DEFAULT 'DISPONIBLE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Moneda_new" AS ENUM ('COP', 'USD');
ALTER TABLE "Inmueble" ALTER COLUMN "moneda" DROP DEFAULT;
ALTER TABLE "Inmueble" ALTER COLUMN "moneda" TYPE "Moneda_new" USING ("moneda"::text::"Moneda_new");
ALTER TYPE "Moneda" RENAME TO "Moneda_old";
ALTER TYPE "Moneda_new" RENAME TO "Moneda";
DROP TYPE "Moneda_old";
ALTER TABLE "Inmueble" ALTER COLUMN "moneda" SET DEFAULT 'COP';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoInmueble_new" AS ENUM ('APARTAMENTO', 'CASA', 'LOTE_URBANO', 'PREDIO_RURAL', 'FINCA', 'OFICINA', 'LOCAL_COMERCIAL', 'BODEGA', 'OTRO');
ALTER TABLE "Inmueble" ALTER COLUMN "tipo" TYPE "TipoInmueble_new" USING ("tipo"::text::"TipoInmueble_new");
ALTER TYPE "TipoInmueble" RENAME TO "TipoInmueble_old";
ALTER TYPE "TipoInmueble_new" RENAME TO "TipoInmueble";
DROP TYPE "TipoInmueble_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Inmueble" DROP CONSTRAINT "Inmueble_usuarioId_fkey";

-- DropIndex
DROP INDEX "Inmueble_publicado_idx";

-- AlterTable
ALTER TABLE "Inmueble" DROP COLUMN "contactos",
DROP COLUMN "publicado",
DROP COLUMN "usuarioId",
ADD COLUMN     "destacado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vendedorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Vendedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT,
    "whatsapp" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendedor_email_key" ON "Vendedor"("email");

-- CreateIndex
CREATE INDEX "Inmueble_destacado_idx" ON "Inmueble"("destacado");

-- AddForeignKey
ALTER TABLE "Inmueble" ADD CONSTRAINT "Inmueble_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Vendedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
