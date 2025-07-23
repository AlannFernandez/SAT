"use client"

import { useState } from "react"
import { Building2, Plus, Edit, Trash2, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MainLayout } from "@/components/layout/main-layout"
import { EmpresaDialog } from "@/components/empresas/empresa-dialog"
import { useEmpresas, type Empresa } from "@/hooks/use-empresas"

export default function EmpresasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)

  const { empresas, loading, createEmpresa, updateEmpresa, deleteEmpresa } = useEmpresas()

  const filteredEmpresas = empresas.filter((empresa) => {
    const matchesSearch =
      empresa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || empresa.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateEmpresa = async (empresaData: Omit<Empresa, "id" | "createdAt">) => {
    await createEmpresa(empresaData)
    setIsDialogOpen(false)
  }

  const handleEditEmpresa = (empresa: Empresa) => {
    setEditingEmpresa(empresa)
    setIsDialogOpen(true)
  }

  const handleUpdateEmpresa = async (empresaData: Omit<Empresa, "id" | "createdAt">) => {
    if (editingEmpresa) {
      await updateEmpresa(editingEmpresa.id, empresaData)
      setEditingEmpresa(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteEmpresa = async (id: number) => {
    await deleteEmpresa(id)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingEmpresa(null)
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Empresas</h1>
          <p className="text-slate-600">Gestiona la información de empresas y clientes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Empresas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{empresas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activas</CardTitle>
              <Badge className="h-4 w-4 p-0 bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{empresas.filter((e) => e.status === "active").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivas</CardTitle>
              <Badge className="h-4 w-4 p-0 bg-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{empresas.filter((e) => e.status === "inactive").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Badge className="h-4 w-4 p-0 bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{empresas.filter((e) => e.status === "pending").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="inactive">Inactivas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Empresa
            </Button>
          </div>
        </div>

        {/* Empresas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEmpresas.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {searchTerm ? "No se encontraron empresas" : "No hay empresas"}
              </h3>
              <p className="text-slate-600 mb-4">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza agregando tu primera empresa"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Empresa
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmpresas.map((empresa) => (
              <Card key={empresa.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {empresa.name}
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Badge
                          variant={
                            empresa.status === "active"
                              ? "default"
                              : empresa.status === "inactive"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {empresa.status === "active"
                            ? "Activa"
                            : empresa.status === "inactive"
                              ? "Inactiva"
                              : "Pendiente"}
                        </Badge>
                        <span className="text-xs">{empresa.industry}</span>
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
                        <DropdownMenuItem onClick={() => handleEditEmpresa(empresa)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteEmpresa(empresa.id)}
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
                  <div className="flex items-center text-sm text-slate-600">
                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="truncate">{empresa.email}</span>
                  </div>

                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{empresa.phone}</span>
                  </div>

                  <div className="flex items-start text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{empresa.address}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                    <span>Creada: {new Date(empresa.createdAt).toLocaleDateString()}</span>
                    <span>{empresa.employeeCount} empleados</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog */}
        <EmpresaDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          empresa={editingEmpresa}
          onSave={editingEmpresa ? handleUpdateEmpresa : handleCreateEmpresa}
        />
      </div>
    </MainLayout>
  )
}
