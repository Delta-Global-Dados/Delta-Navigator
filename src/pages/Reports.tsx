import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  FileSpreadsheet, 
  FileText, 
  Calendar as CalendarIcon,
  Download,
  Clock,
  Mail,
  Settings,
  BarChart3,
  FileCheck,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

const reportTemplates = [
  {
    id: "executive",
    name: "Relatório Executivo",
    description: "Dashboard resumido com KPIs principais",
    format: ["PDF", "Excel"],
    sections: ["Métricas Gerais", "Gráficos", "Resumo Executivo"],
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    estimatedTime: "2-3 min"
  },
  {
    id: "detailed", 
    name: "Análise Completa",
    description: "Relatório detalhado com todas as análises",
    format: ["PDF", "Excel"],
    sections: ["KPIs", "Qualidade", "Insights", "Tabela Completa"],
    icon: <FileCheck className="h-8 w-8 text-success" />,
    estimatedTime: "5-7 min"
  },
  {
    id: "quality",
    name: "Qualidade de Dados",
    description: "Diagnóstico de integridade e validação",
    format: ["PDF", "Excel"],
    sections: ["Validações", "Problemas", "Recomendações"],
    icon: <FileText className="h-8 w-8 text-warning" />,
    estimatedTime: "1-2 min"
  }
];

const scheduledReports = [
  {
    name: "Relatório Mensal Executivo",
    frequency: "Mensal",
    nextRun: "01/09/2024",
    recipients: ["admin@empresa.com", "diretoria@empresa.com"],
    status: "Ativo"
  },
  {
    name: "Análise Semanal de Qualidade", 
    frequency: "Semanal",
    nextRun: "26/08/2024",
    recipients: ["equipe@empresa.com"],
    status: "Ativo"
  }
];

export default function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simular geração do relatório
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">
          Gere e agende relatórios personalizados em PDF e Excel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modelos de Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start gap-3">
                    {template.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {template.estimatedTime}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {template.format.map(fmt => (
                            <Badge key={fmt} variant="secondary" className="text-xs">
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Configuration */}
          {selectedTemplateData && (
            <Card>
              <CardHeader>
                <CardTitle>Configuração do Relatório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Formato de Saída</Label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Período</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              `${format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}`
                            ) : (
                              format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                            )
                          ) : (
                            "Selecionar período"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{ from: dateRange.from, to: dateRange.to }}
                          onSelect={(range) => setDateRange(range || {})}
                          numberOfMonths={2}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label>Seções Incluídas</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedTemplateData.sections.map((section) => (
                      <div key={section} className="flex items-center space-x-2">
                        <Checkbox
                          id={section}
                          checked={selectedSections.includes(section)}
                          onCheckedChange={() => handleSectionToggle(section)}
                        />
                        <Label htmlFor={section} className="text-sm">
                          {section}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? "Gerando..." : "Gerar Relatório"}
                  </Button>
                  
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Scheduled Reports */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Relatórios Agendados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduledReports.map((report, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{report.name}</h4>
                  <div className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>Frequência: {report.frequency}</p>
                    <p>Próxima execução: {report.nextRun}</p>
                    <p>Destinatários: {report.recipients.length}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs border-success text-success"
                  >
                    {report.status}
                  </Badge>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Gerenciar Agendamentos
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Histórico de Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center py-8 text-muted-foreground">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum relatório gerado ainda</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="email">Destinatários</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="admin@empresa.com"
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-send" />
                <Label htmlFor="auto-send" className="text-sm">
                  Enviar automaticamente
                </Label>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}