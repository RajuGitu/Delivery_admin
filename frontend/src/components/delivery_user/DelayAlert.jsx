import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DelayAlert({ agentMessage, onReschedule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-warning/10 border border-warning/30 rounded-xl p-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Delivery Agent is Facing a Delay
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your delivery may be delayed. Please select a new time slot.
            </p>
          </div>

          <div className="bg-card/80 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              Message from Delivery Agent
            </div>
            <p className="text-sm text-foreground">
              {agentMessage}
            </p>
          </div>

          <Button
            onClick={onReschedule}
            variant="default"
            className="w-full sm:w-auto"
          >
            Select New Time Slot
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
