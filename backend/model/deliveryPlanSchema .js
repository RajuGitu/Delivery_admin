import mongoose from "mongoose";

const deliveryPlanSchema = new mongoose.Schema(
    {

        // ───────── BASIC PLAN INFO ─────────
        deliveryBoyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryBoy",
            required: true,
        },

        date: {
            type: String, // format: YYYY-MM-DD
            required: true,
        },

        // Aggregated counts for UI header
        stats: {
            total: { type: Number, default: 0 },
            delivered: { type: Number, default: 0 },
            issues: { type: Number, default: 0 },
        },

        // ───────── TIME-GROUPED SLOTS ─────────
        slots: [
            {
                slotId: {
                    type: mongoose.Schema.Types.ObjectId,
                    auto: true, // auto-generate slot IDs for internal reference
                },

                startTime: { type: String, required: true }, // "09:00"
                endTime: { type: String, required: true },   // "11:00"

                // Orders assigned in this slot
                deliveries: [
                    {
                        orderId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Order",
                            required: true,
                        },

                        recipientName: { type: String, required: true },
                        address: { type: String, required: true },

                        status: {
                            type: String,
                            enum: [
                                "pending",
                                "in_progress",
                                "delivered",
                                "issue",
                                "slot_issue"
                            ],
                            default: "pending",
                        },

                        issueReason: { type: String, default: null }, // optional
                        deliveredAt: { type: Date, default: null },
                    }
                ],

                // Slot-wide issue (affects all orders)
                slotIssue: {
                    hasIssue: { type: Boolean, default: false },
                    reason: { type: String, default: null },
                    affectedOrders: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Order"
                        }
                    ],
                }
            }
        ],

        // ───────── EMERGENCY REPORT ─────────
        emergencyReport: {
            hasEmergency: { type: Boolean, default: false },
            reason: {
                type: String,
                enum: [
                    "vehicle_breakdown",
                    "medical_emergency",
                    "accident",
                    "phone_lost_dead"
                ],
                default: null,
            },
            reportedAt: { type: Date, default: null }
        },

        // ───────── PLAN STATUS ─────────
        planStatus: {
            type: String,
            enum: ["not_started", "in_progress", "paused", "completed"],
            default: "not_started",
        },

    },

    { timestamps: true }
);

export default mongoose.model("DeliveryPlan", deliveryPlanSchema);