import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ConfirmedSlotsTable } from "@/components/orders/ConfirmedSlotsTable";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import axios from "axios";

const ConfirmedSlots = () => {
    const [confirmedOrders, setConfirmedOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5001/api/orders/delivery-stages"
                );

                console.log("📦 Delivery Stage Data:", res.data);

                // Extract only confirmed slots
                setConfirmedOrders(res.data.slot_confirmed.orders);

            } catch (err) {
                console.error("❌ Failed to load confirmed orders:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-success-foreground" />
                        </div>
                        Confirmed Slots
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Track orders with confirmed delivery time slots and risk assessments
                    </p>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="p-5 rounded-xl gradient-success text-success-foreground">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8" />
                        <div>
                            <p className="text-3xl font-display font-bold">
                                {confirmedOrders.length}
                            </p>
                            <p className="text-sm opacity-80">Recipient verified slots</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-accent" />
                        <div>
                            <p className="text-xl font-display font-bold">Pre-dispatch Ready</p>
                            <p className="text-sm text-muted-foreground">Validated for delivery</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-warning" />
                        <div>
                            <p className="text-xl font-display font-bold">Risk Monitored</p>
                            <p className="text-sm text-muted-foreground">
                                AI-assessed delivery risk
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* TABLE */}
            {loading ? (
                <p className="text-center text-muted-foreground">
                    Loading confirmed slots...
                </p>
            ) : (
                <ConfirmedSlotsTable orders={confirmedOrders} />
            )}
        </div>
    );
};

export default ConfirmedSlots;
