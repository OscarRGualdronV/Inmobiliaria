"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("vendedor@inmobiliaria.com"); // Valor por defecto para pruebas
  const [password, setPassword] = useState("Vendedor123!"); // Valor por defecto para pruebas
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Importante: incluir cookies
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso, redirigiendo...");
        // Forzar recarga completa para asegurar que el middleware detecte la cookie
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Inmobiliaria
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Acceso Vendedor
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Panel de gestión de propiedades
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="vendedor@inmobiliaria.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Ingresando...
                </>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              ← Volver a la página principal
            </Link>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            <strong className="font-semibold">Credenciales de prueba:</strong>
            <br />
            Email: vendedor@inmobiliaria.com
            <br />
            Contraseña: Vendedor123!
          </p>
        </div>
      </div>
    </div>
  );
}
