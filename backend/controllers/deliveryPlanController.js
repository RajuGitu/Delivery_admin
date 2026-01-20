const DeliveryPlan = require("../models/deliveryPlanSchema");
const DeliveryBoy = require("../models/deliveryBoySchema");
const Order = require("../models/orderSchema");
const Recipient = require("../models/recipientSchema");

/* ==============================
   CREATE DELIVERY PLANS (DAILY)
================================ */
const createDeliveryPlansForDate = async (req, res) => {
  try {
    const { date } = req.body; // YYYY-MM-DD
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // 1️⃣ Fetch eligible orders
    const orders = await Order.find({
      status: "slot_confirmed",
      "selectedSlot.startTime": { $ne: null },
    })
      .populate("recipientId", "name address pincode")
      .sort({ "selectedSlot.startTime": 1 });

    if (!orders.length) {
      return res.status(200).json({ message: "No eligible orders found" });
    }

    // 2️⃣ Group orders by PINCODE
    const ordersByPincode = {};
    orders.forEach((order) => {
      if (!ordersByPincode[order.pincode]) {
        ordersByPincode[order.pincode] = [];
      }
      ordersByPincode[order.pincode].push(order);
    });

    const createdPlans = [];

    // 3️⃣ Process each pincode separately
    for (const pincode in ordersByPincode) {
      let remainingOrders = [...ordersByPincode[pincode]];

      const deliveryBoys = await DeliveryBoy.find({
        pincode,
        accountStatus: "active",
        agentAvailable: true,
        currentPlanId: null,
      }).sort({ agentCurrentLoad: 1 });

      if (!deliveryBoys.length) continue;

      let agentIndex = 0;

      while (remainingOrders.length && agentIndex < deliveryBoys.length) {
        const agent = deliveryBoys[agentIndex];

        const plan = await DeliveryPlan.create({
          deliveryBoyId: agent._id,
          date,
          slots: [],
        });

        const slotMap = {};

        // 4️⃣ Build slot-wise buckets (max 6 per slot)
        for (const order of remainingOrders) {
          const slotKey = `${order.selectedSlot.startTime}-${order.selectedSlot.endTime}`;

          if (!slotMap[slotKey]) slotMap[slotKey] = [];

          if (slotMap[slotKey].length < 6) {
            slotMap[slotKey].push(order);
          }
        }

        // 5️⃣ Fill plan slots
        for (const key in slotMap) {
          const [startTime, endTime] = key.split("-");

          plan.slots.push({
            startTime,
            endTime,
            deliveries: slotMap[key].map((order) => ({
              orderId: order._id,
              recipientName: order.recipientId.name,
              address: order.recipientId.address,
            })),
          });
        }

        // 6️⃣ Stats
        plan.stats.total = plan.slots.reduce(
          (sum, s) => sum + s.deliveries.length,
          0
        );

        await plan.save();

        // 7️⃣ Update delivery boy
        agent.currentPlanId = plan._id;
        agent.agentCurrentLoad += plan.stats.total;
        await agent.save();

        // 8️⃣ Remove assigned orders
        remainingOrders.splice(0, plan.stats.total);

        createdPlans.push(plan);
        agentIndex++;
      }
    }

    res.status(201).json({
      success: true,
      plansCreated: createdPlans.length,
      plans: createdPlans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ==============================
   GET PLAN BY DELIVERY BOY
================================ */
const getPlanByDeliveryBoy = async (req, res) => {
  try {
    const { deliveryBoyId } = req.params;

    const plan = await DeliveryPlan.findOne({ deliveryBoyId })
      .populate("deliveryBoyId", "name phone pincode")
      .populate("slots.deliveries.orderId");

    if (!plan) {
      return res.status(404).json({ message: "No plan found for this agent" });
    }

    res.status(200).json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDeliveryPlansForDate,
  getPlanByDeliveryBoy,
};
