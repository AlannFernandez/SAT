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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePlantillas } from "@/hooks/use-plantillas"
import type { Reporte } from "@/hooks/use-reportes"

interface ReporteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reporte?: Reporte | null
  onSave: (reporte: Omit<Reporte, "id" | "createdAt" | "status">) => void
}

export function ReporteDialog({ open, onOpenChange, reporte, onSave }: ReporteDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "sales" as "sales" | "inventory" | "financial",
    templateId: 0,
    templateName: "",
    parameters: {} as Record<string, any>,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { plantillas } = usePlantillas()

  useEffect(() => {
    if (open) {
      if (reporte) {
        setFormData({
          name: reporte.name,
          description: reporte.description,
          type: reporte.type,
          templateId: reporte.templateId,
          templateName: reporte.templateName,
          parameters: reporte.parameters || {},
        })
      } else {
        setFormData({
          name: "",
          description: "",
          type: "sales",
          templateId: 0,
          templateName: "",
          parameters: {},
        })
      }
    }
  }, [open, reporte])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim() || !formData.templateId) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSave(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTemplateChange = (templateId: string) => {
    const template = plantillas.find((p) => p.id === Number.parseInt(templateId))
    if (template) {
      setFormData((prev) => ({
        ...prev,
        templateId: template.id,
        templateName: template.name,
      }))
    }
  }

  const availableTemplates = plantillas.filter((p) => p.active)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{reporte ? "Editar Reporte" : "Nuevo Reporte"}</DialogTitle>
          <DialogDescription>
            {reporte
              ? "Modifica la configuración del reporte existente."
              : "Configura un nuevo reporte usando una plantilla disponible."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Reporte *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nombre descriptivo del reporte"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Reporte</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Ventas</SelectItem>
                  <SelectItem value="inventory">Inventario</SelectItem>
                  <SelectItem value="financial">Financiero</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe qué información incluirá este reporte"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Plantilla *</Label>
            <Select
              value={formData.templateId.toString()}
              onValueChange={handleTemplateChange}
              disabled={availableTemplates.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plantilla" />
              </SelectTrigger>
              <SelectContent>
                {availableTemplates.length === 0 ? (
                  <SelectItem value="0" disabled>
                    No hay plantillas disponibles
                  </SelectItem>
                ) : (
                  availableTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name} ({template.type.toUpperCase()})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {availableTemplates.length === 0 && (
              <p className="text-sm text-slate-500">
                Necesitas crear al menos una plantilla activa para generar reportes.
              </p>
            )}
          </div>

          {/* Parámetros específicos según el tipo */}
          {formData.type === "sales" && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900">Parámetros de Ventas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select
                    value={formData.parameters.period || ""}
                    onValueChange={(value) =>
                      handleInputChange("parameters", { ...formData.parameters, period: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Últimos 7 días</SelectItem>
                      <SelectItem value="last-30-days">Últimos 30 días</SelectItem>
                      <SelectItem value="current-month">Mes actual</SelectItem>
                      <SelectItem value="last-month">Mes anterior</SelectItem>
                      <SelectItem value="current-quarter">Trimestre actual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="includeComparisons">Incluir Comparativas</Label>
                  <Select
                    value={formData.parameters.includeComparisons?.toString() || "false"}
                    onValueChange={(value) =>
                      handleInputChange("parameters", {
                        ...formData.parameters,
                        includeComparisons: value === "true",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {formData.type === "inventory" && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900">Parámetros de Inventario</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Almacén</Label>
                  <Select
                    value={formData.parameters.warehouse || ""}
                    onValueChange={(value) =>
                      handleInputChange("parameters", { ...formData.parameters, warehouse: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar almacén" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="secundario">Secundario</SelectItem>
                      <SelectItem value="all">Todos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="includeAlerts">Incluir Alertas</Label>
                  <Select
                    value={formData.parameters.includeAlerts?.toString() || "false"}
                    onValueChange={(value) =>
                      handleInputChange("parameters", {
                        ...formData.parameters,
                        includeAlerts: value === "true",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {formData.type === "financial" && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900">Parámetros Financieros</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quarter">Trimestre</Label>
                  <Select
                    value={formData.parameters.quarter || ""}
                    onValueChange={(value) =>
                      handleInputChange("parameters", { ...formData.parameters, quarter: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar trimestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1">Q1 (Ene-Mar)</SelectItem>
                      <SelectItem value="Q2">Q2 (Abr-Jun)</SelectItem>
                      <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
                      <SelectItem value="Q4">Q4 (Oct-Dic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.parameters.year || new Date().getFullYear()}
                    onChange={(e) =>
                      handleInputChange("parameters", {
                        ...formData.parameters,
                        year: Number.parseInt(e.target.value),
                      })
                    }
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || availableTemplates.length === 0}>
              {isSubmitting ? "Guardando..." : reporte ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
