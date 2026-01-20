// const Order = require("../models/Order");

// /* =========================
//    CREATE ORDER
// ========================= */
// const createOrder = async (req, res) => {
//   try {
//     const order = await Order.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =========================
//    GET ALL ORDERS
// ========================= */
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("recipientId", "name email pincode")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =========================
//    GET ORDERS BY RECIPIENT
// ========================= */
// const getOrdersByRecipient = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       recipientId: req.params.recipientId,
//     });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createOrder,
//   getAllOrders,
//   getOrdersByRecipient,
// };


// controllers/orderController.js

const Order = require("../models/Order");               // ✅ Order model
const Recipient = require("../models/Recipient");       // ✅ Recipient model
const sendMail = require("../utils/mail");               // ✅ Mail utility

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

/* =========================
   SEND SLOT SELECTION EMAIL
========================= */
const sendSlotSelectionEmail = async (req, res) => {
  console.log("📩 sendSlotSelectionEmail() called");

  try {
    const { orderId } = req.params;
    console.log("➡️ Received orderId:", orderId);

    // 1️⃣ Fetch order
    const order = await Order.findById(orderId);
    console.log("🔍 Fetched Order:", order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Fetch recipient
    console.log("➡️ Fetching recipient with ID:", order.recipientId);
    const recipient = await Recipient.findById(order.recipientId);
    console.log("👤 Recipient Data:", recipient);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // 3️⃣ Slot selection link
    const link = `http://localhost:5173/track/${order._id}`;
    console.log("🔗 Slot Selection Link:", link);

    // 4️⃣ Email HTML
    const html = `
      <h3>Your Delivery Slot is Needed</h3>
      <p>Hello ${recipient.name || "User"},</p>
      <p>
        Your parcel <b>${order.product.name}</b> is arriving soon.
        Please select a convenient delivery time slot.
      </p>
      <p>
        <a href="${link}"
           style="padding:10px 20px;background:#4CAF50;color:white;
           text-decoration:none;border-radius:5px;">
          Select Delivery Slot
        </a>
      </p>
      <p>Thank you!</p>
    `;

    // 5️⃣ Send email
    await sendMail(
      recipient.email,
      "Please Select Your Delivery Slot",
      html
    );

    console.log("✅ Email sent successfully");

    // 6️⃣ Update order status
    order.status = "slots_sent";
    order.timeline.push({
      status: "slots_sent",
      timestamp: new Date(),
    });

    await order.save();

    res.json({
      success: true,
      message: "Slot selection email sent successfully",
      orderId: order._id,
    });

  } catch (error) {
    console.error("❌ Error in sendSlotSelectionEmail:", error);
    res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByRecipient,
  sendSlotSelectionEmail,
};
