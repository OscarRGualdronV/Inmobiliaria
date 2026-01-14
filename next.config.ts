import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/drslkjlap/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      }
    ],
  },

  // ✅ AGREGA ESTO PARA CONTROLAR EL CACHE
  async headers() {
    return [
      {
        source: '/', // Página principal
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=30, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/inmuebles', // Página de propiedades
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=30, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/inmuebles/:path*', // Páginas individuales
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
      {
        source: '/api/:path*', // Todas las APIs
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;