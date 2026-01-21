import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/delivery_user/Header";
import { ParcelSummaryCard } from "../components/delivery_user/ParcelSummaryCard";
import { DateSlotSelector } from "../components/delivery_user/DateSlotSelector";
import { DelayAlert } from "../components/delivery_user/DelayAlert";
import { OutForDeliveryBanner } from "../components/delivery_user/OutForDeliveryBanner";
import { RescheduleModal } from "../components/delivery_user/RescheduleModal";
import { Footer } from "../components/delivery_user/Footer";
import { Button } from "../components/ui/Button";

import { CheckCircle2, Loader2, CalendarClock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

    // ---------------------------
    // 1️⃣ Fetch Order from Backend
    // ---------------------------
    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/api/orders/track/${orderId}`
                );
                setOrder(res.data.order);
            } catch (err) {
                console.error("Failed to load order", err);
                toast({ title: "Error", description: "Invalid tracking link" });
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    }, [orderId]);

    // ---------------------------
    // 2️⃣ Convert backend slot → UI slot
    // ---------------------------
    const mappedSlots =
        order?.systemRecommendedSlots?.map((slot) => ({
            id: slot._id,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,

            // Backend → UI conversion
            isAvailable: true, // default because backend doesn’t send availability
            isAiRecommended: slot.tag === "AI Recommended" || slot.confidenceScore > 85,

            tag: slot.tag,
            confidenceScore: slot.confidenceScore,
        })) || [];


    // ---------------------------
    // 3️⃣ Confirm Slot API
    // ---------------------------
    const handleConfirmSlot = async () => {
        if (!selectedSlot) return;

        setIsConfirming(true);
        try {
            await axios.post(
                `http://localhost:5001/api/orders/confirm-slot/${orderId}`,
                { slot: selectedSlot }
            );

            setOrder((prev) => ({
                ...prev,
                status: "slot_confirmed",
                selectedSlot,
            }));

            toast({
                title: "Slot Confirmed!",
                description: `${selectedSlot.startTime} – ${selectedSlot.endTime}`,
            });
        } catch (error) {
            toast({
                title: "Failed",
                description: "Could not confirm slot",
                variant: "destructive",
            });
        }
        setIsConfirming(false);
    };

    // ---------------------------
    // 4️⃣ Reschedule Slot API
    // ---------------------------
    const handleReschedule = async (slot) => {
        try {
            await axios.post(
                `http://localhost:5001/api/orders/reschedule/${orderId}`,
                { slot }
            );

            setOrder((prev) => ({
                ...prev,
                status: "rescheduled",
                selectedSlot: slot,
            }));

            toast({
                title: "Rescheduled!",
                description: `${slot.startTime} – ${slot.endTime}`,
            });
        } catch (error) {
            toast({
                title: "Failed",
                description: "Could not reschedule",
                variant: "destructive",
            });
        }

        setSelectedSlot(slot);
        setIsRescheduleOpen(false);
    };

    // ---------------------------
    // Loading / Missing Handling
    // ---------------------------
    if (loading)
        return <p className="text-center mt-10 text-muted-foreground">Loading...</p>;

    if (!order)
        return (
            <p className="text-center mt-10 text-red-500 text-lg">
                Order not found.
            </p>
        );

    // -------------------------------------------------------------------
    // UI Rendering
    // -------------------------------------------------------------------
    return (
        <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
            <Header parcelId={order.orderNumber} />

            <main className="flex-1 container max-w-3xl mx-auto px-4 py-6 space-y-6">
                <ParcelSummaryCard parcel={order} />

                {/* Delay Message */}
                <AnimatePresence mode="wait">
                    {order.status === "delayed" && order.agentMessage && (
                        <DelayAlert
                            key="delay"
                            agentMessage={order.agentMessage}
                            onReschedule={() => setIsRescheduleOpen(true)}
                        />
                    )}

                    {order.status === "out_for_delivery" && (
                        <OutForDeliveryBanner key="out-for-delivery" />
                    )}
                </AnimatePresence>

                {/* Slot Selector (ONLY when slots_sent OR rescheduled) */}
                {(order.status === "slots_sent" || order.status === "rescheduled") && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <DateSlotSelector
                            slots={mappedSlots}
                            selectedSlot={selectedSlot}
                            onSelectSlot={setSelectedSlot}
                        />
                    </motion.section>
                )}

                {/* Confirm button */}
                {(order.status === "slots_sent" || order.status === "rescheduled") &&
                    selectedSlot && (
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

                {/* After Confirmation */}
                {order.status === "slot_confirmed" && order.selectedSlot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border rounded-xl p-6 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-success" />
                        </div>

                        <h3 className="font-display font-semibold text-xl mb-2">
                            Delivery Scheduled
                        </h3>

                        <p className="text-muted-foreground mb-4">
                            {order.selectedSlot.date}: {order.selectedSlot.startTime} –{" "}
                            {order.selectedSlot.endTime}
                        </p>

                        <Button
                            variant="outline"
                            onClick={() => setIsRescheduleOpen(true)}
                            className="gap-2"
                        >
                            <CalendarClock className="w-4 h-4" />
                            Change Slot
                        </Button>
                    </motion.div>
                )}
            </main>

            <Footer />

            {/* Reschedule Modal */}
            <RescheduleModal
                isOpen={isRescheduleOpen}
                onClose={() => setIsRescheduleOpen(false)}
                slots={mappedSlots}
                onConfirm={handleReschedule}
                reason={order.agentMessage}
            />
        </div>
    );
};

