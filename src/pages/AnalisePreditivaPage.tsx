import { BrainCircuit, TrendingUp, AlertTriangle, Package, RefreshCcw, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";

const forecastData = [
  { month: "Jan", real: 32400, previsao: null },
  { month: "Fev", real: 28900, previsao: null },
  { month: "Mar", real: 41200, previsao: null },
  { month: "Abr", real: 37800, previsao: null },
  { month: "Mai", real: 45100, previsao: null },
  { month: "Jun", real: 42300, previsao: null },
  { month: "Jul", real: null, previsao: 46800 },
  { month: "Ago", real: null, previsao: 48200 },
  { month: "Set", real: null, previsao: 51000 },
];

const demandProducts = [
  { name: "Camiseta Básica", currentStock: 48, predicted30d: 120, risk: "alto", trend: "up", suggestion: "Repor 80 unidades" },
  { name: "Calça Jeans Slim", currentStock: 24, predicted30d: 45, risk: "medio", trend: "up", suggestion: "Repor 25 unidades" },
  { name: "Vestido Floral Midi", currentStock: 0, predicted30d: 30, risk: "critico", trend: "up", suggestion: "Repor urgente 35 un." },
  { name: "Blusa Cropped", currentStock: 8, predicted30d: 40, risk: "alto", trend: "down", suggestion: "Repor 35 unidades" },
  { name: "Shorts Sarja", currentStock: 30, predicted30d: 20, risk: "baixo", trend: "stable", suggestion: "Estoque suficiente" },
];

const riskColors = {
  critico: "bg-destructive/10 text-destructive border-destructive/20",
  alto: "bg-warning/10 text-warning border-warning/20",
  medio: "bg-info/10 text-info border-info/20",
  baixo: "bg-success/10 text-success border-success/20",
};

const demandTrendData = [
  { week: "S1", camiseta: 28, calca: 15, vestido: 12 },
  { week: "S2", camiseta: 32, calca: 18, vestido: 14 },
  { week: "S3", camiseta: 35, calca: 16, vestido: 18 },
  { week: "S4", camiseta: 40, calca: 20, vestido: 10 },
  { week: "S5*", camiseta: 42, calca: 22, vestido: 15 },
  { week: "S6*", camiseta: 45, calca: 24, vestido: 17 },
];

export default function AnalisePreditivaPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h1 className="page-header">Análise Preditiva</h1>
        </div>
        <p className="page-subheader">Previsões inteligentes baseadas no histórico de vendas da sua loja</p>
      </div>

      {/* Alert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card border-l-4 border-l-destructive">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive">RUPTURA IMINENTE</span>
          </div>
          <p className="text-lg font-bold text-foreground">3 produtos</p>
          <p className="text-xs text-muted-foreground">Alta chance de ruptura nos próximos 15 dias</p>
        </div>
        <div className="stat-card border-l-4 border-l-warning">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDown className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold text-warning">QUEDA DE DEMANDA</span>
          </div>
          <p className="text-lg font-bold text-foreground">1 produto</p>
          <p className="text-xs text-muted-foreground">Demanda em queda — considere promoção</p>
        </div>
        <div className="stat-card border-l-4 border-l-success">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold text-success">TENDÊNCIA DE ALTA</span>
          </div>
          <p className="text-lg font-bold text-foreground">+12%</p>
          <p className="text-xs text-muted-foreground">Previsão de crescimento para o próximo mês</p>
        </div>
      </div>

      {/* Forecast chart */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-1">Previsão de Faturamento</h3>
        <p className="text-xs text-muted-foreground mb-4">Dados reais + projeção para os próximos 3 meses</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }} />
            <Area type="monotone" dataKey="real" stroke="hsl(217,91%,50%)" fill="hsl(217,91%,50%)" fillOpacity={0.1} strokeWidth={2} name="Real" />
            <Area type="monotone" dataKey="previsao" stroke="hsl(280,65%,60%)" fill="hsl(280,65%,60%)" fillOpacity={0.1} strokeWidth={2} strokeDasharray="8 4" name="Previsão" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Demand prediction table */}
        <div className="lg:col-span-3 stat-card overflow-x-auto">
          <h3 className="text-sm font-semibold text-foreground mb-1">Previsão de Demanda por Produto</h3>
          <p className="text-xs text-muted-foreground mb-4">Estimativa para os próximos 30 dias</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Produto</th>
                <th className="pb-3 font-medium text-muted-foreground">Estoque</th>
                <th className="pb-3 font-medium text-muted-foreground">Demanda (30d)</th>
                <th className="pb-3 font-medium text-muted-foreground">Risco</th>
                <th className="pb-3 font-medium text-muted-foreground">Sugestão</th>
              </tr>
            </thead>
            <tbody>
              {demandProducts.map((p) => (
                <tr key={p.name} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 text-foreground">{p.currentStock}</td>
                  <td className="py-3 text-foreground">{p.predicted30d}</td>
                  <td className="py-3">
                    <Badge variant="outline" className={riskColors[p.risk as keyof typeof riskColors]}>
                      {p.risk}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <RefreshCcw className="h-3 w-3" />
                      {p.suggestion}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Demand trend */}
        <div className="lg:col-span-2 stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-1">Tendência de Demanda</h3>
          <p className="text-xs text-muted-foreground mb-4">Semanas com * são projeções</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={demandTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(215,15%,47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,15%,47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }} />
              <Line type="monotone" dataKey="camiseta" stroke="hsl(217,91%,50%)" strokeWidth={2} name="Camiseta" dot={false} />
              <Line type="monotone" dataKey="calca" stroke="hsl(142,71%,45%)" strokeWidth={2} name="Calça" dot={false} />
              <Line type="monotone" dataKey="vestido" stroke="hsl(38,92%,50%)" strokeWidth={2} name="Vestido" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Explanatory note */}
      <div className="stat-card bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <BrainCircuit className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Como funciona?</h4>
            <p className="text-sm text-muted-foreground">
              As previsões são calculadas com base no histórico de vendas da sua loja, sazonalidade e tendências de mercado.
              Quando integrado com modelos de Machine Learning, a precisão das previsões será ainda maior.
              Os indicadores de risco ajudam a tomar decisões proativas de reposição de estoque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
