"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Reporte {
  id: number
  name: string
  description: string
  type: "sales" | "inventory" | "financial"
  templateId: number
  templateName: string
  status: "completed" | "processing" | "failed"
  parameters?: Record<string, any>
  createdAt: string
  updatedAt?: string
  lastGenerated?: string
  fileUrl?: string
}

export function useReportes() {
  const [reportes, setReportes] = useState<Reporte[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadReportes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockReportes: Reporte[] = [
        {
          id: 1,
          name: "Reporte de Ventas Mensual",
          description: "Análisis completo de ventas del mes actual con comparativas",
          type: "sales",
          templateId: 1,
          templateName: "Reporte de Ventas Mensual",
          status: "completed",
          parameters: { month: "enero", year: 2024 },
          createdAt: "2024-01-15T10:00:00Z",
          lastGenerated: "2024-01-22T14:30:00Z",
          fileUrl: "/reports/ventas-enero-2024.pdf",
        },
        {
          id: 2,
          name: "Control de Inventario",
          description: "Estado actual del inventario con alertas de stock bajo",
          type: "inventory",
          templateId: 2,
          templateName: "Inventario de Productos",
          status: "processing",
          parameters: { warehouse: "principal", includeAlerts: true },
          createdAt: "2024-01-20T09:15:00Z",
        },
        {
          id: 3,
          name: "Balance Financiero Q1",
          description: "Balance financiero del primer trimestre 2024",
          type: "financial",
          templateId: 3,
          templateName: "Balance Trimestral",
          status: "completed",
          parameters: { quarter: "Q1", year: 2024 },
          createdAt: "2024-01-18T16:45:00Z",
          lastGenerated: "2024-01-21T11:20:00Z",
          fileUrl: "/reports/balance-q1-2024.xlsx",
        },
        {
          id: 4,
          name: "Análisis de Productos Top",
          description: "Productos más vendidos y rentables del período",
          type: "sales",
          templateId: 1,
          templateName: "Reporte de Ventas Mensual",
          status: "failed",
          parameters: { period: "last-30-days" },
          createdAt: "2024-01-19T13:30:00Z",
        },
        {
          id: 5,
          name: "Proyección de Inventario",
          description: "Proyección de necesidades de inventario para próximos 3 meses",
          type: "inventory",
          templateId: 2,
          templateName: "Inventario de Productos",
          status: "completed",
          parameters: { months: 3, includeProjections: true },
          createdAt: "2024-01-17T08:00:00Z",
          lastGenerated: "2024-01-20T10:15:00Z",
          fileUrl: "/reports/proyeccion-inventario.xlsx",
        },
      ]

      setReportes(mockReportes)
    } catch (err) {
      setError("Error cargando reportes")
      console.error("Error en loadReportes:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createReporte = useCallback(
    async (reporteData: Omit<Reporte, "id" | "createdAt" | "status">) => {
      try {
        const newReporte: Reporte = {
          ...reporteData,
          id: Date.now(),
          status: "processing",
          createdAt: new Date().toISOString(),
        }

        setReportes((prev) => [newReporte, ...prev])

        toast({
          title: "Reporte creado",
          description: "El reporte se ha creado y está siendo procesado",
        })

        // Simular procesamiento
        setTimeout(() => {
          setReportes((prev) =>
            prev.map((r) =>
              r.id === newReporte.id
                ? {
                    ...r,
                    status: "completed" as const,
                    lastGenerated: new Date().toISOString(),
                    fileUrl: `/reports/reporte-${newReporte.id}.pdf`,
                  }
                : r,
            ),
          )

          toast({
            title: "Reporte completado",
            description: "El reporte se ha generado correctamente",
          })
        }, 3000)
      } catch (err) {
        setError("Error creando reporte")
        toast({
          title: "Error",
          description: "No se pudo crear el reporte",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const updateReporte = useCallback(
    async (id: number, updates: Partial<Reporte>) => {
      try {
        setReportes((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r)),
        )

        toast({
          title: "Reporte actualizado",
          description: "Los cambios se han guardado correctamente",
        })
      } catch (err) {
        setError("Error actualizando reporte")
        toast({
          title: "Error",
          description: "No se pudo actualizar el reporte",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const deleteReporte = useCallback(
    async (id: number) => {
      try {
        setReportes((prev) => prev.filter((r) => r.id !== id))

        toast({
          title: "Reporte eliminado",
          description: "El reporte se ha eliminado correctamente",
        })
      } catch (err) {
        setError("Error eliminando reporte")
        toast({
          title: "Error",
          description: "No se pudo eliminar el reporte",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const generateReporte = useCallback(
    async (id: number) => {
      try {
        setReportes((prev) => prev.map((r) => (r.id === id ? { ...r, status: "processing" as const } : r)))

        toast({
          title: "Generando reporte",
          description: "El reporte está siendo procesado",
        })

        // Simular generación
        setTimeout(() => {
          setReportes((prev) =>
            prev.map((r) =>
              r.id === id
                ? {
                    ...r,
                    status: "completed" as const,
                    lastGenerated: new Date().toISOString(),
                    fileUrl: `/reports/reporte-${id}-${Date.now()}.pdf`,
                  }
                : r,
            ),
          )

          toast({
            title: "Reporte generado",
            description: "El reporte se ha generado correctamente",
          })
        }, 2000)
      } catch (err) {
        setReportes((prev) => prev.map((r) => (r.id === id ? { ...r, status: "failed" as const } : r)))

        toast({
          title: "Error",
          description: "No se pudo generar el reporte",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    loadReportes()
  }, [loadReportes])

  return {
    reportes,
    loading,
    error,
    createReporte,
    updateReporte,
    deleteReporte,
    generateReporte,
    refreshReportes: loadReportes,
  }
}
