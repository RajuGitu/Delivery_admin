import { motion } from "framer-motion";
import { deliveryBoys } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Truck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  not_started: "bg-muted text-muted-foreground",
  out_for_delivery: "bg-success/10 text-success",
  completed: "bg-accent/10 text-accent",
};

const statusLabels = {
  not_started: "Not Started",
  out_for_delivery: "Out for Delivery",
  completed: "Completed",
};

export const DeliveryBoyStatus = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg">Delivery Agents</h2>
        <Link
          to="/delivery-plan"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Manage
        </Link>
      </div>
      <div className="space-y-3">
        {deliveryBoys.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
              />
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                  agent.status === "out_for_delivery"
                    ? "bg-success"
                    : agent.status === "completed"
                    ? "bg-accent"
                    : "bg-muted-foreground"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{agent.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{agent.assignedArea}</span>
              </div>
            </div>
            <div className="text-right">
              <p
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  statusStyles[agent.status]
                )}
              >
                {statusLabels[agent.status]}
              </p>
              <p className="text-sm font-medium mt-1">
                <Truck className="w-3 h-3 inline mr-1" />
                {agent.totalDeliveriesToday}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
