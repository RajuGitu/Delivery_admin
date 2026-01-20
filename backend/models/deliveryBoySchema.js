// import mongoose from "mongoose";

// const deliveryBoySchema = new mongoose.Schema(
//     {
//         // ───────── BASIC INFO ─────────
//         name: {
//             type: String,
//             required: true,
//         },

//         email: {
//             type: String,
//             unique: true,
//             required: true,
//         },

//         phone: {
//             type: String,
//             required: true,
//         },

//         password: {
//             type: String,
//             required: true,
//         },

//         // ───────── DELIVERY BOY DETAILS ─────────
//         pincode: {
//             type: String,
//             required: true,   // e.g., "560066"
//         },

//         shiftTime: {
//             type: String,
//             default: null,  // example: "9 AM – 7 PM"
//         },

//         agentCurrentLoad: {
//             type: Number,
//             default: 0,  // active orders assigned for today
//         },

//         agentAvailable: {
//             type: Boolean,
//             default: true,  // true = free to assign
//         },

//         currentPlanId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "DeliveryPlan",
//             default: null,
//         },

//         // ───────── MONTHLY DELIVERY HISTORY ─────────
//         deliveryHistory: [
//             {
//                 month: {
//                     type: String,      // format: YYYY-MM
//                     required: true,
//                 },
//                 totalDeliveries: {
//                     type: Number,
//                     default: 0,
//                 },
//             },
//         ],

//         // ───────── ACCOUNT STATUS ─────────
//         accountStatus: {
//             type: String,
//             enum: ["active", "inactive"],
//             default: "active",
//         },
//     },

//     { timestamps: true }
// );

// export default mongoose.model("DeliveryBoy", deliveryBoySchema);


const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema(
  {
    // ───────── BASIC INFO ─────────
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ───────── DELIVERY BOY DETAILS ─────────
    pincode: {
      type: String,
      required: true,
    },

    shiftTime: {
      type: String,
      default: null,
    },

    agentCurrentLoad: {
      type: Number,
      default: 0,
    },

    agentAvailable: {
      type: Boolean,
      default: true,
    },

    currentPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPlan",
      default: null,
    },

    // ───────── MONTHLY DELIVERY HISTORY ─────────
    deliveryHistory: [
      {
        month: {
          type: String, // YYYY-MM
          required: true,
        },
        totalDeliveries: {
          type: Number,
          default: 0,
        },
      },
    ],

    // ───────── ACCOUNT STATUS ─────────
    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryBoy", deliveryBoySchema);
