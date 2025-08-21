import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Database,
  FileSpreadsheet,
  Home,
  Search,
  Shield,
  TrendingUp,
  Upload,
  AlertTriangle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Visão geral dos KPIs",
  },
  {
    title: "Upload de Dados",
    url: "/upload",
    icon: Upload,
    description: "Carregar arquivo Excel",
  },
  {
    title: "Explorar Dados",
    url: "/explore",
    icon: Search,
    description: "Tabela dinâmica e filtros",
  },
  {
    title: "Qualidade",
    url: "/quality",
    icon: Shield,
    description: "Diagnóstico de dados",
  },
  {
    title: "Insights",
    url: "/insights",
    icon: TrendingUp,
    description: "Anomalias e análises",
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: FileSpreadsheet,
    description: "Exportar PDF/Excel",
  },
];

const analyticsItems = [
  {
    title: "Métricas",
    url: "/metrics",
    icon: BarChart3,
    description: "KPIs detalhados",
  },
  {
    title: "Dados Brutos",
    url: "/raw-data",
    icon: Database,
    description: "Visualizar dados originais",
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium"
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar">
      <SidebarContent className="px-2 py-4">
        {/* Logo */}
        <div className="px-4 py-6 border-b border-sidebar-border mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">Navigator</h2>
                <p className="text-xs text-sidebar-foreground/70">Análise de Dados</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClass(item.url)}`}
                      title={item.description}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block">{item.title}</span>
                          <span className="text-xs text-muted-foreground truncate block">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClass(item.url)}`}
                      title={item.description}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block">{item.title}</span>
                          <span className="text-xs text-muted-foreground truncate block">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {open && (
          <div className="mt-auto p-4">
            <div className="bg-success-light border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">Sistema Online</span>
              </div>
              <p className="text-xs text-success/80">
                Dados processados com sucesso
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}