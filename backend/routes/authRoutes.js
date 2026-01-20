// import express from "express";
// import { login } from "../controllers/authController";
// const { protect, adminOnly, deliveryOnly } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // Login
// router.post("/login", login);

// // Protected test routes
// router.get("/admin", protect, adminOnly, (req, res) => {
//   res.json({ message: "Welcome Admin Dashboard" });
// });

// router.get("/delivery", protect, deliveryOnly, (req, res) => {
//   res.json({ message: "Welcome Delivery Dashboard" });
// });

// export default router;


const express = require("express");
const { login } = require("../controllers/authController");
const {
  protect,
  adminOnly,
  deliveryOnly,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Login
router.post("/login", login);

// Protected test routes
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

router.get("/delivery", protect, deliveryOnly, (req, res) => {
  res.json({ message: "Welcome Delivery Dashboard" });
});

module.exports = router;
