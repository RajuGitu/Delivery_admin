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
  AlertTriangle,
  Clock,
  Bell,
  Package,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const riskStyles = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

export const ConfirmedSlotsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const confirmedOrders = orders.filter(
    (o) => o.status === "confirmed" || o.status === "out_for_delivery"
  );

  const filteredOrders = confirmedOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReminder = (order) => {
    toast.success(`Reminder sent to ${order.recipientName}`, {
      description: `Delivery reminder for ${order.selectedSlot} on ${order.selectedDay}`,
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
            <h2 className="font-display font-bold text-xl">
              Confirmed Slots
            </h2>
            <p className="text-muted-foreground text-sm">
              Orders with confirmed delivery time slots
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30">
        <div className="text-center">
          <p className="text-3xl font-display font-bold text-success">
            {confirmedOrders.filter((o) => o.riskLevel === "low").length}
          </p>
          <p className="text-sm text-muted-foreground">Low Risk</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-display font-bold text-warning">
            {confirmedOrders.filter((o) => o.riskLevel === "medium").length}
          </p>
          <p className="text-sm text-muted-foreground">Medium Risk</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-display font-bold text-destructive">
            {confirmedOrders.filter((o) => o.riskLevel === "high").length}
          </p>
          <p className="text-sm text-muted-foreground">High Risk</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Selected Day</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Risk Level</TableHead>
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
                      {order.deliveryAddress}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-accent/10 text-accent border-accent/20"
                    >
                      {order.selectedDay}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {order.selectedSlot}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {order.riskLevel && (
                      <Badge
                        className={cn(
                          "border",
                          riskStyles[order.riskLevel]
                        )}
                      >
                        {order.riskLevel === "high" && (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {order.riskLevel.charAt(0).toUpperCase() +
                          order.riskLevel.slice(1)}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        "border",
                        order.status === "confirmed"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      )}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {order.status === "confirmed"
                        ? "Confirmed"
                        : "Out for Delivery"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendReminder(order)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Bell className="w-4 h-4 mr-1" />
                      Remind
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
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No confirmed orders found
          </p>
        </div>
      )}
    </motion.div>
  );
};
