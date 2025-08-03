"use client"

import { Bell, User, Wifi, WifiOff, Download, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePWA } from "@/components/providers/pwa-provider"
import { useMobileSidebar } from "@/components/layout/main-layout"

export function TopBar() {
  const { isOnline, isInstallable, installApp, isSyncing } = usePWA()
  const { toggleSidebar } = useMobileSidebar()

  const handleLogout = () => {
    document.cookie = "sat_session=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleSidebar()
            }}
            className="lg:hidden"
            type="button"
          >
            <Menu className="w-5 h-5" />
          </Button>
          {/* Logo/Title for mobile */}
          <div className="lg:hidden">
            <h1 className="text-lg font-bold text-slate-900">SAT</h1>
          </div>
        </div>
        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">En línea</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Sin conexión</span>
              </div>
            )}
            {isSyncing && (
              <Badge variant="secondary" className="animate-pulse ml-2">
                <span className="hidden sm:inline">Sincronizando...</span>
                <span className="sm:hidden">Sync</span>
              </Badge>
            )}
          </div>
          {/* Install App */}
          {isInstallable && (
            <Button variant="outline" size="sm" onClick={installApp}>
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Instalar</span>
            </Button>
          )}
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">3</Badge>
          </Button>
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="hidden md:inline text-sm font-medium">Usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Mi perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wifi className="w-4 h-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
