import { motion } from "framer-motion";
import { Truck } from "lucide-react";

export function OutForDeliveryBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-success/10 border border-success/30 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Truck className="w-5 h-5 text-success" />
          </motion.div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-foreground">
            Your Parcel is Out for Delivery
          </h3>
          <p className="text-sm text-muted-foreground">
            It will arrive within your selected time slot.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
