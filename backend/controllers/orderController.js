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

const Order = require("../models/orderSchema");               // ✅ Order model
const Recipient = require("../models/recipientSchema");       // ✅ Recipient model
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

const getNewAndAwaitingSlotOrders = async (req, res) => {
  console.log("📦 Fetching orders with status: new or awaiting_slot");

  try {
    const orders = await Order.find({
      status: { $in: ["new", "awaiting_slot", "slots_sent"] }
    })
      .populate("recipientId", "name email phone pincode")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 }); // latest first

    console.log(`✅ Found ${orders.length} orders`);

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.log(error);
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error
    });
  }
};

const getRescheduledOrders = async (req, res) => {
  try {
    console.log("📦 Fetching rescheduled orders...");

    const orders = await Order.find({ status: "rescheduled" })
      .populate("recipientId")
      .populate("createdBy")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Error fetching rescheduled orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rescheduled orders",
      error,
    });
  }
};

const sendRescheduleEmail = async (req, res) => {
  try {
    const { orderId } = req.params;

    console.log("📨 Sending reschedule email for order:", orderId);

    const order = await Order.findById(orderId).populate("recipientId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const recipient = order.recipientId;
    const email = recipient.email;

    // 🔗 Track / slot selection link
    const link = `http://localhost:5173/track/${order._id}`;

    // ✉️ DIFFERENT TEMPLATE (Reschedule-specific)
    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2 style="color:#d97706;">Delivery Rescheduled</h2>

        <p>Hello <strong>${recipient.name}</strong>,</p>

        <p>
          Your delivery for <strong>${order.product.name}</strong> could not be
          completed as scheduled.
        </p>

        <p>
          To ensure smooth delivery, please select a <strong>new convenient time slot</strong>.
        </p>

        <p style="margin:20px 0">
          <a href="${link}"
             style="padding:12px 20px;
                    background:#f59e0b;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;">
            Choose New Delivery Slot
          </a>
        </p>

        <p style="color:#555">
          If you have any questions, our delivery team is here to help.
        </p>

        <p>
          Thanks,<br/>
          <strong>Delivery Support Team</strong>
        </p>
      </div>
    `;

    await sendMail(
      email,
      "Action Required: Please Reschedule Your Delivery",
      html
    );

    // Optional timeline update
    order.timeline.push({
      status: "reschedule_email_sent",
      timestamp: new Date(),
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Reschedule email sent successfully",
    });

  } catch (error) {
    console.error("❌ Reschedule email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send reschedule email",
      error,
    });
  }
};

const getDeliveryStageOrders = async (req, res) => {
  try {
    console.log("📦 Fetching delivery stage orders...");

    const statuses = [
      "slot_confirmed",
      "pending_feasibility_check",
      "planned_for_delivery",
    ];

    // Fetch ALL 3 groups in parallel
    const [slotConfirmed, pendingFeasibility, planned] = await Promise.all([
      Order.find({ status: "slot_confirmed" })
        .populate("recipientId")
        .populate("createdBy")
        .populate("deliveryAgentId")
        .sort({ updatedAt: -1 }),

      Order.find({ status: "pending_feasibility_check" })
        .populate("recipientId")
        .populate("createdBy")
        .populate("deliveryAgentId")
        .sort({ updatedAt: -1 }),

      Order.find({ status: "planned_for_delivery" })
        .populate("recipientId")
        .populate("createdBy")
        .populate("deliveryAgentId")
        .sort({ updatedAt: -1 }),
    ]);

    res.status(200).json({
      success: true,
      total: slotConfirmed.length + pendingFeasibility.length + planned.length,

      slot_confirmed: {
        count: slotConfirmed.length,
        orders: slotConfirmed,
      },

      pending_feasibility_check: {
        count: pendingFeasibility.length,
        orders: pendingFeasibility,
      },

      planned_for_delivery: {
        count: planned.length,
        orders: planned,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching delivery stage orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders for stages",
      error,
    });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByRecipient,
  sendSlotSelectionEmail,
  getNewAndAwaitingSlotOrders,
  getRescheduledOrders,
  sendRescheduleEmail,
  getDeliveryStageOrders,
};
