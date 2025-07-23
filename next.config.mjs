/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración PWA
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  
  // Configuración de imágenes
  images: {
    domains: ['jsonplaceholder.typicode.com'],
    unoptimized: true,
  },
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de salida
  output: 'standalone',
  
  // Desactivar ESLint y TypeScript durante build para deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
