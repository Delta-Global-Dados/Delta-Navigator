import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  Users,
  Building,
  Clock,
  DollarSign
} from "lucide-react";

// Mock data para insights
const performanceData = [
  { consultor: "João Silva", contratos: 45, taxa_conversao: 78.5, comissao_media: 2340.50 },
  { consultor: "Maria Santos", contratos: 38, taxa_conversao: 82.1, comissao_media: 2890.25 },
  { consultor: "Pedro Costa", contratos: 52, taxa_conversao: 71.2, comissao_media: 2156.80 },
  { consultor: "Ana Lima", contratos: 29, taxa_conversao: 89.3, comissao_media: 3245.60 },
  { consultor: "Carlos Oliveira", contratos: 41, taxa_conversao: 75.8, comissao_media: 2678.90 },
];

const bankTrendData = [
  { banco: "Banco do Brasil", tempo_medio: 8.5, volume: 342 },
  { banco: "Caixa Econômica", tempo_medio: 12.3, volume: 298 },
  { banco: "Itaú", tempo_medio: 6.2, volume: 234 },
  { banco: "Bradesco", tempo_medio: 9.7, volume: 198 },
  { banco: "Santander", tempo_medio: 14.1, volume: 175 },
];

const anomalies = [
  {
    tipo: "Comissão Alta",
    descricao: "3 contratos com comissão 300% acima da média",
    impacto: "Alto",
    ids: ["CORB-1234", "CORB-5678", "CORB-9012"],
    icon: <DollarSign className="h-5 w-5 text-warning" />,
    color: "warning"
  },
  {
    tipo: "Tempo Excessivo", 
    descricao: "12 contratos sem conclusão há mais de 45 dias",
    impacto: "Médio",
    ids: ["CORB-2345", "CORB-6789", "CORB-0123", "..."],
    icon: <Clock className="h-5 w-5 text-danger" />,
    color: "danger"
  },
  {
    tipo: "Performance Baixa",
    descricao: "2 consultores com taxa de conversão < 60%",
    impacto: "Alto",
    ids: ["Roberto Silva", "Fernanda Costa"],
    icon: <Users className="h-5 w-5 text-danger" />,
    color: "danger"
  },
  {
    tipo: "Concentração de Banco",
    descricao: "85% dos contratos concentrados em 2 bancos",
    impacto: "Médio", 
    ids: ["Banco do Brasil", "Caixa Econômica"],
    icon: <Building className="h-5 w-5 text-warning" />,
    color: "warning"
  }
];

const recommendations = [
  {
    categoria: "Otimização de Performance",
    sugestoes: [
      "Implementar treinamento para consultores com conversão < 70%",
      "Estabelecer metas individuais baseadas em benchmarks",
      "Criar programa de incentivos para alta performance"
    ],
    prioridade: "Alta",
    icon: <Target className="h-5 w-5 text-success" />
  },
  {
    categoria: "Diversificação de Portfolio", 
    sugestoes: [
      "Expandir parcerias com bancos de menor participação",
      "Desenvolver estratégias específicas para Itaú (menor tempo)",
      "Balancear distribuição entre instituições"
    ],
    prioridade: "Média",
    icon: <Building className="h-5 w-5 text-primary" />
  },
  {
    categoria: "Gestão de Processos",
    sugestoes: [
      "Automatizar follow-up de contratos pendentes",
      "Implementar alertas para contratos sem movimento",
      "Otimizar fluxo para reduzir tempo médio"
    ],
    prioridade: "Alta", 
    icon: <Clock className="h-5 w-5 text-warning" />
  }
];

const colorMap = {
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20", 
  success: "bg-success/10 text-success border-success/20",
  primary: "bg-primary/10 text-primary border-primary/20"
};

const priorityMap = {
  "Alta": "bg-danger/10 text-danger border-danger/20",
  "Média": "bg-warning/10 text-warning border-warning/20",
  "Baixa": "bg-success/10 text-success border-success/20"
};

export default function Insights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Insights & Anomalias</h1>
        <p className="text-muted-foreground">
          Análises inteligentes e detecção automática de padrões
        </p>
      </div>

      {/* Anomalies Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Anomalias Detectadas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalies.map((anomaly, index) => (
            <Card key={index} className="border-l-4 border-l-warning">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {anomaly.icon}
                    <CardTitle className="text-lg">{anomaly.tipo}</CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={colorMap[anomaly.color as keyof typeof colorMap]}
                  >
                    {anomaly.impacto}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{anomaly.descricao}</p>
                <div className="flex flex-wrap gap-1">
                  {anomaly.ids.map((id, idIndex) => (
                    <Badge key={idIndex} variant="secondary" className="text-xs">
                      {id}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Performance por Consultor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="consultor" 
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="taxa_conversao" fill="hsl(var(--primary))" name="Taxa Conversão %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Tempo Médio vs Volume (Bancos)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={bankTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="tempo_medio" 
                  stroke="hsl(var(--muted-foreground))"
                  name="Tempo Médio (dias)"
                />
                <YAxis 
                  dataKey="volume" 
                  stroke="hsl(var(--muted-foreground))"
                  name="Volume"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Scatter dataKey="volume" fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Recomendações Inteligentes
        </h2>

        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rec.icon}
                    <CardTitle className="text-lg">{rec.categoria}</CardTitle>
                  </div>
                  <Badge 
                    variant="outline"
                    className={priorityMap[rec.prioridade as keyof typeof priorityMap]}
                  >
                    {rec.prioridade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rec.sugestoes.map((sugestao, sugIndex) => (
                    <li key={sugIndex} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{sugestao}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>Próximos Passos Sugeridos:</strong>
          <div className="mt-3 space-y-2">
            <Button variant="outline" size="sm" className="mr-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              Gerar Plano de Ação
            </Button>
            <Button variant="outline" size="sm" className="mr-2">
              <Users className="h-4 w-4 mr-1" />
              Agendar Reunião Equipe
            </Button>
            <Button variant="outline" size="sm">
              <Building className="h-4 w-4 mr-1" />
              Revisar Parcerias
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}