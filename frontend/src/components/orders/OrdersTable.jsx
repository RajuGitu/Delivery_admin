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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Search,
  Mail,
  Eye,
  Clock,
  Package,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

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

export const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const warehouseOrders = orders.filter(
    (o) => o.status === "new" || o.status === "slots_sent"
  );

  const filteredOrders = warehouseOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.assignedArea.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && order.status === filter;
  });

  const handleSendSlots = (order) => {
    toast.success(`Slot options sent to ${order.recipientName}`, {
      description: `Email sent to notify about delivery time options for ${order.productName}`,
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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search orders, recipients, areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {["all", "new", "slots_sent"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className={cn(filter === status && "gradient-primary border-0")}
              >
                {status === "all" ? "All" : statusLabels[status]}
              </Button>
            ))}
          </div>
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
              <TableHead>Area / Pincode</TableHead>
              <TableHead>Recommended Slots</TableHead>
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
                  className="group hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
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
                    <p className="font-medium">{order.assignedArea}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.pincode}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.recommendedSlots.slice(0, 2).map((slot, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {slot}
                        </Badge>
                      ))}
                      {order.recommendedSlots.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{order.recommendedSlots.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className={cn("border", statusStyles[order.status])}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {order.status === "new" && (
                        <Button
                          size="sm"
                          className="gradient-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendSlots(order);
                          }}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Send Slots
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              Order Details - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Complete information about this delivery order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Info */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Product Information
                  </h4>
                  <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                    <p className="font-semibold text-lg">
                      {selectedOrder.productName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {selectedOrder.id}
                    </p>
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    Recipient Information
                  </h4>
                  <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                    <p className="font-semibold">
                      {selectedOrder.recipientName}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {selectedOrder.recipientPhone}
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>
                        {selectedOrder.deliveryAddress}
                        <br />
                        {selectedOrder.assignedArea} -{" "}
                        {selectedOrder.pincode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Slots */}
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  AI Recommended Delivery Slots
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedOrder.recommendedSlots.map((slot, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-medium">{slot}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {i === 0
                          ? "Best match"
                          : i === 1
                          ? "Good option"
                          : "Available"}
                      </p>
                      <CheckCircle className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>

                {selectedOrder.status === "new" && (
                  <Button
                    className="gradient-primary"
                    onClick={() => {
                      handleSendSlots(selectedOrder);
                      setSelectedOrder(null);
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Slot Options to Recipient
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
