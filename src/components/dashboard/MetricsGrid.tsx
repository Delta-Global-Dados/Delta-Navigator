import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  totalRegistros?: number
  totalSaldo?: number
  totalComissaoPrevista?: number
  totalComissaoRecebida?: number
}

export function MetricsGrid({
  totalRegistros = 1247,
  totalSaldo = 226_244.99,
  totalComissaoPrevista = 28_000.00,
  totalComissaoRecebida = 2_289.03,
}: Props) {
  const brl = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="kpi-card-primary">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Registros</p>
              <p className="metric-value">{totalRegistros.toLocaleString("pt-BR")}</p>
            </div>
            <Badge variant="outline" className="border-primary text-primary">Ativos</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="kpi-card-success">
        <CardContent className="p-4">
          <p className="metric-label">Saldo Devedor (Σ)</p>
          <p className="metric-value">{brl(totalSaldo)}</p>
        </CardContent>
      </Card>

      <Card className="kpi-card-warning">
        <CardContent className="p-4">
          <p className="metric-label">Comissão Prevista (Σ)</p>
          <p className="metric-value">{brl(totalComissaoPrevista)}</p>
        </CardContent>
      </Card>

      <Card className="kpi-card-danger">
        <CardContent className="p-4">
          <p className="metric-label">Comissão Recebida (Σ)</p>
          <p className="metric-value">{brl(totalComissaoRecebida)}</p>
        </CardContent>
      </Card>
    </div>
  )
}