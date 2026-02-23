import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockProducts = [
  { id: 1, name: "Camiseta Básica Branca", sku: "CAM-001", price: 59.9, sizes: ["P", "M", "G", "GG"], colors: ["Branca", "Preta", "Cinza"] },
  { id: 2, name: "Calça Jeans Slim", sku: "CAL-002", price: 189.9, sizes: ["38", "40", "42", "44"], colors: ["Azul", "Preta"] },
  { id: 3, name: "Vestido Floral Midi", sku: "VES-003", price: 149.9, sizes: ["P", "M", "G"], colors: ["Estampado"] },
  { id: 4, name: "Blusa Cropped", sku: "BLU-004", price: 79.9, sizes: ["P", "M", "G"], colors: ["Rosa", "Branca"] },
  { id: 5, name: "Shorts Sarja", sku: "SHO-005", price: 99.9, sizes: ["38", "40", "42"], colors: ["Bege", "Preto"] },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  qty: number;
}

export default function VendasPage() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);

  const filtered = mockProducts.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (p: typeof mockProducts[0]) => {
    const existing = cart.find((c) => c.id === p.id);
    if (existing) {
      setCart(cart.map((c) => (c.id === p.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { id: p.id, name: p.name, price: p.price, size: p.sizes[0], color: p.colors[0], qty: 1 }]);
    }
  };

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)));
  };

  const removeItem = (id: number) => setCart(cart.filter((c) => c.id !== id));

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const total = subtotal - discount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Vendas / PDV</h1>
        <p className="page-subheader">Ponto de venda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Product search */}
        <div className="lg:col-span-3 stat-card space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, SKU ou código de barras..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="flex flex-col items-start p-3 rounded-lg border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all text-left"
              >
                <span className="text-sm font-medium text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">SKU: {p.sku}</span>
                <span className="text-sm font-bold text-primary mt-1">R$ {p.price.toFixed(2)}</span>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {p.sizes.map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{s}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-2 stat-card flex flex-col">
          <h3 className="text-sm font-semibold text-foreground mb-3">Carrinho</h3>
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Carrinho vazio</p>
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[350px]">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.size} · {item.color}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, -1)} className="h-6 w-6 rounded bg-secondary flex items-center justify-center hover:bg-accent">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-6 text-center font-medium">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="h-6 w-6 rounded bg-secondary flex items-center justify-center hover:bg-accent">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold w-20 text-right text-foreground">
                    R$ {(item.price * item.qty).toFixed(2)}
                  </span>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Desconto</span>
              <Input
                type="number"
                className="w-24 h-7 text-right text-sm"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
              <Banknote className="h-4 w-4" />
              <span className="text-[10px]">Dinheiro</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="text-[10px]">Cartão</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
              <QrCode className="h-4 w-4" />
              <span className="text-[10px]">Pix</span>
            </Button>
          </div>

          <Button className="mt-3 w-full" disabled={cart.length === 0}>
            Finalizar Venda
          </Button>
        </div>
      </div>
    </div>
  );
}
