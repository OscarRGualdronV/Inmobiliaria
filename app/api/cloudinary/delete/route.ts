import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { publicIds } = await req.json();

    // ✅ VALIDACIÓN CORRECTA
    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json(
        { error: "publicIds debe ser un array válido" },
        { status: 400 }
      );
    }

    // ✅ ELIMINAR EN PARALELO
    const results = await Promise.all(
      publicIds.map((publicId: string) => cloudinary.uploader.destroy(publicId))
    );

    return NextResponse.json({
      success: true,
      deleted: results,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json(
      { error: "Error eliminando imágenes" },
      { status: 500 }
    );
  }
}
