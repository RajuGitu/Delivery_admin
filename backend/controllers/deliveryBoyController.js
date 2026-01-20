// import DeliveryBoy from "../models/deliveryBoySchema.js";

// export const createDeliveryBoy = async (req, res) => {
//     try {
//         const { name, email, phone, password, pincode, shiftTime } = req.body;

//         if (!name || !email || !phone || !password || !pincode) {
//             return res.status(400).json({ message: "Please fill all fields" });
//         }

//         const exists = await DeliveryBoy.findOne({ email });
//         if (exists) {
//             return res.status(409).json({ message: "Email already exists" });
//         }

//         const deliveryBoy = await DeliveryBoy.create({
//             name,
//             email,
//             phone,
//             password,   // 🚨 PLAIN PASSWORD (as you requested)
//             pincode,
//             shiftTime,
//         });

//         return res.status(201).json({
//             message: "Delivery boy created successfully",
//             deliveryBoy
//         });

//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// };


const DeliveryBoy = require("../models/deliveryBoySchema");

const createDeliveryBoy = async (req, res) => {
  try {
    const { name, email, phone, password, pincode, shiftTime } = req.body;

    if (!name || !email || !phone || !password || !pincode) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const exists = await DeliveryBoy.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const deliveryBoy = await DeliveryBoy.create({
      name,
      email,
      phone,
      password, // 🚨 plain password (as requested)
      pincode,
      shiftTime,
    });

    return res.status(201).json({
      message: "Delivery boy created successfully",
      deliveryBoy,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDeliveryBoy,
};
