"use client"

import { useState, useEffect, useCallback } from "react"
import { dataService, type Product } from "@/lib/services/data-service"
import { usePWA } from "@/components/providers/pwa-provider"
import { useToast } from "@/hooks/use-toast"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isOnline } = usePWA()
  const { toast } = useToast()

  // Cargar productos iniciales
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Primero cargar desde IndexedDB
      const localProducts = await dataService.getProducts()
      setProducts(localProducts)

      // Si estamos online, intentar cargar desde API
      if (isOnline) {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts")
          if (response.ok) {
            const remoteProducts: Product[] = await response.json()

            // Actualizar productos locales con datos remotos
            for (const product of remoteProducts) {
              await dataService.saveProduct(
                {
                  ...product,
                  synced: true,
                },
                true,
              )
            }

            // Recargar desde IndexedDB para obtener datos actualizados
            const updatedProducts = await dataService.getProducts()
            setProducts(updatedProducts)
          }
        } catch (apiError) {
          console.warn("Error cargando desde API, usando datos locales:", apiError)
        }
      }
    } catch (err) {
      setError("Error cargando productos")
      console.error("Error en loadProducts:", err)
    } finally {
      setLoading(false)
    }
  }, [isOnline])

  // Crear producto
  const createProduct = useCallback(
    async (productData: Omit<Product, "id">) => {
      try {
        const newProduct: Product = {
          ...productData,
          id: isOnline ? 0 : -Date.now(), // ID temporal para offline
          createdAt: new Date().toISOString(),
          synced: isOnline,
        }

        await dataService.saveProduct(newProduct, isOnline)

        // Actualizar estado local
        setProducts((prev) => [newProduct, ...prev])

        toast({
          title: "Producto creado",
          description: isOnline
            ? "Guardado en el servidor"
            : "Guardado localmente, se sincronizará cuando haya conexión",
        })
      } catch (err) {
        setError("Error creando producto")
        toast({
          title: "Error",
          description: "No se pudo crear el producto",
          variant: "destructive",
        })
      }
    },
    [isOnline, toast],
  )

  // Actualizar producto
  const updateProduct = useCallback(
    async (id: number, updates: Partial<Product>) => {
      try {
        const existingProduct = await dataService.getProduct(id)
        if (!existingProduct) {
          throw new Error("Producto no encontrado")
        }

        const updatedProduct: Product = {
          ...existingProduct,
          ...updates,
          updatedAt: new Date().toISOString(),
          synced: isOnline,
        }

        await dataService.saveProduct(updatedProduct, isOnline)

        // Actualizar estado local
        setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))

        toast({
          title: "Producto actualizado",
          description: isOnline
            ? "Guardado en el servidor"
            : "Guardado localmente, se sincronizará cuando haya conexión",
        })
      } catch (err) {
        setError("Error actualizando producto")
        toast({
          title: "Error",
          description: "No se pudo actualizar el producto",
          variant: "destructive",
        })
      }
    },
    [isOnline, toast],
  )

  // Eliminar producto
  const deleteProduct = useCallback(
    async (id: number) => {
      try {
        await dataService.deleteProduct(id, isOnline)

        // Actualizar estado local
        setProducts((prev) => prev.filter((p) => p.id !== id))

        toast({
          title: "Producto eliminado",
          description: isOnline
            ? "Eliminado del servidor"
            : "Eliminado localmente, se sincronizará cuando haya conexión",
        })
      } catch (err) {
        setError("Error eliminando producto")
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto",
          variant: "destructive",
        })
      }
    },
    [isOnline, toast],
  )

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // Recargar cuando vuelva la conexión
  useEffect(() => {
    if (isOnline) {
      loadProducts()
    }
  }, [isOnline, loadProducts])

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: loadProducts,
  }
}
