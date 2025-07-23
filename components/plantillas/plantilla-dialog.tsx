"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Upload, FileText, X } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import type { Plantilla } from "@/hooks/use-plantillas"

interface PlantillaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plantilla?: Plantilla | null
  onSave: (plantilla: Omit<Plantilla, "id" | "createdAt">) => void
}

export function PlantillaDialog({ open, onOpenChange, plantilla, onSave }: PlantillaDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "pdf" as "pdf" | "excel",
    active: true,
    file: null as File | null,
    size: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      if (plantilla) {
        setFormData({
          name: plantilla.name,
          description: plantilla.description,
          type: plantilla.type,
          active: plantilla.active,
          file: null,
          size: plantilla.size,
        })
      } else {
        setFormData({
          name: "",
          description: "",
          type: "pdf",
          active: true,
          file: null,
          size: "",
        })
      }
    }
  }, [open, plantilla])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim()) {
      return
    }

    if (!plantilla && !formData.file) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSave({
        name: formData.name,
        description: formData.description,
        type: formData.type,
        active: formData.active,
        file: formData.file,
        size: formData.file ? formatFileSize(formData.file.size) : formData.size,
      })
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

  const handleFileChange = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ]

    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten archivos PDF y Excel")
      return
    }

    const type = file.type.includes("pdf") ? "pdf" : "excel"

    setFormData((prev) => ({
      ...prev,
      file,
      type,
      size: formatFileSize(file.size),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{plantilla ? "Editar Plantilla" : "Nueva Plantilla"}</DialogTitle>
          <DialogDescription>
            {plantilla
              ? "Modifica los datos de la plantilla existente."
              : "Sube una nueva plantilla PDF o Excel para generar reportes."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          {!plantilla && (
            <div className="space-y-2">
              <Label>Archivo *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {formData.file ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="w-8 h-8 text-indigo-600" />
                    <div>
                      <p className="font-medium">{formData.file.name}</p>
                      <p className="text-sm text-slate-500">{formData.size}</p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleInputChange("file", null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-900 mb-2">Arrastra tu archivo aquí</p>
                    <p className="text-slate-500 mb-4">o haz clic para seleccionar</p>
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Seleccionar archivo
                    </Button>
                    <p className="text-xs text-slate-500 mt-2">PDF, Excel (máx. 10MB)</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="hidden"
              />
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nombre de la plantilla"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                disabled={!!formData.file}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
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
              placeholder="Describe para qué se usa esta plantilla"
              rows={3}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleInputChange("active", checked)}
            />
            <Label htmlFor="active">Plantilla activa</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : plantilla ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