export default Index;





// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Header } from "../components/delivery_user/Header";
// import { ParcelSummaryCard } from "../components/delivery_user/ParcelSummaryCard";
// import { DateSlotSelector } from "../components/delivery_user/DateSlotSelector";
// import { DelayAlert } from "../components/delivery_user/DelayAlert";
// import { OutForDeliveryBanner } from "../components/delivery_user/OutForDeliveryBanner";
// import { RescheduleModal } from "../components/delivery_user/RescheduleModal";
// import { Footer } from "../components/delivery_user/Footer";
// import { Button } from "../components/ui/Button";
// import { mockParcel, mockTimeSlots } from "../data/mockData_user";
// import { CheckCircle2, Loader2, CalendarClock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

// const Index = () => {
//     const [parcel, setParcel] = useState(mockParcel);
//     const [selectedSlot, setSelectedSlot] = useState(null);
//     const [isConfirming, setIsConfirming] = useState(false);
//     const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

//     const handleConfirmSlot = async () => {
//         if (!selectedSlot) return;

//         setIsConfirming(true);

//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         setParcel((prev) => ({
//             ...prev,
//             status: "scheduled",
//             selectedSlot,
//         }));

//         toast({
//             title: "Delivery Scheduled!",
//             description: `Your parcel will arrive on ${selectedSlot.startTime} – ${selectedSlot.endTime}`,
//         });

//         setIsConfirming(false);
//     };

//     const handleSimulateOutForDelivery = () => {
//         setParcel((prev) => ({ ...prev, status: "out-for-delivery" }));
//     };

//     const handleSimulateDelay = () => {
//         setParcel((prev) => ({
//             ...prev,
//             status: "delayed",
//             agentMessage: mockParcel.agentMessage,
//         }));
//     };

//     const handleReschedule = (slot) => {
//         setParcel((prev) => ({
//             ...prev,
//             status: "scheduled",
//             selectedSlot: slot,
//         }));
//         setSelectedSlot(slot);

//         toast({
//             title: "Delivery Rescheduled",
//             description: `New time: ${slot.startTime} – ${slot.endTime}`,
//         });
//     };

//     const handleResetDemo = () => {
//         setParcel(mockParcel);
//         setSelectedSlot(null);
//     };

