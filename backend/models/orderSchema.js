// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//     {
//         orderNumber: {
//             type: String,
//             required: true,
//             unique: true,
//         },

//         createdBy: {
//             type: mongoose.Schema.Types.ObjectId, // admin_sender
//             ref: "User",
//             required: false,
//         },

//         recipientId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },

//         product: {
//             name: { type: String, required: true },
//             category: { type: String, required: true },
//         },

//         deliveryAddress: {
//             type: String,
//             required: true,
//         },

//         pincode: {
//             type: String,
//             required: true,
//         },

//         assignedArea: {
//             type: String,
//             required: false,
//         },

//         systemRecommendedSlots: [
//             {
//                 date: { type: String, required: true },
//                 startTime: { type: String, required: true },
//                 endTime: { type: String, required: true },
//                 confidenceScore: { type: Number, required: true },
//                 tag: { type: String },
//             },
//         ],

//         selectedSlot: {
//             date: { type: String, default: null },
//             startTime: { type: String, default: null },
//             endTime: { type: String, default: null },
//         },

//         deliveryAgentId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             default: null,
//         },

//         otp: {
//             type: Number, // ONLY THE OTP NUMBER (e.g., 483927)
//             default: null,
//         },

//         status: {
//             type: String,
//             enum: [
//                 "new",
//                 "awaiting_slot",
//                 "slots_sent",
//                 "slot_confirmed",
//                 "pending_feasibility_check",
//                 "planned_for_delivery",
//                 "out_for_delivery",
//                 "delivered",
//                 "rescheduled",
//             ],
//             default: "new",
//         },

//         timeline: [
//             {
//                 status: { type: String },
//                 timestamp: { type: Date, default: Date.now },
//             },
//         ],
//     },

//     { timestamps: true } // auto adds createdAt & updatedAt
// );

// export default mongoose.model("Order", orderSchema);


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true,
    },

    product: {
      name: { type: String, required: true },
      category: { type: String, required: true },
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    assignedArea: {
      type: String,
      required: false,
    },

    systemRecommendedSlots: [
      {
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        confidenceScore: { type: Number, required: true },
        tag: { type: String },
      },
    ],

    selectedSlot: {
      date: { type: String, default: null },
      startTime: { type: String, default: null },
      endTime: { type: String, default: null },
    },

    deliveryAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryBoy",
      default: null,
    },

    otp: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "new",
        "awaiting_slot",
        "slots_sent",
        "slot_confirmed",
        "pending_feasibility_check",
        "planned_for_delivery",
        "out_for_delivery",
        "delivered",
        "rescheduled",
      ],
      default: "new",
    },

    timeline: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
