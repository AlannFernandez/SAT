"use client"

import { useState } from "react"
import { Upload, FileText, Download, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MainLayout } from "@/components/layout/main-layout"
import { PlantillaDialog } from "@/components/plantillas/plantilla-dialog"
import { usePlantillas } from "@/hooks/use-plantillas"

export default function PlantillasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlantilla, setEditingPlantilla] = useState(null)

  const { plantillas, loading, createPlantilla, updatePlantilla, deletePlantilla } = usePlantillas()

  const filteredPlantillas = plantillas.filter((plantilla) => {
    const matchesSearch =
      plantilla.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plantilla.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || plantilla.type === filterType
    return matchesSearch && matchesType
  })

  const handleCreatePlantilla = async (plantillaData: any) => {
    await createPlantilla(plantillaData)
    setIsDialogOpen(false)
  }

  const handleEditPlantilla = (plantilla: any) => {
    setEditingPlantilla(plantilla)
    setIsDialogOpen(true)
  }

  const handleUpdatePlantilla = async (plantillaData: any) => {
    if (editingPlantilla) {
      await updatePlantilla(editingPlantilla.id, plantillaData)
      setEditingPlantilla(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeletePlantilla = async (id: number) => {
    await deletePlantilla(id)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingPlantilla(null)
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Plantillas</h1>
          <p className="text-slate-600">Gestiona plantillas PDF y Excel para generar reportes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Plantillas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plantillas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PDF</CardTitle>
              <FileText className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plantillas.filter((p) => p.type === "pdf").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excel</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plantillas.filter((p) => p.type === "excel").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activas</CardTitle>
              <Badge className="h-4 w-4 p-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plantillas.filter((p) => p.active).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Plantilla
            </Button>
          </div>
        </div>

        {/* Plantillas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-slate-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPlantillas.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? "No se encontraron plantillas" : "No hay plantillas"}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza subiendo tu primera plantilla"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Plantilla
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlantillas.map((plantilla) => (
              <Card key={plantilla.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {plantilla.name}
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Badge variant={plantilla.type === "pdf" ? "destructive" : "default"}>
                          {plantilla.type.toUpperCase()}
                        </Badge>
                        {plantilla.active ? (
                          <Badge variant="default">Activa</Badge>
                        ) : (
                          <Badge variant="secondary">Inactiva</Badge>
                        )}
                      </CardDescription>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPlantilla(plantilla)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePlantilla(plantilla.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">{plantilla.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Tamaño: {plantilla.size}</span>
                    <span>{new Date(plantilla.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog */}
        <PlantillaDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          plantilla={editingPlantilla}
          onSave={editingPlantilla ? handleUpdatePlantilla : handleCreatePlantilla}
        />
      </div>
    </MainLayout>
  )
}
