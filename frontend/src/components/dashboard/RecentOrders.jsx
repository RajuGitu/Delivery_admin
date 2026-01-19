import { motion } from "framer-motion";
import { orders } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  new: "bg-accent/10 text-accent border-accent/20",
  slots_sent: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-success/10 text-success border-success/20",
  out_for_delivery: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/10 text-success border-success/20",
  rescheduled: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  new: "New",
  slots_sent: "Slots Sent",
  confirmed: "Confirmed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  rescheduled: "Rescheduled",
  pending: "Pending",
};

export const RecentOrders = () => {
  const recentOrders = orders.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg">Recent Orders</h2>
        <Link
          to="/orders"
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {recentOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{order.productName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {order.recipientName} • {order.assignedArea}
              </p>
            </div>
            <Badge className={cn("border", statusStyles[order.status])}>
              {statusLabels[order.status]}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
