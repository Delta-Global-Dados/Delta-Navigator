import { KPICard } from "./KPICard";
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  XCircle, 
  TrendingUp,
  Users,
  Building,
  DollarSign 
} from "lucide-react";

// Mock data - será substituído por dados reais
const mockMetrics = {
  totalContratos: 1247,
  contratosAverbados: 892,
  contratosPagos: 654,
  contratosCancelados: 89,
  comissaoPrevista: 245680,
  comissaoRecebida: 189340,
  saldoDevedorTotal: 12847635,
  numeroConsultores: 24,
};

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const calculatePercentage = (part: number, total: number) => 
  total > 0 ? ((part / total) * 100).toFixed(1) + "%" : "0%";

export function MetricsGrid() {
  const taxaRealizacao = (mockMetrics.comissaoRecebida / mockMetrics.comissaoPrevista) * 100;
  const taxaConversao = (mockMetrics.contratosPagos / mockMetrics.totalContratos) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total de Contratos"
        value={mockMetrics.totalContratos}
        subtitle="Contratos cadastrados"
        icon={<FileText className="h-8 w-8 text-primary" />}
        variant="primary"
        trend={{
          direction: "up",
          value: "+12.5%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Contratos Averbados"
        value={mockMetrics.contratosAverbados}
        subtitle={`${calculatePercentage(mockMetrics.contratosAverbados, mockMetrics.totalContratos)} do total`}
        icon={<CheckCircle className="h-8 w-8 text-success" />}
        variant="success"
        trend={{
          direction: "up",
          value: "+8.3%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Contratos Pagos"
        value={mockMetrics.contratosPagos}
        subtitle={`Taxa de conversão: ${taxaConversao.toFixed(1)}%`}
        icon={<CreditCard className="h-8 w-8 text-success" />}
        variant="success"
        trend={{
          direction: "up",
          value: "+5.7%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Cancelados"
        value={mockMetrics.contratosCancelados}
        subtitle={`${calculatePercentage(mockMetrics.contratosCancelados, mockMetrics.totalContratos)} do total`}
        icon={<XCircle className="h-8 w-8 text-danger" />}
        variant="danger"
        trend={{
          direction: "down",
          value: "-2.1%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Comissão Prevista"
        value={formatCurrency(mockMetrics.comissaoPrevista)}
        subtitle="Valor estimado"
        icon={<TrendingUp className="h-8 w-8 text-warning" />}
        variant="warning"
        trend={{
          direction: "up",
          value: "+15.2%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Comissão Recebida"
        value={formatCurrency(mockMetrics.comissaoRecebida)}
        subtitle={`Realização: ${taxaRealizacao.toFixed(1)}%`}
        icon={<DollarSign className="h-8 w-8 text-success" />}
        variant="success"
        trend={{
          direction: "up",
          value: "+9.8%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Saldo Devedor Total"
        value={formatCurrency(mockMetrics.saldoDevedorTotal)}
        subtitle="Portabilidade acumulada"
        icon={<Building className="h-8 w-8 text-primary" />}
        variant="primary"
        trend={{
          direction: "up",
          value: "+22.4%",
          label: "vs. mês anterior",
        }}
      />

      <KPICard
        title="Consultores Ativos"
        value={mockMetrics.numeroConsultores}
        subtitle="Equipe de vendas"
        icon={<Users className="h-8 w-8 text-primary" />}
        variant="primary"
        trend={{
          direction: "neutral",
          value: "0%",
          label: "vs. mês anterior",
        }}
      />
    </div>
  );
}