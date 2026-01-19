import { motion } from "framer-motion";
import { RescheduledTable } from "@/components/orders/RescheduledTable";
import { RefreshCw, AlertTriangle, Bell, Clock } from "lucide-react";

const Rescheduled = () => {
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
                        <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 text-warning" />
                        </div>
                        Rescheduled Orders
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Handle failed deliveries and reschedule requests
                    </p>
                </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="p-5 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-warning" />
                        <div>
                            <p className="text-2xl font-display font-bold">Needs Action</p>
                            <p className="text-sm text-muted-foreground">Orders requiring attention</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <Bell className="w-8 h-8 text-primary" />
                        <div>
                            <p className="text-xl font-display font-bold">Auto Notifications</p>
                            <p className="text-sm text-muted-foreground">Smart reschedule alerts</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-accent" />
                        <div>
                            <p className="text-xl font-display font-bold">New Slots Ready</p>
                            <p className="text-sm text-muted-foreground">AI-suggested alternatives</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Rescheduled Table */}
            <RescheduledTable />
        </div>
    );
};

export default Rescheduled;
