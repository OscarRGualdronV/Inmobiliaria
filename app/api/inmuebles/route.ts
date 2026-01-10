import { NextResponse } from "next/server";
import { getCurrentVendedor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  try {
    const vendedor = await getCurrentVendedor();

    if (!vendedor) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();

    console.log("Datos recibidos para nuevo inmueble:", {
      vendedorId: vendedor.id,
      tipo: data.tipo,
      titulo: data.titulo,
    });

    // Validar datos requeridos
    if (
      !data.titulo ||
      !data.tipo ||
      !data.precio ||
      !data.direccion ||
      !data.ciudad ||
      !data.departamento
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear el inmueble
    const inmueble = await prisma.inmueble.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        tipo: data.tipo,
        precio: parseInt(data.precio),
        moneda: data.moneda || "COP",
        area: data.area ? parseFloat(data.area) : null,
        areaUnidad: data.areaUnidad || "METROS_CUADRADOS",
        habitaciones: data.habitaciones ? parseInt(data.habitaciones) : null,
        banos: data.banos ? parseInt(data.banos) : null,
        pisos: data.pisos ? parseInt(data.pisos) : null,
        antiguedad: data.antiguedad ? parseInt(data.antiguedad) : null,
        estrato: data.estrato ? parseInt(data.estrato) : null,
        tieneGaraje: data.tieneGaraje || false,
        amoblado: data.amoblado || false,
        imagenes: data.imagenes || [],
        direccion: data.direccion,
        ciudad: data.ciudad,
        departamento: data.departamento,
        lat: data.lat ? parseFloat(data.lat) : null,
        lng: data.lng ? parseFloat(data.lng) : null,
        estado: data.estado || "DISPONIBLE",
        destacado: data.destacado || false,
        vendedorId: vendedor.id,

        // Campos específicos para predios rurales
        topografia: data.topografia || null,
        accesoAgua: data.accesoAgua || false,
        accesoLuz: data.accesoLuz || false,
        viaAcceso: data.viaAcceso || null,
        cultivos: data.cultivos || null,
      },
    });

    console.log("Inmueble creado exitosamente:", inmueble.id);

    return NextResponse.json({
      success: true,
      inmueble: {
        id: inmueble.id,
        titulo: inmueble.titulo,
        tipo: inmueble.tipo,
      },
    });
  } catch (error) {
    console.error("Error creating inmueble:", error);

    // Manejar errores específicos de Prisma
    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint failed")) {
        return NextResponse.json(
          { error: "Vendedor no válido" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const vendedor = await getCurrentVendedor();

    if (!vendedor) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Obtener inmuebles del vendedor
    const inmuebles = await prisma.inmueble.findMany({
      where: { vendedorId: vendedor.id },
      skip,
      take: limit,
      orderBy: { publicadoEn: "desc" },
      select: {
        id: true,
        titulo: true,
        tipo: true,
        precio: true,
        ciudad: true,
        estado: true,
        publicadoEn: true,
        vistas: true,
        destacado: true,
      },
    });

    const total = await prisma.inmueble.count({
      where: { vendedorId: vendedor.id },
    });

    return NextResponse.json({
      inmuebles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching inmuebles:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
