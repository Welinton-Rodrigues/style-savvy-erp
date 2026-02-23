import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const salesReport = [
  { period: "Sem 1", vendas: 8200 },
  { period: "Sem 2", vendas: 9500 },
  { period: "Sem 3", vendas: 11200 },
  { period: "Sem 4", vendas: 13400 },
];

const marginData = [
  { product: "Camiseta", margem: 58 },
  { product: "Calça", margem: 66 },
  { product: "Vestido", margem: 67 },
  { product: "Blusa", margem: 62 },
  { product: "Shorts", margem: 65 },
];

export default function RelatoriosPage() {
  const [startDate, setStartDate] = useState("2026-02-01");
  const [endDate, setEndDate] = useState("2026-02-23");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-header">Relatórios</h1>
          <p className="page-subheader">Análises e relatórios detalhados</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />Exportar
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Input type="date" className="w-auto" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span className="text-sm text-muted-foreground">até</span>
        <Input type="date" className="w-auto" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Vendas por Período</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesReport}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }} />
              <Bar dataKey="vendas" fill="hsl(217,91%,50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Margem de Lucro por Categoria (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marginData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" />
              <YAxis type="category" dataKey="product" tick={{ fontSize: 12 }} stroke="hsl(215,15%,47%)" width={80} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,90%)" }} />
              <Bar dataKey="margem" fill="hsl(142,71%,45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card text-center">
          <p className="text-xs text-muted-foreground">Total Vendas</p>
          <p className="text-xl font-bold text-foreground">156</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-xs text-muted-foreground">Faturamento</p>
          <p className="text-xl font-bold text-foreground">R$ 42.3k</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-xs text-muted-foreground">Ticket Médio</p>
          <p className="text-xl font-bold text-foreground">R$ 271</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-xs text-muted-foreground">Margem Média</p>
          <p className="text-xl font-bold text-success">63.6%</p>
        </div>
      </div>
    </div>
  );
}
