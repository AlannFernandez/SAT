"use client"

import { useState } from "react"
import { Plus, Search, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { ProductDialog } from "@/components/product-dialog"
import { useProducts } from "@/hooks/use-products"
import { MainLayout } from "@/components/layout/main-layout"
import type { Product } from "@/lib/services/data-service"

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts()

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.body.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateProduct = async (productData: Omit<Product, "id">) => {
    await createProduct(productData)
    setIsDialogOpen(false)
  }

  const handleUpdateProduct = async (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
      setIsDialogOpen(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Productos</h1>
          <p className="text-slate-600">Gestiona tu catálogo de productos</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-slate-200 rounded"></div>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? "No se encontraron productos" : "No hay productos"}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza creando tu primer producto"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Producto
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        <ProductDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          product={editingProduct}
          onSave={editingProduct ? handleUpdateProduct : handleCreateProduct}
        />
      </div>
    </MainLayout>
  )
}
