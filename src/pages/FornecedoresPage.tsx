import { useState } from "react";
import { Plus, Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockSuppliers = [
  { id: 1, name: "DenimCo Têxtil", contact: "João Mendes", phone: "(11) 3333-1111", email: "vendas@denimco.com.br", totalOrders: 24, totalSpent: 45200 },
  { id: 2, name: "BasicWear Confecções", contact: "Carla Rocha", phone: "(11) 3333-2222", email: "contato@basicwear.com.br", totalOrders: 18, totalSpent: 28500 },
  { id: 3, name: "FloralStyle Import", contact: "Roberto Alves", phone: "(21) 3333-3333", email: "comercial@floralstyle.com.br", totalOrders: 10, totalSpent: 18900 },
  { id: 4, name: "TrendUp Moda", contact: "Patricia Lima", phone: "(11) 3333-4444", email: "pedidos@trendup.com.br", totalOrders: 15, totalSpent: 22100 },
];

export default function FornecedoresPage() {
  const [search, setSearch] = useState("");
  const filtered = mockSuppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-header">Fornecedores</h1>
          <p className="page-subheader">Gerencie seus fornecedores</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Novo Fornecedor</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar fornecedor..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.contact}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {s.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.phone}</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.email}</span>
            </div>
            <div className="flex gap-6 mt-3 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Pedidos</p>
                <p className="text-sm font-semibold text-foreground">{s.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-sm font-semibold text-foreground">R$ {s.totalSpent.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
