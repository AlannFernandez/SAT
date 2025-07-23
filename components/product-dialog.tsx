"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/lib/services/data-service"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (product: Omit<Product, "id">) => void
}

export function ProductDialog({ open, onOpenChange, product, onSave }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Resetear formulario cuando cambia el producto o se abre/cierra el dialog
  useEffect(() => {
    if (open) {
      if (product) {
        setFormData({
          title: product.title,
          body: product.body,
          userId: product.userId,
        })
      } else {
        setFormData({
          title: "",
          body: "",
          userId: 1,
        })
      }
    }
  }, [open, product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.body.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSave(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Modifica los datos del producto existente."
              : "Completa la información para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ingresa el título del producto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Descripción *</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleInputChange("body", e.target.value)}
              placeholder="Describe el producto en detalle"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">ID Usuario</Label>
            <Input
              id="userId"
              type="number"
              value={formData.userId}
              onChange={(e) => handleInputChange("userId", Number.parseInt(e.target.value) || 1)}
              min="1"
              max="10"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : product ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
