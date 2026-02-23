import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const cashFlowData = [
  { month: "Jan", receitas: 32400, despesas: 18500 },
  { month: "Fev", receitas: 28900, despesas: 17200 },
  { month: "Mar", receitas: 41200, despesas: 22100 },
  { month: "Abr", receitas: 37800, despesas: 19800 },
  { month: "Mai", receitas: 45100, despesas: 21400 },
  { month: "Jun", receitas: 42300, despesas: 20800 },
];

const contasPagar = [
  { id: 1, desc: "Aluguel da loja", value: 3500, due: "01/03/2026", status: "pendente" },
  { id: 2, desc: "Fornecedor DenimCo", value: 8200, due: "05/03/2026", status: "pendente" },
  { id: 3, desc: "Energia elétrica", value: 680, due: "10/03/2026", status: "pago" },
  { id: 4, desc: "Internet", value: 199, due: "15/03/2026", status: "pago" },
];

const contasReceber = [
  { id: 1, desc: "Venda #1042 - Cartão", value: 1250, due: "28/02/2026", status: "pendente" },
  { id: 2, desc: "Venda #1038 - Parcelado", value: 890, due: "05/03/2026", status: "pendente" },
  { id: 3, desc: "Venda #1025 - Cartão", value: 2100, due: "20/02/2026", status: "recebido" },
];

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Financeiro</h1>
        <p className="page-subheader">Visão geral financeira</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />Receitas (mês)
          </div>
          <p className="text-2xl font-bold text-foreground">R$ 42.300</p>
          <span className="text-xs text-success">+8% vs mês anterior</span>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingDown className="h-4 w-4" />Despesas (mês)
          </div>
          <p className="text-2xl font-bold text-foreground">R$ 20.800</p>
          <span className="text-xs text-destructive">+3% vs mês anterior</span>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <DollarSign className="h-4 w-4" />Lucro Líquido
          </div>
          <p className="text-2xl font-bold text-success">R$ 21.500</p>
          <span className="text-xs text-success">Margem 50.8%</span>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">Receitas x Despesas</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }} />
            <Legend />
            <Bar dataKey="receitas" name="Receitas" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despesas" name="Despesas" fill="hsl(0,72%,51%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Contas a Pagar</h3>
          <div className="space-y-3">
            {contasPagar.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                <ArrowUpRight className="h-4 w-4 text-destructive shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.desc}</p>
                  <p className="text-xs text-muted-foreground">Vencimento: {c.due}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">R$ {c.value.toLocaleString("pt-BR")}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === "pago" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Contas a Receber</h3>
          <div className="space-y-3">
            {contasReceber.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                <ArrowDownRight className="h-4 w-4 text-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.desc}</p>
                  <p className="text-xs text-muted-foreground">Vencimento: {c.due}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">R$ {c.value.toLocaleString("pt-BR")}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === "recebido" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
