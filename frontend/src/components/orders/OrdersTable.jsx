import { useState, useEffect } from "react";
import axios from "axios";
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
  awaiting_slot: "bg-warning/10 text-warning border-warning/20",
  slots_sent: "bg-warning/10 text-warning border-warning/20",
  slot_confirmed: "bg-success/10 text-success border-success/20",
  pending_feasibility_check: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  new: "New",
  awaiting_slot: "Awaiting Slot",
  slots_sent: "Slots Sent",
  slot_confirmed: "Slot Confirmed",
};

export const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ORDERS FROM BACKEND
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/orders/pending-slot-orders"
        );

        console.log("📦 Backend Orders:", res.data.orders);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("❌ Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter only new + awaiting_slot
  const warehouseOrders = orders.filter(
    (o) =>
      o.status === "new" ||
      o.status === "awaiting_slot" ||
      o.status === "slots_sent"
  );


  // Search + filter logic
  const filteredOrders = warehouseOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.recipientId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.assignedArea?.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && order.status === filter;
  });

  // Email sending
  const handleSendSlots = async (order) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/orders/send-slot-email/${order._id}`
      );

      toast.success("Slot email sent!", {
        description: `Email sent to ${order.recipientId?.email}`,
      });

      // Optional: Refresh orders after sending email
      setOrders(prev =>
        prev.map(o =>
          o._id === order._id ? { ...o, status: "slots_sent" } : o
        )
      );

    } catch (error) {
      console.error("❌ Failed to send slot email:", error);
      toast.error("Failed to send email.");
    }
  };

  if (loading) {
    return (
      <p className="text-center py-6 text-muted-foreground">
        Loading orders...
      </p>
    );
  }

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
            {["all", "new", "awaiting_slot"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
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
              <TableHead>Order Number</TableHead>
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
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-mono font-medium text-primary">
                    {order.orderNumber}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium">{order.product.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="font-medium">{order.recipientId?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.recipientId?.phone}
                    </p>
                  </TableCell>

                  <TableCell>
                    {/* <p className="font-medium">{order.assignedArea}</p> */}
                    <p className="text-sm text-muted-foreground">
                      {order.pincode}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.systemRecommendedSlots.slice(0, 2).map((slot, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {slot.startTime} – {slot.endTime}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className={cn("border", statusStyles[order.status])}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button> */}

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
    </motion.div>
  );
};
