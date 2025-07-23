"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Plantilla {
  id: number
  name: string
  description: string
  type: "pdf" | "excel"
  file?: File
  size: string
  active: boolean
  createdAt: string
  updatedAt?: string
}

export function usePlantillas() {
  const [plantillas, setPlantillas] = useState<Plantilla[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Datos de ejemplo
  const loadPlantillas = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Simular carga de datos
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockPlantillas: Plantilla[] = [
        {
          id: 1,
          name: "Reporte de Ventas Mensual",
          description: "Plantilla para generar reportes mensuales de ventas con gráficos y tablas",
          type: "pdf",
          size: "2.5 MB",
          active: true,
          createdAt: "2024-01-15T10:00:00Z",
        },
        {
          id: 2,
          name: "Inventario de Productos",
          description: "Hoja de cálculo para control de inventario con fórmulas automáticas",
          type: "excel",
          size: "1.8 MB",
          active: true,
          createdAt: "2024-01-10T14:30:00Z",
        },
        {
          id: 3,
          name: "Factura Comercial",
          description: "Plantilla de factura con logo de empresa y cálculos automáticos",
          type: "pdf",
          size: "850 KB",
          active: false,
          createdAt: "2024-01-05T09:15:00Z",
        },
      ]

      setPlantillas(mockPlantillas)
    } catch (err) {
      setError("Error cargando plantillas")
      console.error("Error en loadPlantillas:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createPlantilla = useCallback(
    async (plantillaData: Omit<Plantilla, "id" | "createdAt">) => {
      try {
        const newPlantilla: Plantilla = {
          ...plantillaData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        }

        setPlantillas((prev) => [newPlantilla, ...prev])

        toast({
          title: "Plantilla creada",
          description: "La plantilla se ha subido correctamente",
        })
      } catch (err) {
        setError("Error creando plantilla")
        toast({
          title: "Error",
          description: "No se pudo crear la plantilla",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const updatePlantilla = useCallback(
    async (id: number, updates: Partial<Plantilla>) => {
      try {
        setPlantillas((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p)),
        )

        toast({
          title: "Plantilla actualizada",
          description: "Los cambios se han guardado correctamente",
        })
      } catch (err) {
        setError("Error actualizando plantilla")
        toast({
          title: "Error",
          description: "No se pudo actualizar la plantilla",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const deletePlantilla = useCallback(
    async (id: number) => {
      try {
        setPlantillas((prev) => prev.filter((p) => p.id !== id))

        toast({
          title: "Plantilla eliminada",
          description: "La plantilla se ha eliminado correctamente",
        })
      } catch (err) {
        setError("Error eliminando plantilla")
        toast({
          title: "Error",
          description: "No se pudo eliminar la plantilla",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    loadPlantillas()
  }, [loadPlantillas])

  return {
    plantillas,
    loading,
    error,
    createPlantilla,
    updatePlantilla,
    deletePlantilla,
    refreshPlantillas: loadPlantillas,
  }
}
