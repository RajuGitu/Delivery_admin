import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateSlotSelector } from "./DateSlotSelector";
import { useState, useEffect } from "react";

export function RescheduleModal({
  isOpen,
  onClose,
  slots,
  onConfirm,
  reason,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSlot(null);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedSlot) {
      onConfirm(selectedSlot);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Reschedule Delivery Time
          </DialogTitle>
        </DialogHeader>

        {reason && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-sm text-muted-foreground">{reason}</p>
          </div>
        )}

        <DateSlotSelector
          slots={slots}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          showWarning={true}
        />

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className="flex-1"
          >
            Confirm New Slot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
