
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const recipientRoutes = require("./routes/recipientRoutes");
const deliveryBoyRoutes = require("./routes/deliveryBoyRoutes");
const orderRoutes = require("./routes/orderRoutes");

// ENV
dotenv.config();

const app = express();

/* ===================== */
/* MIDDLEWARE */
/* ===================== */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ===================== */
/* ROUTES */
/* ===================== */
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/delivery-boys", deliveryBoyRoutes);
app.use("/api/orders", orderRoutes);

/* ===================== */
/* DATABASE */
/* ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ===================== */
/* SERVER */
/* ===================== */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
