"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/layout/top-bar"

interface MobileSidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

const MobileSidebarContext = createContext<MobileSidebarContextType | undefined>(undefined)

export function useMobileSidebar() {
  const context = useContext(MobileSidebarContext)
  if (context === undefined) {
    throw new Error("useMobileSidebar must be used within MainLayout")
  }
  return context
}

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false)
  }, [])

  return (
    <MobileSidebarContext.Provider
      value={{
        isOpen: isMobileSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      <div className="flex h-screen bg-slate-50">
        {/* Sidebar */}
        <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <TopBar />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </MobileSidebarContext.Provider>
  )
}
