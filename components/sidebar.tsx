"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, FileText, Building2, Users, BarChart3, X, Settings, Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    description: "Vista general del sistema",
  },
  {
    name: "Productos",
    href: "/productos",
    icon: Package,
    description: "Gestión de productos",
  },
  {
    name: "Plantillas",
    href: "/plantillas",
    icon: FileText,
    description: "Plantillas PDF y Excel",
    badge: "Nuevo",
  },
  {
    name: "Empresas",
    href: "/empresas",
    icon: Building2,
    description: "Gestión de empresas",
  },
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: Users,
    description: "Gestión de usuarios",
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    description: "Generación de reportes",
  },
]

interface SidebarProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ className, isOpen = false, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Cerrar sidebar en móvil cuando cambia la ruta
  useEffect(() => {
    const lastPath = pathname
    return () => {
      if (pathname !== lastPath && onClose) {
        onClose()
      }
    }
  }, [pathname, onClose])

  // Manejar el scroll del body cuando el sidebar móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div>
              <h1 className="text-lg font-bold text-slate-900">SAT</h1>
              <p className="text-xs text-slate-500">Sistema de Gestión</p>
            </div>
          )}
        </div>

        {/* Close button for mobile */}
        {isMobile && onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} type="button">
            <X className="w-4 h-4" />
          </Button>
        )}

        {/* Collapse button for desktop */}
        {!isMobile && (
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} type="button">
            <Menu className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600",
                )}
              />

              {(!isCollapsed || isMobile) && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
                  </div>
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        {!isCollapsed || isMobile ? (
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">Configuración</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">Personaliza tu experiencia</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Abrir configuración
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="w-full">
            <Settings className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <SidebarContent isMobile={true} />
          </div>
        </div>
      )}
    </>
  )
}
