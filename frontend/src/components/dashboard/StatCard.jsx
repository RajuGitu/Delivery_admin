import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-card border-border",
  primary: "gradient-primary text-primary-foreground border-transparent",
  success: "gradient-success text-success-foreground border-transparent",
  warning: "bg-warning/10 border-warning/20",
  accent: "gradient-accent text-accent-foreground border-transparent",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-warning/20 text-warning",
  accent: "bg-accent-foreground/20 text-accent-foreground",
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "p-6 rounded-2xl border shadow-md transition-all duration-200",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={cn(
              "text-sm font-medium mb-2",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {title}
          </p>

          <p className="text-3xl font-display font-bold">{value}</p>

          {trend && (
            <p
              className={cn(
                "text-sm mt-2 flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}% from yesterday</span>
            </p>
          )}
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconVariantStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
