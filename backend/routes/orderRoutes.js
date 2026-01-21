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
const { sendReminderEmail } = require("../controllers/orderController");
const {
  getOrderForTracking,
  confirmSlot,
  rescheduleSlot
} = require("../controllers/orderController");

// ✅ Generic status-based route

const router = express.Router();

// Public route - customer tracking page
router.get("/track/:orderId", getOrderForTracking);

// Customer selects slot
router.post("/confirm-slot/:orderId", confirmSlot);

// Customer reschedules slot
router.post("/reschedule/:orderId", rescheduleSlot);

// 🔁 RESCHEDULE ORDER
router.post("/send-reminder/:orderId", sendReminderEmail);

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

