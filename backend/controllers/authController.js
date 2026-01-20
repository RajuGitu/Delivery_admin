import jwt from "jsonwebtoken";
import DeliveryBoy from "../models/deliveryBoySchema.js";

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    // ───────── ADMIN LOGIN (TEMP / STATIC) ─────────
    if (role === "admin") {
      // TEMP admin (you can move to DB later)
      if (email !== "admin@test.com" || password !== "admin123") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: "admin-id-001", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // ───────── DELIVERY LOGIN (DATABASE) ─────────
    if (role === "delivery") {
      const deliveryBoy = await DeliveryBoy.findOne({ email });

      if (!deliveryBoy) {
        return res.status(404).json({ message: "Delivery partner not found" });
      }

      // Plain password comparison (as requested)
      if (password !== deliveryBoy.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (deliveryBoy.accountStatus !== "active") {
        return res.status(403).json({ message: "Account is inactive" });
      }

      const token = jwt.sign(
        { userId: deliveryBoy._id, role: "delivery" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Delivery login successful",
        token,
        role: "delivery",
        deliveryBoy,
      });
    }

    return res.status(400).json({ message: "Invalid role" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
