const Order = require("../models/Order");

/* =========================
   CREATE ORDER
========================= */
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL ORDERS
========================= */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("recipientId", "name email pincode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ORDERS BY RECIPIENT
========================= */
const getOrdersByRecipient = async (req, res) => {
  try {
    const orders = await Order.find({
      recipientId: req.params.recipientId,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByRecipient,
};
