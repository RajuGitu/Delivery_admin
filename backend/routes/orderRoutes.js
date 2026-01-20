const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByRecipient,
} = require("../controllers/orderController");

const router = express.Router();

/* ROUTES */
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/recipient/:recipientId", getOrdersByRecipient);

module.exports = router;
