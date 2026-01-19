import { motion } from "framer-motion";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Package, Inbox } from "lucide-react";
import deliveryVan from "@/assets/delivery-van.jpg";

const OrdersReceived = () => {
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

            {/* Info Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-accent" />
                        <div>
                            <p className="text-2xl font-display font-bold">New Orders</p>
                            <p className="text-sm text-muted-foreground">Ready for slot assignment</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-warning" />
                        <div>
                            <p className="text-2xl font-display font-bold">Slots Sent</p>
                            <p className="text-sm text-muted-foreground">Awaiting recipient response</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-success" />
                        <div>
                            <p className="text-2xl font-display font-bold">AI Powered</p>
                            <p className="text-sm text-muted-foreground">Smart slot recommendations</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Orders Table */}
            <OrdersTable />
        </div>
    );
};

export default OrdersReceived;