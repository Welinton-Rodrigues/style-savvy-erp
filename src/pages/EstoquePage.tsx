import { useState } from "react";
import { Search, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const stockData = [
  { id: 1, name: "Camiseta Básica Branca", sku: "CAM-001", size: "M", color: "Branca", qty: 45, min: 10, status: "ok" },
  { id: 2, name: "Camiseta Básica Branca", sku: "CAM-001", size: "G", color: "Branca", qty: 3, min: 10, status: "low" },
  { id: 3, name: "Calça Jeans Slim", sku: "CAL-002", size: "40", color: "Azul", qty: 22, min: 5, status: "ok" },
  { id: 4, name: "Vestido Floral Midi", sku: "VES-003", size: "P", color: "Estampado", qty: 0, min: 5, status: "out" },
  { id: 5, name: "Blusa Cropped", sku: "BLU-004", size: "M", color: "Rosa", qty: 8, min: 10, status: "low" },
  { id: 6, name: "Shorts Sarja", sku: "SHO-005", size: "42", color: "Bege", qty: 30, min: 5, status: "ok" },
  { id: 7, name: "Calça Jeans Slim", sku: "CAL-002", size: "44", color: "Preta", qty: 2, min: 5, status: "low" },
];

const movements = [
  { id: 1, product: "Camiseta Básica Branca M", type: "saída", qty: 2, date: "23/02/2026" },
  { id: 2, product: "Calça Jeans Slim 40", type: "entrada", qty: 15, date: "22/02/2026" },
  { id: 3, product: "Vestido Floral P", type: "saída", qty: 1, date: "22/02/2026" },
  { id: 4, product: "Blusa Cropped M", type: "saída", qty: 3, date: "21/02/2026" },
];

const statusConfig = {
  ok: { label: "Normal", className: "bg-success/10 text-success border-success/20" },
  low: { label: "Baixo", className: "bg-warning/10 text-warning border-warning/20" },
  out: { label: "Esgotado", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function EstoquePage() {
  const [search, setSearch] = useState("");
  const filtered = stockData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const lowCount = stockData.filter((s) => s.status === "low" || s.status === "out").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Estoque</h1>
        <p className="page-subheader">Controle de estoque por produto, tamanho e cor</p>
      </div>

      {lowCount > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{lowCount} itens</span> com estoque baixo ou esgotado
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar no estoque..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="stat-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Produto</th>
                  <th className="pb-3 font-medium text-muted-foreground">Tam.</th>
                  <th className="pb-3 font-medium text-muted-foreground">Cor</th>
                  <th className="pb-3 font-medium text-muted-foreground">Qtd.</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const st = statusConfig[item.status as keyof typeof statusConfig];
                  return (
                    <tr key={item.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </td>
                      <td className="py-3 text-muted-foreground">{item.size}</td>
                      <td className="py-3 text-muted-foreground">{item.color}</td>
                      <td className="py-3 font-medium text-foreground">{item.qty}</td>
                      <td className="py-3">
                        <Badge variant="outline" className={st.className}>{st.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stat-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Movimentações Recentes</h3>
          <div className="space-y-3">
            {movements.map((m) => (
              <div key={m.id} className="flex items-start gap-3 p-2 rounded-lg bg-background">
                {m.type === "entrada" ? (
                  <div className="h-7 w-7 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <ArrowDown className="h-3.5 w-3.5 text-success" />
                  </div>
                ) : (
                  <div className="h-7 w-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <ArrowUp className="h-3.5 w-3.5 text-destructive" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{m.product}</p>
                  <p className="text-xs text-muted-foreground">{m.date} · {m.qty} un.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
