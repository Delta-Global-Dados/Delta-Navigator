import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Download, Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Executivo</h1>
          <p className="text-muted-foreground">
            Visão geral das operações e métricas do Corban
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="30-dias">
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-dias">Últimos 7 dias</SelectItem>
              <SelectItem value="30-dias">Últimos 30 dias</SelectItem>
              <SelectItem value="90-dias">Últimos 90 dias</SelectItem>
              <SelectItem value="ano">Ano atual</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success">Sistema</p>
                <p className="text-2xl font-bold text-success">Online</p>
              </div>
              <Badge variant="outline" className="border-success text-success">
                Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Última Atualização</p>
                <p className="text-lg font-semibold text-primary">21/08/2024 17:35</p>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                Sincronizado
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning">Alertas</p>
                <p className="text-2xl font-bold text-warning">3</p>
              </div>
              <Badge variant="outline" className="border-warning text-warning">
                Revisar
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Grid */}
      <MetricsGrid />

      {/* Charts Section */}
      <ChartsSection />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>Relatório Mensal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Filter className="h-6 w-6 mb-2" />
              <span>Filtrar por Banco</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Agendar Relatório</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <RefreshCw className="h-6 w-6 mb-2" />
              <span>Sincronizar Dados</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}