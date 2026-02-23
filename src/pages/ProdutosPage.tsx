import { useState } from "react";
import { Plus, Search, Edit, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockProducts = [
  { id: 1, name: "Camiseta Básica", category: "Camisetas", brand: "BasicWear", sku: "CAM-001", barcode: "7891234560001", costPrice: 25, sellPrice: 59.9, sizes: ["P", "M", "G", "GG"], colors: ["Branca", "Preta", "Cinza"] },
  { id: 2, name: "Calça Jeans Slim", category: "Calças", brand: "DenimCo", sku: "CAL-002", barcode: "7891234560002", costPrice: 65, sellPrice: 189.9, sizes: ["38", "40", "42", "44"], colors: ["Azul", "Preta"] },
  { id: 3, name: "Vestido Floral Midi", category: "Vestidos", brand: "FloralStyle", sku: "VES-003", barcode: "7891234560003", costPrice: 50, sellPrice: 149.9, sizes: ["P", "M", "G"], colors: ["Estampado"] },
  { id: 4, name: "Blusa Cropped", category: "Blusas", brand: "TrendUp", sku: "BLU-004", barcode: "7891234560004", costPrice: 30, sellPrice: 79.9, sizes: ["P", "M", "G"], colors: ["Rosa", "Branca"] },
  { id: 5, name: "Shorts Sarja", category: "Shorts", brand: "CasualFit", sku: "SHO-005", barcode: "7891234560005", costPrice: 35, sellPrice: 99.9, sizes: ["38", "40", "42"], colors: ["Bege", "Preto"] },
];

export default function ProdutosPage() {
  const [search, setSearch] = useState("");
  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="page-header">Produtos / Catálogo</h1>
          <p className="page-subheader">Gerencie seus produtos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Produto</th>
              <th className="pb-3 font-medium text-muted-foreground">Categoria</th>
              <th className="pb-3 font-medium text-muted-foreground">SKU</th>
              <th className="pb-3 font-medium text-muted-foreground">Custo</th>
              <th className="pb-3 font-medium text-muted-foreground">Venda</th>
              <th className="pb-3 font-medium text-muted-foreground">Variações</th>
              <th className="pb-3 font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Image className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{p.category}</td>
                <td className="py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                <td className="py-3 text-muted-foreground">R$ {p.costPrice.toFixed(2)}</td>
                <td className="py-3 font-medium text-foreground">R$ {p.sellPrice.toFixed(2)}</td>
                <td className="py-3">
                  <div className="flex gap-1 flex-wrap">
                    {p.sizes.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                    ))}
                    {p.sizes.length > 3 && <Badge variant="secondary" className="text-[10px]">+{p.sizes.length - 3}</Badge>}
                  </div>
                </td>
                <td className="py-3">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
