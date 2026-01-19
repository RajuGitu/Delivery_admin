import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { orders } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Search,
  RefreshCw,
  Mail,
  Clock,
  Package,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const reasonStyles = {
  "Recipient unavailable": "bg-warning/10 text-warning border-warning/20",
  "Route conflict": "bg-destructive/10 text-destructive border-destructive/20",
  Overload: "bg-accent/10 text-accent border-accent/20",
};

export const RescheduledTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const rescheduledOrders = orders.filter(
    (o) => o.status === "rescheduled" || o.status === "pending"
  );

  const filteredOrders = rescheduledOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReschedule = (order) => {
    toast.success(`Reschedule request sent to ${order.recipientName}`, {
      description: "New slot options have been sent to the recipient",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-warning" />
              Rescheduled & Pending Orders
            </h2>
            <p className="text-muted-foreground text-sm">
              Orders that need attention or rescheduling
            </p>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="p-4 bg-warning/10 border-b border-warning/20 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
        <p className="text-sm text-warning">
          <strong>{rescheduledOrders.length} orders</strong> require immediate
          attention for rescheduling
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Previous Slot</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>New Suggested Slots</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-mono font-medium text-primary">
                    {order.id}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium">
                        {order.productName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">{order.recipientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.recipientPhone}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="line-through opacity-50"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {order.selectedSlot || order.recommendedSlots[0]}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {order.reason && (
                      <Badge
                        className={cn(
                          "border",
                          reasonStyles[order.reason] ||
                            "bg-muted text-muted-foreground"
                        )}
                      >
                        {order.reason}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.recommendedSlots.slice(0, 2).map((slot, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-success/5"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "border",
                        order.status === "rescheduled"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-muted text-muted-foreground border-muted"
                      )}
                    >
                      {order.status === "rescheduled"
                        ? "Rescheduled"
                        : "Pending"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="gradient-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleReschedule(order)}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Request
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-12 text-center">
          <RefreshCw className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No rescheduled orders found
          </p>
        </div>
      )}
    </motion.div>
  );
};
