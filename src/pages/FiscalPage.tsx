import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notas = [
  { id: 1, numero: "NFC-e 001234", cliente: "Ana Souza", valor: 359.7, data: "23/02/2026", status: "autorizada" },
  { id: 2, numero: "NFC-e 001233", cliente: "Carlos Oliveira", valor: 189.9, data: "22/02/2026", status: "autorizada" },
  { id: 3, numero: "NFC-e 001232", cliente: "Maria Santos", valor: 529.6, data: "22/02/2026", status: "pendente" },
  { id: 4, numero: "NF-e 000089", cliente: "Julia Ferreira", valor: 1250.0, data: "21/02/2026", status: "autorizada" },
  { id: 5, numero: "NFC-e 001231", cliente: "Pedro Lima", valor: 99.9, data: "20/02/2026", status: "rejeitada" },
];

const statusMap = {
  autorizada: { icon: CheckCircle, label: "Autorizada", className: "bg-success/10 text-success border-success/20" },
  pendente: { icon: Clock, label: "Pendente", className: "bg-warning/10 text-warning border-warning/20" },
  rejeitada: { icon: AlertCircle, label: "Rejeitada", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function FiscalPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-header">Fiscal</h1>
          <p className="page-subheader">Emissão e histórico de notas fiscais</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />Emitir NFC-e
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Autorizadas</p>
          <p className="text-2xl font-bold text-success">48</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Pendentes</p>
          <p className="text-2xl font-bold text-warning">3</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Rejeitadas</p>
          <p className="text-2xl font-bold text-destructive">1</p>
        </div>
      </div>

      <div className="stat-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-foreground mb-4">Histórico de Notas</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Número</th>
              <th className="pb-3 font-medium text-muted-foreground">Cliente</th>
              <th className="pb-3 font-medium text-muted-foreground">Valor</th>
              <th className="pb-3 font-medium text-muted-foreground">Data</th>
              <th className="pb-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((n) => {
              const st = statusMap[n.status as keyof typeof statusMap];
              return (
                <tr key={n.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-mono text-xs text-foreground">{n.numero}</td>
                  <td className="py-3 text-muted-foreground">{n.cliente}</td>
                  <td className="py-3 font-medium text-foreground">R$ {n.valor.toFixed(2)}</td>
                  <td className="py-3 text-muted-foreground">{n.data}</td>
                  <td className="py-3">
                    <Badge variant="outline" className={st.className}>
                      <st.icon className="h-3 w-3 mr-1" />{st.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
