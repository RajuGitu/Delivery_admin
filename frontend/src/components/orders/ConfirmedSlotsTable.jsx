import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export const ConfirmedSlotsTable = ({ orders = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Backend uses "slot_confirmed"
  const confirmedOrders = orders.filter(
    (o) => o.status === "slot_confirmed"
  );

  const filteredOrders = confirmedOrders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.recipientId?.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSendReminder = (order) => {
    toast.success(`Reminder sent to ${order.recipientId?.name}`, {
      description: `Delivery reminder for ${order.selectedSlot?.date}`,
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

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Order No</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
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
                  {/* Order Number */}
                  <TableCell className="font-mono font-medium text-primary">
                    {order.orderNumber}
                  </TableCell>

                  {/* Product */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                      </div>
                      {order.product.name}
                    </div>
                  </TableCell>

                  {/* Recipient */}
                  <TableCell>
                    <p className="font-medium">{order.recipientId?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.deliveryAddress}
                    </p>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {order.selectedSlot?.date ? (
                      <Badge variant="outline">
                        {order.selectedSlot.date}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  {/* Time */}
                  <TableCell>
                    {order.selectedSlot?.startTime ? (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {order.selectedSlot.startTime}–
                        {order.selectedSlot.endTime}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge className="bg-success/10 text-success border-success/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </TableCell>

                  {/* Actions */}
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
