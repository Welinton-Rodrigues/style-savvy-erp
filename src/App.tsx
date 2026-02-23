import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import VendasPage from "./pages/VendasPage";
import ProdutosPage from "./pages/ProdutosPage";
import EstoquePage from "./pages/EstoquePage";
import ClientesPage from "./pages/ClientesPage";
import FinanceiroPage from "./pages/FinanceiroPage";
import FiscalPage from "./pages/FiscalPage";
import FornecedoresPage from "./pages/FornecedoresPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import AnalisePreditivaPage from "./pages/AnalisePreditivaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/vendas" element={<VendasPage />} />
                  <Route path="/produtos" element={<ProdutosPage />} />
                  <Route path="/estoque" element={<EstoquePage />} />
                  <Route path="/clientes" element={<ClientesPage />} />
                  <Route path="/financeiro" element={<FinanceiroPage />} />
                  <Route path="/fiscal" element={<FiscalPage />} />
                  <Route path="/fornecedores" element={<FornecedoresPage />} />
                  <Route path="/relatorios" element={<RelatoriosPage />} />
                  <Route path="/analise-preditiva" element={<AnalisePreditivaPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
