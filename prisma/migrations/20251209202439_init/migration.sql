-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'VENDEDOR');

-- CreateEnum
CREATE TYPE "TipoInmueble" AS ENUM ('APARTAMENTO', 'CASA', 'LOTE_URBANO', 'PREDIO_RURAL', 'FINCA', 'OFICINA', 'LOCAL_COMERCIAL', 'BODEGA', 'EDIFICIO', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoInmueble" AS ENUM ('DISPONIBLE', 'RESERVADO', 'VENDIDO', 'ALQUILADO', 'NO_DISPONIBLE');

-- CreateEnum
CREATE TYPE "Moneda" AS ENUM ('COP', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "AreaUnidad" AS ENUM ('METROS_CUADRADOS', 'HECTAREAS', 'FANEGADAS');

-- CreateEnum
CREATE TYPE "Topografia" AS ENUM ('PLANA', 'ONDULADA', 'QUEBRADA', 'MONTANOSA');

-- CreateEnum
CREATE TYPE "ViaAcceso" AS ENUM ('PAVIMENTADA', 'DESTAPADA', 'TROCHA', 'FLUVIAL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "UserRole" NOT NULL DEFAULT 'VENDEDOR',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inmueble" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoInmueble" NOT NULL,
    "precio" INTEGER NOT NULL,
    "moneda" "Moneda" NOT NULL DEFAULT 'COP',
    "area" DOUBLE PRECISION,
    "areaUnidad" "AreaUnidad" NOT NULL DEFAULT 'METROS_CUADRADOS',
    "habitaciones" INTEGER,
    "banos" INTEGER,
    "pisos" INTEGER,
    "antiguedad" INTEGER,
    "estrato" INTEGER,
    "tieneGaraje" BOOLEAN NOT NULL DEFAULT false,
    "amoblado" BOOLEAN NOT NULL DEFAULT false,
    "imagenes" TEXT[],
    "direccion" TEXT,
    "ciudad" TEXT,
    "departamento" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "publicadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoInmueble" NOT NULL DEFAULT 'DISPONIBLE',
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "vistas" INTEGER NOT NULL DEFAULT 0,
    "contactos" INTEGER NOT NULL DEFAULT 0,
    "usuarioId" INTEGER NOT NULL,
    "topografia" "Topografia",
    "accesoAgua" BOOLEAN NOT NULL DEFAULT false,
    "accesoLuz" BOOLEAN NOT NULL DEFAULT false,
    "viaAcceso" "ViaAcceso",
    "cultivos" TEXT,

    CONSTRAINT "Inmueble_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Inmueble_tipo_idx" ON "Inmueble"("tipo");

-- CreateIndex
CREATE INDEX "Inmueble_ciudad_idx" ON "Inmueble"("ciudad");

-- CreateIndex
CREATE INDEX "Inmueble_precio_idx" ON "Inmueble"("precio");

-- CreateIndex
CREATE INDEX "Inmueble_publicado_idx" ON "Inmueble"("publicado");

-- CreateIndex
CREATE INDEX "Inmueble_estado_idx" ON "Inmueble"("estado");

-- AddForeignKey
ALTER TABLE "Inmueble" ADD CONSTRAINT "Inmueble_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
