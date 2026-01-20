import { Clock, CheckCircle2, Truck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    label: "Pending Confirmation",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  scheduled: {
    label: "Scheduled",
    icon: CheckCircle2,
    className: "bg-scheduled/10 text-scheduled border-scheduled/20",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    icon: Truck,
    className: "bg-success/10 text-success border-success/20",
  },
  delayed: {
    label: "Delayed",
    icon: AlertTriangle,
    className: "bg-delay/10 text-delay border-delay/20",
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border",
        config.className
      )}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
}
