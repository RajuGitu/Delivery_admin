import { motion } from "framer-motion";
import { Plus, Eye, CalendarClock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Create New Order",
    description: "Add a new delivery order",
    icon: Plus,
    path: "/orders",
    color: "gradient-primary",
  },
  {
    title: "View Orders",
    description: "Manage all orders",
    icon: Eye,
    path: "/orders",
    color: "gradient-accent",
  },
  {
    title: "Delivery Plan",
    description: "Today's schedule",
    icon: CalendarClock,
    path: "/delivery-plan",
    color: "gradient-success",
  },
  {
    title: "Analytics",
    description: "View insights",
    icon: BarChart3,
    path: "/analytics",
    color: "gradient-dark",
  },
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-md"
    >
      <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Link
              to={action.path}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
