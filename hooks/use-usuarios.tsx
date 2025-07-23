"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface Usuario {
  id: number
  name: string
  email: string
  phone?: string
  role: "admin" | "manager" | "user"
  status: "active" | "inactive"
  avatar?: string
  department?: string
  position?: string
  lastLogin?: string
  createdAt: string
  updatedAt?: string
}

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const loadUsuarios = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsuarios: Usuario[] = [
        {
          id: 1,
          name: "Ana García",
          email: "ana.garcia@email.com",
          phone: "+54 11 1234-5678",
          role: "admin",
          status: "active",
          department: "Administración",
          position: "Administradora del Sistema",
          lastLogin: "2024-01-22T14:30:00Z",
          createdAt: "2023-06-15T10:00:00Z",
        },
        {
          id: 2,
          name: "Carlos Rodríguez",
          email: "carlos.rodriguez@email.com",
          phone: "+54 11 2345-6789",
          role: "manager",
          status: "active",
          department: "Ventas",
          position: "Gerente de Ventas",
          lastLogin: "2024-01-22T09:15:00Z",
          createdAt: "2023-08-20T14:30:00Z",
        },
        {
          id: 3,
          name: "María López",
          email: "maria.lopez@email.com",
          phone: "+54 11 3456-7890",
          role: "user",
          status: "active",
          department: "Operaciones",
          position: "Analista",
          lastLogin: "2024-01-21T16:45:00Z",
          createdAt: "2023-09-10T11:20:00Z",
        },
        {
          id: 4,
          name: "Juan Pérez",
          email: "juan.perez@email.com",
          role: "user",
          status: "inactive",
          department: "Logística",
          position: "Coordinador",
          lastLogin: "2024-01-15T13:20:00Z",
          createdAt: "2023-07-05T09:45:00Z",
        },
        {
          id: 5,
          name: "Laura Martínez",
          email: "laura.martinez@email.com",
          phone: "+54 11 4567-8901",
          role: "manager",
          status: "active",
          department: "Recursos Humanos",
          position: "Gerente de RRHH",
          lastLogin: "2024-01-22T11:30:00Z",
          createdAt: "2023-11-12T15:10:00Z",
        },
        {
          id: 6,
          name: "Diego Fernández",
          email: "diego.fernandez@email.com",
          role: "user",
          status: "active",
          department: "IT",
          position: "Desarrollador",
          createdAt: "2024-01-18T10:00:00Z",
        },
      ]

      setUsuarios(mockUsuarios)
    } catch (err) {
      setError("Error cargando usuarios")
      console.error("Error en loadUsuarios:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createUsuario = useCallback(
    async (usuarioData: Omit<Usuario, "id" | "createdAt">) => {
      try {
        const newUsuario: Usuario = {
          ...usuarioData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        }

        setUsuarios((prev) => [newUsuario, ...prev])

        toast({
          title: "Usuario creado",
          description: "El usuario se ha creado correctamente",
        })
      } catch (err) {
        setError("Error creando usuario")
        toast({
          title: "Error",
          description: "No se pudo crear el usuario",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const updateUsuario = useCallback(
    async (id: number, updates: Partial<Usuario>) => {
      try {
        setUsuarios((prev) =>
          prev.map((u) => (u.id === id ? { ...u, ...updates, updatedAt: new Date().toISOString() } : u)),
        )

        toast({
          title: "Usuario actualizado",
          description: "Los cambios se han guardado correctamente",
        })
      } catch (err) {
        setError("Error actualizando usuario")
        toast({
          title: "Error",
          description: "No se pudo actualizar el usuario",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const deleteUsuario = useCallback(
    async (id: number) => {
      try {
        setUsuarios((prev) => prev.filter((u) => u.id !== id))

        toast({
          title: "Usuario eliminado",
          description: "El usuario se ha eliminado correctamente",
        })
      } catch (err) {
        setError("Error eliminando usuario")
        toast({
          title: "Error",
          description: "No se pudo eliminar el usuario",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    loadUsuarios()
  }, [loadUsuarios])

  return {
    usuarios,
    loading,
    error,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    refreshUsuarios: loadUsuarios,
  }
}
