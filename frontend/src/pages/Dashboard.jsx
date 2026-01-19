import { motion } from "framer-motion";
import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    RefreshCw,
    Users,
    Target,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { DeliveryBoyStatus } from "@/components/dashboard/DeliveryBoyStatus";
import { dashboardStats } from "@/data/mockData";
import warehouseHero from "@/assets/warehouse-hero.jpg";

const Dashboard = () => {
    return (
        <div className="space-y-6">
            {/* Hero Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-48 rounded-2xl overflow-hidden"
            >
                <img
                    src={warehouseHero}
                    alt="Warehouse"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 gradient-dark opacity-70" />
                <div className="absolute inset-0 flex items-center justify-between px-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-display font-bold text-primary-foreground"
                        >
                            Welcome back, Admin! 👋
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-primary-foreground/80 mt-2"
                        >
                            Here's what's happening with your deliveries today
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="hidden lg:flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4"
                    >
                        <div className="text-center">
                            <p className="text-3xl font-display font-bold text-primary-foreground">
                                {dashboardStats.firstAttemptSuccess}%
                            </p>
                            <p className="text-xs text-primary-foreground/70">Success Rate</p>
                        </div>
                        <div className="w-px h-12 bg-primary-foreground/20" />
                        <div className="text-center">
                            <p className="text-3xl font-display font-bold text-primary-foreground">
                                {dashboardStats.totalOrdersToday}
                            </p>
                            <p className="text-xs text-primary-foreground/70">Orders Today</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Orders Today"
                    value={dashboardStats.totalOrdersToday}
                    icon={Package}
                    trend={{ value: 12, isPositive: true }}
                    delay={0}
                />
                <StatCard
                    title="Awaiting Slot Selection"
                    value={dashboardStats.awaitingSlotSelection}
                    icon={Clock}
                    variant="warning"
                    delay={0.1}
                />
                <StatCard
                    title="Confirmed Slots"
                    value={dashboardStats.confirmedSlots}
                    icon={CheckCircle2}
                    variant="success"
                    delay={0.2}
                />
                <StatCard
                    title="Out for Delivery"
                    value={dashboardStats.outForDelivery}
                    icon={Truck}
                    variant="primary"
                    delay={0.3}
                />
            </div>

            {/* Second Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Rescheduled/Pending"
                    value={dashboardStats.rescheduledPending}
                    icon={RefreshCw}
                    trend={{ value: 8, isPositive: false }}
                    delay={0.4}
                />
                <StatCard
                    title="Active Delivery Agents"
                    value={dashboardStats.activeDeliveryBoys}
                    icon={Users}
                    variant="accent"
                    delay={0.5}
                />
                <StatCard
                    title="First-Attempt Success"
                    value={`${dashboardStats.firstAttemptSuccess}%`}
                    icon={Target}
                    trend={{ value: 2.3, isPositive: true }}
                    delay={0.6}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <RecentOrders />
                </div>
                <div className="space-y-6">
                    <QuickActions />
                    <DeliveryBoyStatus />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
