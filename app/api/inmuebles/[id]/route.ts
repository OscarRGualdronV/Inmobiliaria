import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de inmueble inválido" },
        { status: 400 }
      );
    }

    const inmueble = await prisma.inmueble.findUnique({
      where: { id },
      include: {
        vendedor: {
          select: {
            id: true,
            nombre: true,
            email: true,
            telefono: true,
            whatsapp: true,
          },
        },
      },
    });

    if (!inmueble) {
      return NextResponse.json(
        { error: "Inmueble no encontrado" },
        { status: 404 }
      );
    }

    // Incrementar contador de vistas
    await prisma.inmueble.update({
      where: { id },
      data: {
        vistas: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(inmueble);
  } catch (error) {
    console.error("Error obteniendo inmueble:", error);
    return NextResponse.json(
      { error: "Error al obtener el inmueble" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    const vendedor = await prisma.vendedor.findFirst();

    if (!vendedor) {
      return NextResponse.json(
        { error: "No hay vendedores registrados" },
        { status: 400 }
      );
    }

    const inmueble = await prisma.inmueble.update({
      where: { id },
      data: {
        ...body,
        vendedorId: vendedor.id,
        actualizadoEn: new Date(),
      },
    });

    // Configurar headers para evitar cache
    const response = NextResponse.json(inmueble);
    
    // Headers para prevenir cache en el cliente
    response.headers.set(
      'Cache-Control',
      'no-store, max-age=0, must-revalidate'
    );
    
    // Header específico para Next.js
    response.headers.set(
      'x-vercel-revalidate',
      'true'
    );

    return response;
  } catch (error) {
    console.error("Error actualizando inmueble:", error);
    return NextResponse.json(
      { error: "Error al actualizar el inmueble" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.inmueble.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando inmueble:", error);
    return NextResponse.json(
      { error: "Error al eliminar el inmueble" },
      { status: 500 }
    );
  }
}