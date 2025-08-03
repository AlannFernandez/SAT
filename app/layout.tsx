import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/styles/globals.css";
import { PWAProvider } from "@/components/providers/pwa-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "SAT - Sistema de Alerta Temprana",
  description: "App profesional para técnicos en Seguridad e Higiene. Relevamientos, informes y controles, incluso sin conexión.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SAT - Sistema de Alerta Temprana",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SAT",
    title: "SAT - Sistema de Alerta Temprana",
    description: "App profesional para técnicos en Seguridad e Higiene. Relevamientos, informes y controles, incluso sin conexión.",
  },
  twitter: {
    card: "summary",
    title: "SAT - Sistema de Alerta Temprana",
    description: "App profesional para técnicos en Seguridad e Higiene. Relevamientos, informes y controles, incluso sin conexión.",
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
    <html lang="es">
      <head>
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
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
