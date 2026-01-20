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

const {
  getNewAndAwaitingSlotOrders
} = require("../controllers/orderController");

const {
  getRescheduledOrders,
} = require("../controllers/orderController");

const { sendRescheduleEmail } = require("../controllers/orderController");

const { getDeliveryStageOrders } = require("../controllers/orderController");
// ✅ Generic status-based route

const router = express.Router();

// 🔁 RESCHEDULE ORDER

router.get("/delivery-stages", getDeliveryStageOrders);
router.post("/send-reschedule-email/:orderId", sendRescheduleEmail);

router.get("/allreshedule", getRescheduledOrders);
/* =========================
ORDER ROUTES
========================= */
router.get("/pending-slot-orders", getNewAndAwaitingSlotOrders);

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get orders by recipient
router.get("/recipient/:recipientId", getOrdersByRecipient);

// Send slot selection email
router.post("/send-slot-email/:orderId", sendSlotSelectionEmail);

module.exports = router;

