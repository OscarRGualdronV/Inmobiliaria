import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configurar para usar Node.js runtime
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
  runtime: "nodejs", // Forzar Node.js runtime
};

// Función simple para verificar token sin dependencias de Node.js
function verifyToken(token: string, secret: string): boolean {
  try {
    // Implementación simple de verificación de token
    // Nota: En producción, usa una librería apropiada o mejor aún,
    // mueve la verificación a un endpoint de API

    // Para desarrollo simple, podemos hacer una verificación básica
    // o usar una cookie segura en lugar de JWT
    return token.length > 10; // Verificación simple para desarrollo
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log(
    `Middleware: ${pathname}, Token: ${token ? "Presente" : "No presente"}`
  );

  // Si está en login y tiene token, redirigir al dashboard
  if (pathname === "/login" && token) {
    console.log("Redirigiendo de login a dashboard (ya autenticado)");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si intenta acceder al dashboard sin token
  if (pathname.startsWith("/dashboard") && !token) {
    console.log("Redirigiendo a login (sin token)");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si tiene token y está en dashboard, verificar que sea válido
  if (pathname.startsWith("/dashboard") && token) {
    const JWT_SECRET = process.env.NEXTAUTH_SECRET || "secret-key";

    // Verificación simple para desarrollo
    const isValid = verifyToken(token, JWT_SECRET);

    if (!isValid) {
      console.log("Token inválido, redirigiendo a login");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  console.log("Middleware: Continuando...");
  return NextResponse.next();
}
