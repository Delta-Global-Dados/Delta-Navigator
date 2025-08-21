import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layouts/AppLayout";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Explore from "./pages/Explore";
import Quality from "./pages/Quality";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
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
          <Route path="/upload" element={
            <AppLayout>
              <Upload />
            </AppLayout>
          } />
          <Route path="/explore" element={
            <AppLayout>
              <Explore />
            </AppLayout>
          } />
          <Route path="/quality" element={
            <AppLayout>
              <Quality />
            </AppLayout>
          } />
          <Route path="/insights" element={
            <AppLayout>
              <Insights />
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <Reports />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
