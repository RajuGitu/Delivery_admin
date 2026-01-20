const express = require("express");
const {
  createDeliveryPlansForDate,
  getPlanByDeliveryBoy,
} = require("../controllers/deliveryPlanController");

const router = express.Router();

// Create plans (admin / scheduler)
router.post("/create", createDeliveryPlansForDate);

// View plan for delivery boy
router.get("/agent/:deliveryBoyId", getPlanByDeliveryBoy);

module.exports = router;


// const express = require("express");
// const {
//   createDeliveryPlansForDate,
//   getPlanByDeliveryBoy,
// } = require("../controllers/deliveryPlanController");

// const { protect, adminOnly } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // ADMIN creates plan
// router.post("/create", protect, adminOnly, createDeliveryPlansForDate);

// // View plan
// router.get("/agent/:deliveryBoyId", protect, getPlanByDeliveryBoy);

// module.exports = router;
