import { NextResponse } from "next/server";
import { getCurrentVendedor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const vendedor = await getCurrentVendedor();

    if (!vendedor) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await request.json();

    // Validar WhatsApp
    if (!data.whatsapp || data.whatsapp.trim() === "") {
      return NextResponse.json(
        { error: "El número de WhatsApp es requerido" },
        { status: 400 }
      );
    }

    // Limpiar número (solo números)
    const whatsappLimpio = data.whatsapp.replace(/\D/g, "");

    if (whatsappLimpio.length < 10) {
      return NextResponse.json(
        { error: "Número de WhatsApp inválido" },
        { status: 400 }
      );
    }

    // Actualizar vendedor
    await prisma.vendedor.update({
      where: { id: vendedor.id },
      data: {
        nombre: data.nombre,
        telefono: data.telefono || null,
        whatsapp: whatsappLimpio,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating vendedor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
