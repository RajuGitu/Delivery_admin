import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/routes/ProtectedRoute";

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
import Login from "./pages/Login";
import DeliveryAgentDashboard from "./pages/DeliveryAgentDashboard";


// PUBLIC / CUSTOMER PAGE
import Index from "./pages/Index";

// MISC
import NotFound from "./pages/NotFound";
import DeliveryBoy from "./pages/DeliveryBoy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* ---------------- */}
          {/* PUBLIC ROUTES */}
          {/* ---------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/track/:orderId" element={<Index />} />
          {/* ---------------- */}
          {/* ADMIN ROUTES */}
          {/* ---------------- */}
          <Route
            element={
              <ProtectedRoute allowedRole="admin">
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersReceived />} />
            <Route path="/confirmed" element={<ConfirmedSlots />} />
            <Route path="/delivery-plan" element={<DeliveryPlan />} />
            <Route path="/rescheduled" element={<Rescheduled />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* ----------------------- */}
          {/* DELIVERY AGENT ROUTES */}
          {/* ----------------------- */}
          <Route
            path="/delivery_agent"
            element={
              <ProtectedRoute allowedRole="delivery">
                <DeliveryAgentDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------------- */}
          {/* NOT FOUND */}
          {/* ---------------- */}
          <Route path="*" element={<NotFound />} />

          <Route path="/delivery_partner" element={<DeliveryBoy />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
