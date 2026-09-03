import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Studio from "./pages/Studio";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artisan/products/new" element={<Studio />} />
          <Route path="/buyer/requirements/new" element={<Studio />} />
          <Route path="/login" element={<Placeholder />} />
          <Route path="/register" element={<Placeholder />} />
          <Route path="/artisan/*" element={<Placeholder />} />
          <Route path="/buyer/*" element={<Placeholder />} />
          <Route path="/admin/*" element={<Placeholder />} />
          <Route path="/products/*" element={<Placeholder />} />
          <Route path="/artisans/*" element={<Placeholder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
