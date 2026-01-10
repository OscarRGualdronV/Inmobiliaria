import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Obtener todos los parámetros de filtro
    const tipo = searchParams.get("tipo");
    const ciudad = searchParams.get("ciudad");
    const departamento = searchParams.get("departamento");
    const minPrecio = searchParams.get("minPrecio");
    const maxPrecio = searchParams.get("maxPrecio");
    const minHabitaciones = searchParams.get("minHabitaciones");
    const minBanos = searchParams.get("minBanos");
    const minArea = searchParams.get("minArea");
    const maxArea = searchParams.get("maxArea");
    const estrato = searchParams.get("estrato");
    const estado = searchParams.get("estado") || "DISPONIBLE";
    const destacado = searchParams.get("destacado");
    const search = searchParams.get("search");
    const tieneGaraje = searchParams.get("tieneGaraje");
    const amoblado = searchParams.get("amoblado");
    const accesoAgua = searchParams.get("accesoAgua");
    const accesoLuz = searchParams.get("accesoLuz");
    const topografia = searchParams.get("topografia");
    const viaAcceso = searchParams.get("viaAcceso");

    // Construir objeto de filtros
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Filtro por estado
    if (estado) {
      where.estado = estado;
    }

    // Filtro por tipo
    if (tipo) {
      where.tipo = tipo;
    }

    // Filtro por ciudad
    if (ciudad) {
      where.ciudad = {
        contains: ciudad,
        mode: "insensitive",
      };
    }

    // Filtro por departamento
    if (departamento) {
      where.departamento = {
        contains: departamento,
        mode: "insensitive",
      };
    }

    // Filtro por precio
    if (minPrecio || maxPrecio) {
      where.precio = {};
      if (minPrecio) where.precio.gte = parseInt(minPrecio);
      if (maxPrecio) where.precio.lte = parseInt(maxPrecio);
    }

    // Filtro por habitaciones
    if (minHabitaciones) {
      where.habitaciones = parseInt(minHabitaciones);
    }

    // Filtro por baños
    if (minBanos) {
      where.banos = parseInt(minBanos);
    }

    // Filtro por área
    if (minArea || maxArea) {
      where.area = {};
      if (minArea) where.area.gte = parseFloat(minArea);
      if (maxArea) where.area.lte = parseFloat(maxArea);
    }

    // Filtro por estrato
    if (estrato) {
      where.estrato = parseInt(estrato);
    }

    // Filtro por destacado
    if (destacado) {
      where.destacado = destacado === "true";
    }

    // Filtro por características generales
    if (tieneGaraje) {
      where.tieneGaraje = tieneGaraje === "true";
    }

    if (amoblado) {
      where.amoblado = amoblado === "true";
    }

    // Filtro por características rurales
    if (accesoAgua) {
      where.accesoAgua = accesoAgua === "true";
    }

    if (accesoLuz) {
      where.accesoLuz = accesoLuz === "true";
    }

    if (topografia) {
      where.topografia = topografia;
    }

    if (viaAcceso) {
      where.viaAcceso = viaAcceso;
    }

    // Búsqueda por texto
    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: "insensitive" } },
        { descripcion: { contains: search, mode: "insensitive" } },
        { ciudad: { contains: search, mode: "insensitive" } },
        { direccion: { contains: search, mode: "insensitive" } },
        { departamento: { contains: search, mode: "insensitive" } },
      ];
    }

    // Parámetros de paginación
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");
    const skip = (page - 1) * limit;

    // Ordenamiento
    const orderBy = searchParams.get("orderBy") || "publicadoEn";
    const orderDir = searchParams.get("orderDir") || "desc";

    // Obtener inmuebles
    const inmuebles = await prisma.inmueble.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [orderBy]: orderDir,
      },
      select: {
        id: true,
        titulo: true,
        descripcion: true,
        tipo: true,
        precio: true,
        moneda: true,
        area: true,
        areaUnidad: true,
        habitaciones: true,
        banos: true,
        pisos: true,
        antiguedad: true,
        estrato: true,
        tieneGaraje: true,
        amoblado: true,
        imagenes: true,
        direccion: true,
        ciudad: true,
        departamento: true,
        lat: true,
        lng: true,
        estado: true,
        destacado: true,
        publicadoEn: true,
        actualizadoEn: true,
        vistas: true,
        topografia: true,
        accesoAgua: true,
        accesoLuz: true,
        viaAcceso: true,
        cultivos: true,
        vendedor: {
          select: {
            id: true,
            nombre: true,
            telefono: true,
            whatsapp: true,
          },
        },
      },
    });

    const total = await prisma.inmueble.count({ where });

    return NextResponse.json({
      success: true,
      data: inmuebles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error obteniendo inmuebles públicos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los inmuebles",
      },
      { status: 500 }
    );
  }
}
