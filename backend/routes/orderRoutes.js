// const express = require("express");
// const {
//   createOrder,
//   getAllOrders,
//   getOrdersByRecipient,
// } = require("../controllers/orderController");

// const router = express.Router();

// /* ROUTES */
// router.post("/", createOrder);
// router.get("/", getAllOrders);
// router.get("/recipient/:recipientId", getOrdersByRecipient);

// module.exports = router;


const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByRecipient,
  sendSlotSelectionEmail,
} = require("../controllers/orderController");

const router = express.Router();

/* =========================
   ORDER ROUTES
========================= */

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get orders by recipient
router.get("/recipient/:recipientId", getOrdersByRecipient);

// Send slot selection email
router.post("/send-slot-email/:orderId", sendSlotSelectionEmail);

module.exports = router;

