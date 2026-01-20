import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Package, Inbox } from "lucide-react";
import deliveryVan from "@/assets/delivery-van.jpg";
import axios from "axios";

const OrdersReceived = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5001/api/orders/pending-slot-orders"
                );

                console.log("📦 Orders fetched:", res.data);
                setOrders(res.data.orders);
            } catch (err) {
                console.error("❌ Failed to fetch orders", err);
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header with Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-40 rounded-2xl overflow-hidden"
            >
                <img
                    src={deliveryVan}
                    alt="Delivery Van"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 gradient-primary opacity-80" />
                <div className="absolute inset-0 flex items-center px-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                            <Inbox className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-primary-foreground">
                                Orders Received
                            </h1>
                            <p className="text-primary-foreground/80">
                                Manage warehouse orders and send slot recommendations
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Info Cards (can be dynamic later) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {/* New Orders */}
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-accent" />
                        <div>
                            <p className="text-2xl font-display font-bold">
                                {orders.filter(o => o.status === "new").length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                New Orders
                            </p>
                        </div>
                    </div>
                </div>

                {/* Slots Sent */}
                <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-warning" />
                        <div>
                            <p className="text-2xl font-display font-bold">
                                {orders.filter(o => o.status === "slots_sent").length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Slots Sent
                            </p>
                        </div>
                    </div>
                </div>

                {/* Awaiting Slot Confirmation */}
                <div className="p-4 rounded-xl bg-blue-100 border border-blue-300">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-2xl font-display font-bold">
                                {orders.filter(o => o.status === "awaiting_slot").length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Awaiting Recipient Slot
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>


            {/* Loading / Error */}
            {loading && (
                <p className="text-center text-muted-foreground">
                    Loading orders...
                </p>
            )}

            {error && (
                <p className="text-center text-red-500">
                    {error}
                </p>
            )}

            {/* Orders Table */}
            {!loading && !error && (
                <OrdersTable orders={orders} />
            )}
        </div>
    );
};

export default OrdersReceived;
