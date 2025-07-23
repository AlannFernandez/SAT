"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface PWAContextType {
  isOnline: boolean
  isInstallable: boolean
  isSyncing: boolean
  installApp: () => void
  syncData: () => void
}

const PWAContext = createContext<PWAContextType | undefined>(undefined)

export function PWAProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Registrar Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registrado:", registration)
        })
        .catch((error) => {
          console.error("Error registrando SW:", error)
        })

      // Escuchar mensajes del SW
      navigator.serviceWorker.addEventListener("message", (event) => {
        const { type, error } = event.data

        switch (type) {
          case "SYNC_START":
            setIsSyncing(true)
            toast({
              title: "Sincronizando...",
              description: "Enviando cambios al servidor",
            })
            break
          case "SYNC_COMPLETE":
            setIsSyncing(false)
            toast({
              title: "Sincronización completa",
              description: "Todos los cambios han sido guardados",
            })
            break
          case "SYNC_ERROR":
            setIsSyncing(false)
            toast({
              title: "Error de sincronización",
              description: error || "No se pudieron sincronizar los datos",
              variant: "destructive",
            })
            break
        }
      })
    }

    // Detectar estado de conexión
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (online) {
        toast({
          title: "Conexión restaurada",
          description: "Sincronizando datos...",
        })
        syncData()
      } else {
        toast({
          title: "Sin conexión",
          description: "Los cambios se guardarán localmente",
          variant: "destructive",
        })
      }
    }

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    setIsOnline(navigator.onLine)

    // Detectar si la app es instalable
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [toast])

  const installApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      toast({
        title: "App instalada",
        description: "SAT se ha instalado correctamente",
      })
    }

    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  const syncData = () => {
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready
        .then((registration) => {
          return registration.sync.register("sync-offline-data")
        })
        .catch((error) => {
          console.error("Error registrando background sync:", error)
        })
    }
  }

  return (
    <PWAContext.Provider
      value={{
        isOnline,
        isInstallable,
        isSyncing,
        installApp,
        syncData,
      }}
    >
      {children}
      {/* <ConnectionIndicator /> */}
    </PWAContext.Provider>
  )
}

function ConnectionIndicator() {
  const { isOnline, isSyncing } = usePWA()

  let status = "online"
  let text = "En líneaa"

  if (isSyncing) {
    status = "syncing"
    text = "Sincronizando..."
  } else if (!isOnline) {
    status = "offline"
    text = "Sin conexión"
  }

  return (
    <div className={`connection-indicator ${status}`}>
      {isSyncing && (
        <div className="inline-block w-3 h-3 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {text}
    </div>
  )
}

export function usePWA() {
  const context = useContext(PWAContext)
  if (context === undefined) {
    throw new Error("usePWA must be used within a PWAProvider")
  }
  return context
}
