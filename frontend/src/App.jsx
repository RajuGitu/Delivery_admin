import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";

// ADMIN PAGES
import Dashboard from "./pages/Dashboard";
import OrdersReceived from "./pages/OrdersReceived";
import ConfirmedSlots from "./pages/ConfirmedSlots";
import DeliveryPlan from "./pages/DeliveryPlan";
import Rescheduled from "./pages/Rescheduled";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// PUBLIC / CUSTOMER PAGE
import Index from "./pages/Index";

// MISC
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* ---------------------- */}
          {/* ADMIN ROUTES (Sidebar) */}
          {/* ---------------------- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersReceived />} />
            <Route path="/confirmed" element={<ConfirmedSlots />} />
            <Route path="/delivery-plan" element={<DeliveryPlan />} />
            <Route path="/rescheduled" element={<Rescheduled />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* -------------------------------- */}
          {/* CUSTOMER DELIVERY PAGE (NO SIDEBAR) */}
          {/* -------------------------------- */}
          <Route path="/track" element={<Index />} />

          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
