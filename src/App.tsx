import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Predictions from "./pages/Predictions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/optimization" element={<div className="p-8 ml-64"><h1>Optimización (En desarrollo)</h1></div>} />
          <Route path="/analysis" element={<div className="p-8 ml-64"><h1>Análisis (En desarrollo)</h1></div>} />
          <Route path="/data" element={<div className="p-8 ml-64"><h1>Datos (En desarrollo)</h1></div>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;