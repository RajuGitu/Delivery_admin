import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

const tagIcons = {
  "Best Match": Sparkles,
  "High Success Rate": TrendingUp,
  "Low Traffic": Clock,
};

const tagColors = {
  "Best Match": "bg-primary/10 text-primary",
  "High Success Rate": "bg-success/10 text-success",
  "Low Traffic": "bg-scheduled/10 text-scheduled",
};

export function TimeSlotCard({
  slot,
  isSelected,
  onSelect,
  variant = "default",
}) {
  const TagIcon = slot.tag ? tagIcons[slot.tag] : null;
  const formattedDate = format(parseISO(slot.date), "EEE, MMM d");

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => slot.isAvailable && onSelect(slot)}
      disabled={!slot.isAvailable}
      className={cn(
        "w-full rounded-xl border-2 transition-all duration-200 text-left relative",
        variant === "recommended" ? "p-5" : "p-4",
        isSelected
          ? "border-primary bg-primary/5 card-shadow-selected"
          : slot.isAvailable
          ? "border-border bg-card hover:border-primary/50 hover:card-shadow-hover"
          : "border-border bg-muted/50 opacity-60 cursor-not-allowed"
      )}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </motion.div>
      )}

      <div className="space-y-2">
        <p
          className={cn(
            "font-display font-semibold",
            variant === "recommended" ? "text-lg" : "text-base"
          )}
        >
          {formattedDate}
        </p>

        <p className="text-primary font-medium">
          {slot.startTime} – {slot.endTime}
        </p>

        {slot.tag && TagIcon && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-2",
              tagColors[slot.tag]
            )}
          >
            <TagIcon className="w-3.5 h-3.5" />
            {slot.tag}
          </span>
        )}

        {slot.successRate && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Success Rate</span>
              <span className="font-medium text-foreground">
                {slot.successRate}%
              </span>
            </div>

            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${slot.successRate}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-success rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );
}
