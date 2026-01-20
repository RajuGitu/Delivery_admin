const dotenv = require("dotenv");
const connectDB = require("../db/db");
const Order = require("../models/orderSchema");

dotenv.config();
connectDB();

/* RECIPIENT IDS (FROM YOUR DB) */
const recipients = [
  "696f6d771535ac84e1f678e6", // Rahul
  "696f6d771535ac84e1f678e7", // Anjali
  "696f6d771535ac84e1f678e8", // Amit
  "696f6d771535ac84e1f678e9", // Sneha
];

/* ORDER STATUSES */
const statuses = [
  "new",
  "awaiting_slot",
  "slots_sent",
  "slot_confirmed",
  "planned_for_delivery",
  "out_for_delivery",
  "delivered",
  "rescheduled",
];

const generateOrders = () => {
  const orders = [];
  let orderCount = 1;

  recipients.forEach((recipientId) => {
    for (let i = 0; i < 5; i++) {
      const status = statuses[(orderCount - 1) % statuses.length];

      orders.push({
        orderNumber: `ORD-${1000 + orderCount}`,
        recipientId,
        product: {
          name: `Package ${orderCount}`,
          category: "Parcel",
        },
        deliveryAddress: "Auto generated address",
        pincode: orderCount % 2 === 0 ? "400075" : "400076",
        assignedArea: "Zone A",
        systemRecommendedSlots: [
          {
            date: "2026-01-21",
            startTime: "10:00",
            endTime: "12:00",
            confidenceScore: Math.floor(Math.random() * 20) + 80,
            tag: "AI Recommended",
          },
        ],
        selectedSlot:
          status === "slot_confirmed" || status === "delivered"
            ? {
                date: "2026-01-21",
                startTime: "10:00",
                endTime: "12:00",
              }
            : {},
        status,
        timeline: [
          {
            status,
            timestamp: new Date(),
          },
        ],
      });

      orderCount++;
    }
  });

  return orders;
};

const seedOrders = async () => {
  try {
    await Order.deleteMany();

    const orders = generateOrders();
    await Order.insertMany(orders);

    console.log(`✅ ${orders.length} ORDERS SEEDED SUCCESSFULLY`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Order seeding failed:", error);
    process.exit(1);
  }
};

seedOrders();
