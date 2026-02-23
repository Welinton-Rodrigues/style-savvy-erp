import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Tag, AlertTriangle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const salesData = [
  { month: "Jan", vendas: 32400 },
  { month: "Fev", vendas: 28900 },
  { month: "Mar", vendas: 41200 },
  { month: "Abr", vendas: 37800 },
  { month: "Mai", vendas: 45100 },
  { month: "Jun", vendas: 42300 },
];

const topProducts = [
  { name: "Camiseta Básica", value: 320 },
  { name: "Calça Jeans", value: 245 },
  { name: "Vestido Floral", value: 189 },
  { name: "Blusa Cropped", value: 156 },
  { name: "Shorts Sarja", value: 134 },
];

const COLORS = [
  "hsl(217,91%,50%)",
  "hsl(142,71%,45%)",
  "hsl(38,92%,50%)",
  "hsl(280,65%,60%)",
  "hsl(340,75%,55%)",
];

const stats = [
  { title: "Faturamento Hoje", value: "R$ 4.230,00", change: "+12%", up: true, icon: DollarSign },
  { title: "Vendas Hoje", value: "23", change: "+5%", up: true, icon: ShoppingCart },
  { title: "Ticket Médio", value: "R$ 183,91", change: "-2%", up: false, icon: Tag },
  { title: "Produtos em Falta", value: "7", change: "+3", up: false, icon: AlertTriangle },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">Resumo geral da sua loja</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.title}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.up ? (
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span className={`text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">vs ontem</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="stat-card lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Vendas por Mês</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
              <Tooltip
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Vendas"]}
                contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }}
              />
              <Bar dataKey="vendas" fill="hsl(217,91%,50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Mais Vendidos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={topProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={40}>
                {topProducts.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {topProducts.slice(0, 3).map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-muted-foreground flex-1">{p.name}</span>
                <span className="font-medium text-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
