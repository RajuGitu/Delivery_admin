import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/delivery_user/Header";
import { ParcelSummaryCard } from "../components/delivery_user/ParcelSummaryCard";
import { DateSlotSelector } from "../components/delivery_user/DateSlotSelector";
import { DelayAlert } from "../components/delivery_user/DelayAlert";
import { OutForDeliveryBanner } from "../components/delivery_user/OutForDeliveryBanner";
import { RescheduleModal } from "../components/delivery_user/RescheduleModal";
import { Footer } from "../components/delivery_user/Footer";
import { Button } from "../components/ui/Button";
import { mockParcel, mockTimeSlots } from "../data/mockData_user";
import { CheckCircle2, Loader2, CalendarClock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
    const [parcel, setParcel] = useState(mockParcel);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

    const handleConfirmSlot = async () => {
        if (!selectedSlot) return;

        setIsConfirming(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setParcel((prev) => ({
            ...prev,
            status: "scheduled",
            selectedSlot,
        }));

        toast({
            title: "Delivery Scheduled!",
            description: `Your parcel will arrive on ${selectedSlot.startTime} – ${selectedSlot.endTime}`,
        });

        setIsConfirming(false);
    };

    const handleSimulateOutForDelivery = () => {
        setParcel((prev) => ({ ...prev, status: "out-for-delivery" }));
    };

    const handleSimulateDelay = () => {
        setParcel((prev) => ({
            ...prev,
            status: "delayed",
            agentMessage: mockParcel.agentMessage,
        }));
    };

    const handleReschedule = (slot) => {
        setParcel((prev) => ({
            ...prev,
            status: "scheduled",
            selectedSlot: slot,
        }));
        setSelectedSlot(slot);

        toast({
            title: "Delivery Rescheduled",
            description: `New time: ${slot.startTime} – ${slot.endTime}`,
        });
    };

    const handleResetDemo = () => {
        setParcel(mockParcel);
        setSelectedSlot(null);
    };

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
            <Header parcelId={parcel.parcelId} />

            <main className="flex-1 container max-w-3xl mx-auto px-4 py-6 space-y-6">
                <ParcelSummaryCard parcel={parcel} />

                <AnimatePresence mode="wait">
                    {parcel.status === "delayed" && parcel.agentMessage && (
                        <DelayAlert
                            key="delay"
                            agentMessage={parcel.agentMessage}
                            onReschedule={() => setIsRescheduleOpen(true)}
                        />
                    )}

                    {parcel.status === "out-for-delivery" && (
                        <OutForDeliveryBanner key="out-for-delivery" />
                    )}
                </AnimatePresence>

                {parcel.status === "pending" && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <DateSlotSelector
                            slots={mockTimeSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={setSelectedSlot}
                        />
                    </motion.section>
                )}

                {parcel.status === "pending" && selectedSlot && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky bottom-4 pt-4"
                    >
                        <Button
                            size="lg"
                            className="w-full h-14 text-lg font-display font-semibold shadow-lg"
                            onClick={handleConfirmSlot}
                            disabled={isConfirming}
                        >
                            {isConfirming ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Confirming...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Confirm Delivery Slot
                                </>
                            )}
                        </Button>
                    </motion.div>
                )}

                {(parcel.status === "scheduled" ||
                    parcel.status === "out-for-delivery") &&
                    parcel.selectedSlot && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border border-[hsl(var(--border))] rounded-xl p-6 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>

                            <h3 className="font-display font-semibold text-xl mb-2">
                                Delivery Confirmed
                            </h3>

                            <p className="text-muted-foreground mb-4">
                                {parcel.selectedSlot.startTime} –{" "}
                                {parcel.selectedSlot.endTime}
                            </p>

                            <Button
                                variant="outline"
                                onClick={() => setIsRescheduleOpen(true)}
                                className="gap-2"
                            >
                                <CalendarClock className="w-4 h-4" />
                                Change Date & Time
                            </Button>
                        </motion.div>
                    )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-muted/50 rounded-xl p-4 border border-dashed border-[hsl(var(--border))]"
                >
                    <p className="text-xs text-muted-foreground text-center mb-3">
                        Demo Controls (for testing different states)
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleResetDemo}>
                            Reset to Pending
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSimulateOutForDelivery}
                            disabled={parcel.status !== "scheduled"}
                        >
                            Simulate Out for Delivery
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSimulateDelay}
                            disabled={parcel.status === "pending"}
                        >
                            Simulate Delay
                        </Button>
                    </div>
                </motion.div>
            </main>

            <Footer />

            <RescheduleModal
                isOpen={isRescheduleOpen}
                onClose={() => setIsRescheduleOpen(false)}
                slots={mockTimeSlots}
                onConfirm={handleReschedule}
                reason={parcel.agentMessage}
            />
        </div>
    );
};

export default Index;
