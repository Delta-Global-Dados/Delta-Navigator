import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Filter, 
  Download, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Building,
  User
} from "lucide-react";

// Mock data
const mockData = [
  {
    id: "001",
    data_cadastro: "15/08/2024",
    banco: "Banco do Brasil",
    consultor: "João Silva",
    status: "Pago",
    saldo_devedor: 45780.50,
    comissao_prevista: 2289.03,
    comissao_recebida: 2289.03,
    data_pago: "20/08/2024",
  },
  {
    id: "002",
    data_cadastro: "16/08/2024",
    banco: "Caixa Econômica",
    consultor: "Maria Santos",
    status: "Averbado",
    saldo_devedor: 67890.25,
    comissao_prevista: 3394.51,
    comissao_recebida: 0,
    data_pago: null,
  },
  {
    id: "003",
    data_cadastro: "17/08/2024",
    banco: "Itaú",
    consultor: "Pedro Costa",
    status: "Cancelado",
    saldo_devedor: 23450.80,
    comissao_prevista: 1172.54,
    comissao_recebida: 0,
    data_pago: null,
  },
  {
    id: "004",
    data_cadastro: "18/08/2024",
    banco: "Bradesco",
    consultor: "Ana Lima",
    status: "Cadastrado",
    saldo_devedor: 89123.45,
    comissao_prevista: 4456.17,
    comissao_recebida: 0,
    data_pago: null,
  },
];

const statusColors = {
  "Pago": "bg-success text-success-foreground",
  "Averbado": "bg-primary text-primary-foreground", 
  "Cadastrado": "bg-warning text-warning-foreground",
  "Cancelado": "bg-danger text-danger-foreground",
};

export default function Explore() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bancoFilter, setBancoFilter] = useState("all");
  
  const itemsPerPage = 10;
  const totalItems = 1247; // Mock total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Explorar Dados</h1>
        <p className="text-muted-foreground">
          Tabela dinâmica com filtros e busca avançada
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ID, consultor, banco..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="averbado">Averbado</SelectItem>
                  <SelectItem value="cadastrado">Cadastrado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Banco</label>
              <Select value={bancoFilter} onValueChange={setBancoFilter}>
                <SelectTrigger>
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="bb">Banco do Brasil</SelectItem>
                  <SelectItem value="caixa">Caixa Econômica</SelectItem>
                  <SelectItem value="itau">Itaú</SelectItem>
                  <SelectItem value="bradesco">Bradesco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select defaultValue="30-dias">
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7-dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30-dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="90-dias">Últimos 90 dias</SelectItem>
                  <SelectItem value="custom">Período customizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {totalItems.toLocaleString('pt-BR')} registros encontrados
              </Badge>
              <Badge variant="outline">
                Página {currentPage} de {totalPages}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Limpar Filtros
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dados dos Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                  <TableHead>Banco</TableHead>
                  <TableHead>Consultor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Saldo Devedor</TableHead>
                  <TableHead className="text-right">Comissão Prevista</TableHead>
                  <TableHead className="text-right">Comissão Recebida</TableHead>
                  <TableHead>Data Pagamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono">{row.id}</TableCell>
                    <TableCell>{row.data_cadastro}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {row.banco}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {row.consultor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={statusColors[row.status as keyof typeof statusColors]}
                        variant="secondary"
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(row.saldo_devedor)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(row.comissao_prevista)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {row.comissao_recebida > 0 
                        ? formatCurrency(row.comissao_recebida)
                        : <span className="text-muted-foreground">-</span>
                      }
                    </TableCell>
                    <TableCell>
                      {row.data_pago || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems.toLocaleString('pt-BR')} registros
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}