"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Empresa {
  id: number
  name: string
  email: string
  phone: string
  address: string
  industry: string
  employeeCount: number
  status: "active" | "inactive" | "pending"
  website?: string
  description?: string
  createdAt: string
  updatedAt?: string
}

export function useEmpresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadEmpresas = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockEmpresas: Empresa[] = [
        {
          id: 1,
          name: "TechCorp Solutions",
          email: "contacto@techcorp.com",
          phone: "+54 11 4567-8900",
          address: "Av. Corrientes 1234, CABA, Argentina",
          industry: "Tecnología",
          employeeCount: 150,
          status: "active",
          website: "https://techcorp.com",
          description: "Empresa líder en soluciones tecnológicas",
          createdAt: "2024-01-15T10:00:00Z",
        },
        {
          id: 2,
          name: "Comercial del Sur",
          email: "info@comercialsur.com.ar",
          phone: "+54 11 2345-6789",
          address: "San Martín 567, Buenos Aires",
          industry: "Comercio",
          employeeCount: 45,
          status: "active",
          description: "Distribuidora mayorista de productos varios",
          createdAt: "2024-01-10T14:30:00Z",
        },
        {
          id: 3,
          name: "Industrias Metalúrgicas SA",
          email: "ventas@metalurgicas.com",
          phone: "+54 11 8765-4321",
          address: "Zona Industrial, La Matanza",
          industry: "Manufactura",
          employeeCount: 320,
          status: "pending",
          description: "Fabricación de componentes metálicos",
          createdAt: "2024-01-05T09:15:00Z",
        },
        {
          id: 4,
          name: "Servicios Logísticos Express",
          email: "operaciones@logexpress.com",
          phone: "+54 11 5555-0123",
          address: "Ruta 8 Km 45, Pilar",
          industry: "Logística",
          employeeCount: 89,
          status: "inactive",
          description: "Transporte y distribución nacional",
          createdAt: "2023-12-20T16:45:00Z",
        },
        {
          id: 5,
          name: "Consultora Estratégica",
          email: "contacto@estrategica.com.ar",
          phone: "+54 11 7777-8888",
          address: "Puerto Madero, CABA",
          industry: "Consultoría",
          employeeCount: 25,
          status: "active",
          description: "Consultoría empresarial y estratégica",
          createdAt: "2024-01-20T11:30:00Z",
        },
      ]

      setEmpresas(mockEmpresas)
    } catch (err) {
      setError("Error cargando empresas")
      console.error("Error en loadEmpresas:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createEmpresa = useCallback(
    async (empresaData: Omit<Empresa, "id" | "createdAt">) => {
      try {
        const newEmpresa: Empresa = {
          ...empresaData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        }

        setEmpresas((prev) => [newEmpresa, ...prev])

        toast({
          title: "Empresa creada",
          description: "La empresa se ha creado correctamente",
        })
      } catch (err) {
        setError("Error creando empresa")
        toast({
          title: "Error",
          description: "No se pudo crear la empresa",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const updateEmpresa = useCallback(
    async (id: number, updates: Partial<Empresa>) => {
      try {
        setEmpresas((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e)),
        )

        toast({
          title: "Empresa actualizada",
          description: "Los cambios se han guardado correctamente",
        })
      } catch (err) {
        setError("Error actualizando empresa")
        toast({
          title: "Error",
          description: "No se pudo actualizar la empresa",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const deleteEmpresa = useCallback(
    async (id: number) => {
      try {
        setEmpresas((prev) => prev.filter((e) => e.id !== id))

        toast({
          title: "Empresa eliminada",
          description: "La empresa se ha eliminado correctamente",
        })
      } catch (err) {
        setError("Error eliminando empresa")
        toast({
          title: "Error",
          description: "No se pudo eliminar la empresa",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    loadEmpresas()
  }, [loadEmpresas])

  return {
    empresas,
    loading,
    error,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    refreshEmpresas: loadEmpresas,
  }
}
