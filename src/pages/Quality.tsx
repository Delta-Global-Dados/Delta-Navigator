import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  Calendar,
  Database,
  FileX,
  Zap
} from "lucide-react";

// Mock data para qualidade
const qualityChecks = [
  {
    category: "Integridade dos Dados",
    checks: [
      { name: "Campos obrigatórios preenchidos", status: "success", score: 98.5, issues: 18 },
      { name: "Duplicatas por ID", status: "warning", score: 94.2, issues: 72 },
      { name: "Consistência de tipos", status: "success", score: 99.8, issues: 3 },
    ]
  },
  {
    category: "Validação Temporal",
    checks: [
      { name: "Datas em ordem cronológica", status: "error", score: 87.3, issues: 156 },
      { name: "Formato de datas PT-BR", status: "success", score: 100, issues: 0 },
      { name: "Datas futuras inválidas", status: "warning", score: 95.1, issues: 61 },
    ]
  },
  {
    category: "Validação Financeira",
    checks: [
      { name: "Valores numéricos válidos", status: "success", score: 99.2, issues: 10 },
      { name: "Percentuais dentro do range", status: "warning", score: 92.8, issues: 89 },
      { name: "Comissões consistentes", status: "success", score: 97.4, issues: 32 },
    ]
  }
];

const issuesDetail = [
  {
    tipo: "Duplicata",
    coluna: "ID",
    linha: 245,
    valor: "CORB-001234",
    descricao: "ID duplicado encontrado",
    severidade: "warning"
  },
  {
    tipo: "Data Inválida",
    coluna: "data_pago",
    linha: 892,
    valor: "32/08/2024",
    descricao: "Data com formato inválido",
    severidade: "error"
  },
  {
    tipo: "Valor Nulo",
    coluna: "saldo_devedor",
    linha: 156,
    valor: "NULL",
    descricao: "Campo obrigatório vazio",
    severidade: "warning"
  },
  {
    tipo: "Outlier",
    coluna: "comissao_prevista",
    linha: 734,
    valor: "150000.00",
    descricao: "Valor muito acima da média",
    severidade: "info"
  }
];

const statusIcons = {
  success: <CheckCircle className="h-4 w-4 text-success" />,
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  error: <XCircle className="h-4 w-4 text-danger" />,
  info: <Info className="h-4 w-4 text-primary" />
};

const statusColors = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-danger/10 text-danger border-danger/20",
  info: "bg-primary/10 text-primary border-primary/20"
};

export default function Quality() {
  const overallScore = qualityChecks
    .flatMap(cat => cat.checks)
    .reduce((acc, check) => acc + check.score, 0) / qualityChecks.flatMap(cat => cat.checks).length;

  const totalIssues = qualityChecks
    .flatMap(cat => cat.checks)
    .reduce((acc, check) => acc + check.issues, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Qualidade dos Dados</h1>
        <p className="text-muted-foreground">
          Diagnóstico automático e validação da integridade dos dados
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="kpi-card-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Score Geral</p>
                <p className="text-2xl font-bold text-primary">{overallScore.toFixed(1)}%</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <Progress value={overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="kpi-card-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning">Total de Issues</p>
                <p className="text-2xl font-bold text-warning">{totalIssues}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success">Registros Válidos</p>
                <p className="text-2xl font-bold text-success">1,194</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <Badge variant="outline" className="border-success text-success mt-1">
              95.7%
            </Badge>
          </CardContent>
        </Card>

        <Card className="kpi-card-danger">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-danger">Críticos</p>
                <p className="text-2xl font-bold text-danger">12</p>
              </div>
              <XCircle className="h-8 w-8 text-danger" />
            </div>
            <Badge variant="outline" className="border-danger text-danger mt-1">
              Revisar
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Quality Checks by Category */}
      <div className="space-y-6">
        {qualityChecks.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.checks.map((check, checkIndex) => (
                  <div key={checkIndex} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {statusIcons[check.status as keyof typeof statusIcons]}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {check.issues > 0 ? `${check.issues} problemas encontrados` : "Nenhum problema"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{check.score.toFixed(1)}%</p>
                      <Progress value={check.score} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Issues Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileX className="h-5 w-5" />
              Detalhes dos Problemas
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Exportar Relatório
              </Button>
              <Button size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Auto-Correção
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Coluna</TableHead>
                <TableHead>Linha</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Severidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issuesDetail.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{issue.tipo}</TableCell>
                  <TableCell className="font-mono">{issue.coluna}</TableCell>
                  <TableCell className="font-mono">{issue.linha}</TableCell>
                  <TableCell className="font-mono">{issue.valor}</TableCell>
                  <TableCell>{issue.descricao}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusColors[issue.severidade as keyof typeof statusColors]}
                    >
                      {issue.severidade}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Recomendações de Melhoria:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Revisar 156 datas fora de ordem cronológica</li>
              <li>• Corrigir 72 IDs duplicados</li>
              <li>• Validar 89 percentuais fora do range esperado</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Status da Análise:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Última execução: 21/08/2024 17:35</li>
              <li>• Tempo de processamento: 3.2 segundos</li>
              <li>• Regras aplicadas: 15 validações</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}