import { useState } from "react";
import { Plus, Search, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockClients = [
  { id: 1, name: "Ana Souza", cpf: "123.456.789-00", phone: "(11) 99999-1111", email: "ana@email.com", purchases: 12, totalSpent: 2340, recurring: true },
  { id: 2, name: "Carlos Oliveira", cpf: "987.654.321-00", phone: "(11) 98888-2222", email: "carlos@email.com", purchases: 3, totalSpent: 560, recurring: false },
  { id: 3, name: "Maria Santos", cpf: "456.789.123-00", phone: "(11) 97777-3333", email: "maria@email.com", purchases: 8, totalSpent: 1890, recurring: true },
  { id: 4, name: "Pedro Lima", cpf: "321.654.987-00", phone: "(11) 96666-4444", email: "pedro@email.com", purchases: 1, totalSpent: 189.9, recurring: false },
  { id: 5, name: "Julia Ferreira", cpf: "654.321.987-00", phone: "(11) 95555-5555", email: "julia@email.com", purchases: 15, totalSpent: 4200, recurring: true },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-header">Clientes</h1>
          <p className="page-subheader">Base de clientes cadastrados</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Novo Cliente</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar cliente..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              {c.recurring && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                  <UserCheck className="h-3 w-3 mr-1" />Recorrente
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-foreground">{c.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{c.cpf}</p>
            <p className="text-xs text-muted-foreground">{c.phone} · {c.email}</p>
            <div className="flex gap-4 mt-3 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Compras</p>
                <p className="text-sm font-semibold text-foreground">{c.purchases}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total gasto</p>
                <p className="text-sm font-semibold text-foreground">R$ {c.totalSpent.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
