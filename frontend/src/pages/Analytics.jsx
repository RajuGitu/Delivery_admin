import { motion } from "framer-motion";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { BarChart3, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Analytics = () => {
    const handleExport = () => {
        toast.success("Report exported successfully!", {
            description: "Analytics report has been downloaded as PDF",
        });
    };

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
                        <div className="w-12 h-12 rounded-xl gradient-dark flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-primary-foreground" />
                        </div>
                        Analytics & Reports
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Monitor delivery performance, success rates, and operational insights
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Last 7 Days
                    </Button>
                    <Button className="gradient-primary gap-2" onClick={handleExport}>
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>
            </motion.div>

            {/* Analytics Dashboard */}
            <AnalyticsDashboard />
        </div>
    );
};

export default Analytics;