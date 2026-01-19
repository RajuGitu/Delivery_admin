import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  CheckCircle2,
  Truck,
  RefreshCw,
  BarChart3,
  Settings,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Orders Received", path: "/orders", icon: Package },
  { title: "Confirmed Slots", path: "/confirmed", icon: CheckCircle2 },
  { title: "Delivery Plan", path: "/delivery-plan", icon: Truck },
  { title: "Rescheduled", path: "/rescheduled", icon: RefreshCw },
  { title: "Analytics", path: "/analytics", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground z-50 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">SlotSync</h1>
              <p className="text-xs text-sidebar-foreground/60">
                Delivery Hub
              </p>
            </div>
          </motion.div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "animate-pulse-glow"
                )}
              />

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.title}
                </motion.span>
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-sidebar-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-sidebar-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
              <span className="font-bold text-sm text-accent-foreground">
                AK
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                admin@slotsync.com
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};
