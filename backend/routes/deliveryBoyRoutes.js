// import express from "express";
// import { createDeliveryBoy } from "../controllers/deliveryBoyController.js";
// // import { protect, adminOnly } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/create",  createDeliveryBoy);

// export default router;


const express = require("express");
const {
  createDeliveryBoy,
  getAllDeliveryBoys,
} = require("../controllers/deliveryBoyController");

const router = express.Router();

/* ROUTES */
router.post("/create", createDeliveryBoy);
router.get("/", getAllDeliveryBoys);

module.exports = router;

