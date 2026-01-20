import { AppSidebar } from "./AppSidebar";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AppSidebar />

      {/* Right content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="ml-64 flex-1 min-h-screen p-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
