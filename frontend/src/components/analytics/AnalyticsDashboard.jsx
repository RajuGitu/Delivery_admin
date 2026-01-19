import { motion } from "framer-motion";
import { analyticsData } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, Target, Clock, MapPin, Users } from "lucide-react";

const COLORS = ["hsl(25, 95%, 53%)", "hsl(199, 89%, 48%)", "hsl(142, 76%, 36%)", "hsl(38, 92%, 50%)"];

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl gradient-primary text-primary-foreground"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">First-Attempt Success</p>
              <p className="text-4xl font-display font-bold mt-1">
                {analyticsData.firstAttemptSuccessRate}%
              </p>
              <p className="text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +2.3% from last week
              </p>
            </div>
            <Target className="w-12 h-12 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Slot Adherence</p>
              <p className="text-4xl font-display font-bold mt-1">
                {analyticsData.slotAdherence}%
              </p>
              <p className="text-sm mt-2 flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                +1.8% improvement
              </p>
            </div>
            <Clock className="w-12 h-12 text-muted-foreground/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Deliveries</p>
              <p className="text-4xl font-display font-bold mt-1">
                {analyticsData.totalDeliveriesToday}
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                {analyticsData.pendingDeliveries} pending
              </p>
            </div>
            <Users className="w-12 h-12 text-muted-foreground/50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rescheduled</p>
              <p className="text-4xl font-display font-bold mt-1">
                {analyticsData.rescheduledDeliveries}
              </p>
              <p className="text-sm mt-2 flex items-center gap-1 text-destructive">
                <TrendingDown className="w-4 h-4" />
                -12% from yesterday
              </p>
            </div>
            <MapPin className="w-12 h-12 text-muted-foreground/50" />
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="font-display font-bold text-lg mb-4">Weekly Delivery Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.weeklyTrend}>
              <defs>
                <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" stroke="hsl(220, 9%, 46%)" />
              <YAxis stroke="hsl(220, 9%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="deliveries"
                stroke="hsl(25, 95%, 53%)"
                fillOpacity={1}
                fill="url(#colorDeliveries)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="success"
                stroke="hsl(142, 76%, 36%)"
                fillOpacity={1}
                fill="url(#colorSuccess)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Slot Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="font-display font-bold text-lg mb-4">Slot-wise Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.slotPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="slot" stroke="hsl(220, 9%, 46%)" fontSize={12} />
              <YAxis stroke="hsl(220, 9%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="success" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-card border border-border lg:col-span-2"
        >
          <h3 className="font-display font-bold text-lg mb-4">Area-wise Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.areaPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(220, 9%, 46%)" />
              <YAxis dataKey="area" type="category" stroke="hsl(220, 9%, 46%)" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="successRate" fill="hsl(25, 95%, 53%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reschedule Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="font-display font-bold text-lg mb-4">Reschedule Reasons</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.rescheduleReasons}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {analyticsData.rescheduleReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {analyticsData.rescheduleReasons.map((reason, index) => (
              <div key={reason.reason} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate text-muted-foreground">{reason.reason}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
