import { AppSidebar } from "./AppSidebar";
import { motion } from "framer-motion";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="ml-64 min-h-screen p-6"
      >
        {children}
      </motion.main>
    </div>
  );
};