//     return (
//         <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
//             <Header parcelId={parcel.parcelId} />

//             <main className="flex-1 container max-w-3xl mx-auto px-4 py-6 space-y-6">
//                 <ParcelSummaryCard parcel={parcel} />

//                 <AnimatePresence mode="wait">
//                     {parcel.status === "delayed" && parcel.agentMessage && (
//                         <DelayAlert
//                             key="delay"
//                             agentMessage={parcel.agentMessage}
//                             onReschedule={() => setIsRescheduleOpen(true)}
//                         />
//                     )}

//                     {parcel.status === "out-for-delivery" && (
//                         <OutForDeliveryBanner key="out-for-delivery" />
//                     )}
//                 </AnimatePresence>

//                 {parcel.status === "pending" && (
//                     <motion.section
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                     >
//                         <DateSlotSelector
//                             slots={mockTimeSlots}
//                             selectedSlot={selectedSlot}
//                             onSelectSlot={setSelectedSlot}
//                         />
//                     </motion.section>
//                 )}

//                 {parcel.status === "pending" && selectedSlot && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="sticky bottom-4 pt-4"
//                     >
//                         <Button
//                             size="lg"
//                             className="w-full h-14 text-lg font-display font-semibold shadow-lg"
//                             onClick={handleConfirmSlot}
//                             disabled={isConfirming}
//                         >
//                             {isConfirming ? (
//                                 <>
//                                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                                     Confirming...
//                                 </>
//                             ) : (
//                                 <>
//                                     <CheckCircle2 className="w-5 h-5 mr-2" />
//                                     Confirm Delivery Slot
//                                 </>
//                             )}
//                         </Button>
//                     </motion.div>
//                 )}

//                 {(parcel.status === "scheduled" ||
//                     parcel.status === "out-for-delivery") &&
//                     parcel.selectedSlot && (
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             className="bg-card border border-[hsl(var(--border))] rounded-xl p-6 text-center"
//                         >
//                             <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
//                                 <CheckCircle2 className="w-8 h-8 text-success" />
//                             </div>

//                             <h3 className="font-display font-semibold text-xl mb-2">
//                                 Delivery Confirmed
//                             </h3>

//                             <p className="text-muted-foreground mb-4">
//                                 {parcel.selectedSlot.startTime} –{" "}
//                                 {parcel.selectedSlot.endTime}
//                             </p>

//                             <Button
//                                 variant="outline"
//                                 onClick={() => setIsRescheduleOpen(true)}
//                                 className="gap-2"
//                             >
//                                 <CalendarClock className="w-4 h-4" />
//                                 Change Date & Time
//                             </Button>
//                         </motion.div>
//                     )}

//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                     className="bg-muted/50 rounded-xl p-4 border border-dashed border-[hsl(var(--border))]"
//                 >
//                     <p className="text-xs text-muted-foreground text-center mb-3">
//                         Demo Controls (for testing different states)
//                     </p>

//                     <div className="flex flex-wrap justify-center gap-2">
//                         <Button variant="outline" size="sm" onClick={handleResetDemo}>
//                             Reset to Pending
//                         </Button>

//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={handleSimulateOutForDelivery}
//                             disabled={parcel.status !== "scheduled"}
//                         >
//                             Simulate Out for Delivery
//                         </Button>

//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={handleSimulateDelay}
//                             disabled={parcel.status === "pending"}
//                         >
//                             Simulate Delay
//                         </Button>
//                     </div>
//                 </motion.div>
//             </main>

//             <Footer />

//             <RescheduleModal
//                 isOpen={isRescheduleOpen}
//                 onClose={() => setIsRescheduleOpen(false)}
//                 slots={mockTimeSlots}
//                 onConfirm={handleReschedule}
//                 reason={parcel.agentMessage}
//             />
//         </div>
//     );
// };

// export default Index;
