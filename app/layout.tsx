import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { PWAProvider } from "@/components/providers/pwa-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Zimbo Modern - Gestión de Productos",
  description: "Aplicación moderna para gestión de productos con soporte offline",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zimbo Modern",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Zimbo Modern",
    title: "Zimbo Modern - Gestión de Productos",
    description: "Aplicación moderna para gestión de productos con soporte offline",
  },
  twitter: {
    card: "summary",
    title: "Zimbo Modern - Gestión de Productos",
    description: "Aplicación moderna para gestión de productos con soporte offline",
  },
}

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <PWAProvider>
          {children}
          <Toaster />
        </PWAProvider>
      </body>
    </html>
  )
}
