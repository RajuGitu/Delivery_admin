import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimeSlotCard } from "./TimeSlotCard";
import { format, addDays, isSameDay } from "date-fns";
import { CalendarDays, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DateSlotSelector({
  slots,
  selectedSlot,
  onSelectSlot,
  showWarning = false,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate next 7 days
  const next7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => addDays(today, i + 1));
  }, []);

  // Check which dates have available slots
  const dateAvailability = useMemo(() => {
    const availability = {};
    next7Days.forEach((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const dateSlots = slots.filter((s) => s.date === dateStr);
      const availableSlots = dateSlots.filter((s) => s.isAvailable);
      availability[dateStr] = {
        hasSlots: availableSlots.length > 0,
        hasAiRecommended: availableSlots.some((s) => s.isAiRecommended),
      };
    });
    return availability;
  }, [slots, next7Days]);

  // Get slots for selected date
  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return slots.filter((s) => s.date === dateStr);
  }, [slots, selectedDate]);

  const aiSlotsForDate = slotsForSelectedDate.filter(
    (s) => s.isAiRecommended && s.isAvailable
  );
  const otherSlotsForDate = slotsForSelectedDate.filter(
    (s) => !s.isAiRecommended
  );

  return (
    <div className="space-y-6">
      {/* Date Picker Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">
              Select a Delivery Date
            </h3>
            <p className="text-sm text-muted-foreground">
              Available for the next 7 days
            </p>
          </div>
        </div>

        {/* Horizontal Date Picker */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {next7Days.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const availability = dateAvailability[dateStr];
            const isSelected =
              selectedDate && isSameDay(date, selectedDate);
            const hasSlots = availability?.hasSlots;
            const hasAiRecommended = availability?.hasAiRecommended;

            return (
              <motion.button
                key={dateStr}
                whileHover={{ scale: hasSlots ? 1.05 : 1 }}
                whileTap={{ scale: hasSlots ? 0.95 : 1 }}
                onClick={() => hasSlots && setSelectedDate(date)}
                disabled={!hasSlots}
                className={cn(
                  "flex-shrink-0 w-[72px] py-3 px-2 rounded-xl border-2 transition-all duration-200 text-center relative",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : hasSlots
                    ? "border-border bg-card hover:border-primary/50"
                    : "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                )}
              >
                {hasAiRecommended && !isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </span>
                )}

                <p className="text-xs text-muted-foreground font-medium">
                  {format(date, "EEE")}
                </p>
                <p
                  className={cn(
                    "text-lg font-display font-bold",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {format(date, "d")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(date, "MMM")}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots for Selected Date */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={format(selectedDate, "yyyy-MM-dd")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h4 className="font-display font-semibold text-base flex items-center gap-2">
              ⏰ Time Slots for{" "}
              {format(selectedDate, "EEEE, MMM d")}
            </h4>

            {slotsForSelectedDate.filter((s) => s.isAvailable).length ===
            0 ? (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No slots available for this date. Please choose another
                  date.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* AI Recommended Slots */}
                {aiSlotsForDate.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      AI Recommended
                    </p>
                    <div className="grid gap-3">
                      {aiSlotsForDate.map((slot) => (
                        <TimeSlotCard
                          key={slot.id}
                          slot={slot}
                          isSelected={selectedSlot?.id === slot.id}
                          onSelect={onSelectSlot}
                          variant="recommended"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Slots */}
                {otherSlotsForDate.length > 0 && (
                  <div className="space-y-3">
                    {aiSlotsForDate.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Other Available
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {otherSlotsForDate.map((slot) => (
                        <TimeSlotCard
                          key={slot.id}
                          slot={slot}
                          isSelected={selectedSlot?.id === slot.id}
                          onSelect={onSelectSlot}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No date selected prompt */}
      {!selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center p-8 bg-muted/30 rounded-xl border border-dashed border-border"
        >
          <p className="text-sm text-muted-foreground text-center">
            👆 Select a date above to view available time slots
          </p>
        </motion.div>
      )}

      {/* Warning for reschedule */}
      {showWarning && (
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            Changing the slot may delay delivery by up to 24 hours
          </span>
        </div>
      )}
    </div>
  );
}
