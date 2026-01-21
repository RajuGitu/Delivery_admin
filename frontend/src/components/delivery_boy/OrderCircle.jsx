import { Clock, Check, Truck, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

const statusConfig = {
  pending: {
    bg: "bg-gray-100",
    border: "border-gray-400",
    icon: <Clock className="w-5 h-5 text-gray-500" />,
  },
  inprogress: {
    bg: "bg-blue-100",
    border: "border-blue-500",
    icon: <Truck className="w-5 h-5 text-blue-500" />,
  },
  delivered: {
    bg: "bg-green-100",
    border: "border-green-500",
    icon: <Check className="w-5 h-5 text-green-500" />,
  },
  issue: {
    bg: "bg-red-100",
    border: "border-red-500",
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
  },
  slotIssue: {
    bg: "bg-yellow-100",
    border: "border-yellow-500",
    icon: <Clock className="w-5 h-5 text-yellow-600" />,
  },
};

const OrderCircle = ({ order, index, onClick, isLast }) => {
  const config = statusConfig[order.status];

  return (
    <div className="flex items-center">
      <button
        onClick={() => onClick(order)}
        className={cn(
          "relative w-12 h-12 rounded-full flex items-center justify-center border-2",
          "transition-transform hover:scale-110 hover:shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
          config.bg,
          config.border
        )}
      >
        {config.icon}

        {/* Index badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
      </button>

      {/* Connector line */}
      {!isLast && <div className="w-6 h-0.5 bg-gray-300" />}
    </div>
  );
};

export default OrderCircle;
