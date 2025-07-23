import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PWAProvider } from "@/components/providers/pwa-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SAT - Sistema de alerta tempranas",
  description: "Aplicación moderna para seguridad e higiene con soporte offline",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SAT - Sistema de alerta tempranas",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SAT - Sistema de alerta tempranas",
    title: "SAT - Sistema de alerta tempranas",
    description: "Aplicación moderna para seguridad e higiene con soporte offline",
  },
  twitter: {
    card: "summary",
    title: "SAT - Sistema de alerta tempranas",
    description: "Aplicación moderna para seguridad e higiene con soporte offline",
  },
    generator: 'v0.dev'
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
      </head>
      <body className={inter.className}>
        <PWAProvider>
          {children}
          <Toaster />
        </PWAProvider>
      </body>
    </html>
  )
}
