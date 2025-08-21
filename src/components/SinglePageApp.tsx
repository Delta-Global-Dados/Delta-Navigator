import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Upload as UploadIcon, 
  Search, 
  Shield, 
  TrendingUp, 
  FileSpreadsheet,
  Menu,
  X
} from "lucide-react";

// Import existing components
import { MetricsGrid } from "./dashboard/MetricsGrid";
import { ChartsSection } from "./dashboard/ChartsSection";
import Upload from "../pages/Upload";
import Explore from "../pages/Explore";
import Quality from "../pages/Quality";
import Insights from "../pages/Insights";
import Reports from "../pages/Reports";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "KPIs e métricas principais"
  },
  {
    id: "upload", 
    label: "Upload",
    icon: <UploadIcon className="h-4 w-4" />,
    description: "Carregar dados Excel"
  },
  {
    id: "explore",
    label: "Explorar",
    icon: <Search className="h-4 w-4" />,
    description: "Tabela dinâmica"
  },
  {
    id: "quality",
    label: "Qualidade", 
    icon: <Shield className="h-4 w-4" />,
    description: "Diagnóstico de dados"
  },
  {
    id: "insights",
    label: "Insights",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "Análises inteligentes"
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: <FileSpreadsheet className="h-4 w-4" />,
    description: "Exportar PDF/Excel"
  }
];

export function SinglePageApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Corban Navigator</h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Dashboard Completo de Análise Financeira
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-success text-success hidden sm:flex">
                Sistema Online
              </Badge>
              <Badge variant="secondary" className="hidden md:flex">
                1.247 registros
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border/50
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          pt-16 lg:pt-0
        `}>
          <div className="p-4 space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Módulos
            </h2>
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false); // Close mobile sidebar on selection
                }}
                className={`
                  w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors
                  ${activeTab === tab.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {tab.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{tab.label}</p>
                  <p className="text-xs opacity-70 truncate">{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
          
          {/* Status Panel */}
          <div className="p-4 mt-6">
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">Online</span>
                </div>
                <p className="text-xs text-success/80">
                  Última sincronização:<br />
                  21/08/2024 17:35
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Executivo</h2>
                  <p className="text-muted-foreground">
                    Visão geral completa das operações e métricas do Corban
                  </p>
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
                        <Badge variant="outline" className="border-success text-success">Ativo</Badge>
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
                        <Badge variant="outline" className="border-primary text-primary">Sincronizado</Badge>
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
                        <Badge variant="outline" className="border-warning text-warning">Revisar</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <MetricsGrid />
                <ChartsSection />
              </div>
            )}

            {/* Upload */}
            {activeTab === "upload" && (
              <div className="animate-fade-in">
                <Upload />
              </div>
            )}

            {/* Explore */} 
            {activeTab === "explore" && (
              <div className="animate-fade-in">
                <Explore />
              </div>
            )}

            {/* Quality */}
            {activeTab === "quality" && (
              <div className="animate-fade-in">
                <Quality />
              </div>
            )}

            {/* Insights */}
            {activeTab === "insights" && (
              <div className="animate-fade-in">
                <Insights />
              </div>
            )}

            {/* Reports */}
            {activeTab === "reports" && (
              <div className="animate-fade-in">
                <Reports />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}