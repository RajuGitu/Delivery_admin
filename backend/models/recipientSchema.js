const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema(
  {
    // ───────── BASIC DETAILS ─────────
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    // ───────── ANALYTICS ─────────
    recipientSuccessRate: {
      type: Number,
      default: 0,
    },

    localityPastRate: {
      type: Number,
      default: 0,
    },

    // ───────── ORDER REFERENCES ─────────
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        mostSelectedSlot: {
          date: { type: String, default: null },
          startTime: { type: String, default: null },
          endTime: { type: String, default: null },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipient", recipientSchema);
