import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data para os gráficos
const trendData = [
  { mes: "Jan", cadastrados: 145, pagos: 89, cancelados: 12 },
  { mes: "Fev", cadastrados: 162, pagos: 104, cancelados: 8 },
  { mes: "Mar", cadastrados: 189, pagos: 127, cancelados: 15 },
  { mes: "Abr", cadastrados: 201, pagos: 142, cancelados: 11 },
  { mes: "Mai", cadastrados: 198, pagos: 156, cancelados: 9 },
  { mes: "Jun", cadastrados: 224, pagos: 178, cancelados: 13 },
  { mes: "Jul", cadastrados: 234, pagos: 198, cancelados: 7 },
  { mes: "Ago", cadastrados: 247, pagos: 212, cancelados: 10 },
];

const bankData = [
  { banco: "Banco do Brasil", contratos: 342, valor: 2847650 },
  { banco: "Caixa Econômica", contratos: 298, valor: 2156780 },
  { banco: "Itaú", contratos: 234, valor: 1892340 },
  { banco: "Bradesco", contratos: 198, valor: 1654320 },
  { banco: "Santander", contratos: 175, valor: 1234560 },
];

const statusDistribution = [
  { name: "Pagos", value: 654, color: "hsl(var(--success))" },
  { name: "Averbados", value: 238, color: "hsl(var(--primary))" },
  { name: "Cadastrados", value: 266, color: "hsl(var(--warning))" },
  { name: "Cancelados", value: 89, color: "hsl(var(--danger))" },
];

const comissionTrend = [
  { mes: "Jan", prevista: 28500, recebida: 22100 },
  { mes: "Fev", prevista: 31200, recebida: 26800 },
  { mes: "Mar", prevista: 34800, recebida: 31200 },
  { mes: "Abr", prevista: 38900, recebida: 34500 },
  { mes: "Mai", prevista: 42100, recebida: 38900 },
  { mes: "Jun", prevista: 45600, recebida: 42300 },
  { mes: "Jul", prevista: 48200, recebida: 45100 },
  { mes: "Ago", prevista: 51800, recebida: 47800 },
];

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Tendência de Contratos */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Tendência Mensal de Contratos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="cadastrados"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="pagos"
                stackId="2"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance por Banco */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Top 5 Bancos por Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bankData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                dataKey="banco" 
                type="category" 
                width={100}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                formatter={(value: number) => [value, "Contratos"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="contratos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuição de Status */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Distribuição por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [value, "Contratos"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comissão Prevista vs Recebida */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Comissão: Prevista vs Recebida</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="prevista"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="recebida"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}