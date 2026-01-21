import {
  Clock,
  CheckCircle2,
  Truck,
  AlertTriangle,
  Package,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  new: {
    label: "New",
    icon: Clock,
    className: "bg-muted text-muted-foreground border-muted",
  },

  awaiting_slot: {
    label: "Awaiting Slot",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/20",
  },

  slots_sent: {
    label: "Slots Sent",
    icon: Clock,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },

  slot_confirmed: {
    label: "Slot Confirmed",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/20",
  },

  pending_feasibility_check: {
    label: "Feasibility Check",
    icon: AlertTriangle,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },

  planned_for_delivery: {
    label: "Planned",
    icon: Package,
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },

  out_for_delivery: {
    label: "Out for Delivery",
    icon: Truck,
    className: "bg-success/10 text-success border-success/20",
  },

  rescheduled: {
    label: "Rescheduled",
    icon: RefreshCw,
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },

  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200",
  },
};

export function StatusBadge({ status }) {
  const config =
    statusConfig[status] || {
      label: "Unknown",
      icon: AlertTriangle,
      className: "bg-gray-200 text-gray-700 border-gray-300",
    };

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
