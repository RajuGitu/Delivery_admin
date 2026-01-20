import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
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

export const RescheduledTable = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter only rescheduled orders coming from backend
  const rescheduledOrders = orders.filter(
    (o) => o.status === "rescheduled"
  );

  // Search filter
  const filteredOrders = rescheduledOrders.filter((order) => {
    return (
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipientId?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const handleReschedule = async (order) => {
    try {
      await axios.post(
        `http://localhost:5001/api/orders/send-reschedule-email/${order._id}`
      );

      toast.success(`Reschedule email sent to ${order.recipientId?.name}`, {
        description: "Recipient has been notified to choose a new slot",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to send reschedule email");
    }
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
              Rescheduled Orders
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
          <strong>{rescheduledOrders.length} orders</strong> require
          immediate attention
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order Number</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Previous Slot</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>AI Suggested Slots</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-mono font-medium text-primary">
                    {order.orderNumber}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                      </div>
                      {order.product.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">{order.recipientId?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.recipientId?.phone}
                    </p>
                  </TableCell>

                  <TableCell>
                    {order.selectedSlot?.startTime ? (
                      <Badge
                        variant="outline"
                        className="line-through opacity-50"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {order.selectedSlot.startTime}–{order.selectedSlot.endTime}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No previous slot
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    {order.reason ? (
                      <Badge
                        className={cn(
                          "border",
                          reasonStyles[order.reason] ??
                          "bg-muted text-muted-foreground"
                        )}
                      >
                        {order.reason}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        —
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.systemRecommendedSlots?.map((slot, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-success/5"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {slot.startTime}–{slot.endTime}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-warning/10 text-warning border-warning/20">
                      Rescheduled
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
          <p className="text-muted-foreground">No rescheduled orders found</p>
        </div>
      )}
    </motion.div>
  );
};
