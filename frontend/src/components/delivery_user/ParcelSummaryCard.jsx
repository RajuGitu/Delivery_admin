import { StatusBadge } from "./StatusBadge";
import { Package, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function ParcelSummaryCard({ parcel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-card rounded-xl p-6 card-shadow border border-border"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-4 h-4" />
            <span className="text-sm">{parcel.itemCategory}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span className="text-sm">
              From:{" "}
              <span className="text-foreground font-medium">
                {parcel.senderName}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{parcel.deliveryAddress}</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <StatusBadge status={parcel.status} />
        </div>
      </div>
    </motion.div>
  );
}
