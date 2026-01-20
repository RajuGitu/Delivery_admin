import { Package } from "lucide-react";
import { motion } from "framer-motion";

export function Header({ parcelId }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">
                Parcel Delivery
              </h1>
              <p className="text-xs text-muted-foreground">
                Time Confirmation
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">Parcel ID</p>
            <p className="font-mono text-sm font-medium text-foreground">
              {parcelId}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
