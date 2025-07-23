"use client"

import { useState } from "react"
import { Plus, Search, BarChart3, Download, Eye, Edit, Trash2, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MainLayout } from "@/components/layout/main-layout"
import { ReporteDialog } from "@/components/reportes/reporte-dialog"
import { useReportes } from "@/hooks/use-reportes"

export default function ReportesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReporte, setEditingReporte] = useState(null)

  const { reportes, loading, createReporte, updateReporte, deleteReporte, generateReporte } = useReportes()

  const filteredReportes = reportes.filter((reporte) => {
    const matchesSearch =
      reporte.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || reporte.status === filterStatus
    const matchesType = filterType === "all" || reporte.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateReporte = async (reporteData: any) => {
    await createReporte(reporteData)
    setIsDialogOpen(false)
  }

  const handleEditReporte = (reporte: any) => {
    setEditingReporte(reporte)
    setIsDialogOpen(true)
  }

  const handleUpdateReporte = async (reporteData: any) => {
    if (editingReporte) {
      await updateReporte(editingReporte.id, reporteData)
      setEditingReporte(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteReporte = async (id: number) => {
    await deleteReporte(id)
  }

  const handleGenerateReporte = async (id: number) => {
    await generateReporte(id)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingReporte(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sales":
        return <BarChart3 className="w-4 h-4" />
      case "inventory":
        return <FileText className="w-4 h-4" />
      case "financial":
        return <Calendar className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reportes</h1>
          <p className="text-slate-600">Genera y gestiona reportes usando plantillas personalizadas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reportes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <Badge className="h-4 w-4 p-0 bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportes.filter((r) => r.status === "completed").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              <Badge className="h-4 w-4 p-0 bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportes.filter((r) => r.status === "processing").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reportes.filter((r) => new Date(r.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sales">Ventas</SelectItem>
                <SelectItem value="inventory">Inventario</SelectItem>
                <SelectItem value="financial">Financiero</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="processing">En Proceso</SelectItem>
                <SelectItem value="failed">Fallidos</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Reporte
            </Button>
          </div>
        </div>

        {/* Reports Grid */}
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
        ) : filteredReportes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? "No se encontraron reportes" : "No hay reportes"}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza creando tu primer reporte"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Reporte
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReportes.map((reporte) => (
              <Card key={reporte.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {reporte.name}
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Badge className={`text-xs ${getStatusColor(reporte.status)}`}>
                          {reporte.status === "completed"
                            ? "Completado"
                            : reporte.status === "processing"
                              ? "Procesando"
                              : "Fallido"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(reporte.type)}
                          <span className="ml-1">
                            {reporte.type === "sales"
                              ? "Ventas"
                              : reporte.type === "inventory"
                                ? "Inventario"
                                : "Financiero"}
                          </span>
                        </Badge>
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
                        <DropdownMenuItem onClick={() => handleGenerateReporte(reporte.id)}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Generar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditReporte(reporte)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteReporte(reporte.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <p className="text-slate-600 text-sm line-clamp-2">{reporte.description}</p>

                  <div className="flex items-center text-sm text-slate-600">
                    <FileText className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="truncate">Plantilla: {reporte.templateName}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                    <span>Creado: {new Date(reporte.createdAt).toLocaleDateString()}</span>
                    <span>
                      {reporte.lastGenerated
                        ? `Generado: ${new Date(reporte.lastGenerated).toLocaleDateString()}`
                        : "No generado"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog */}
        <ReporteDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          reporte={editingReporte}
          onSave={editingReporte ? handleUpdateReporte : handleCreateReporte}
        />
      </div>
    </MainLayout>
  )
}
