import express from "express";
import { createDeliveryBoy } from "../controllers/deliveryBoyController.js";
// import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create",  createDeliveryBoy);

export default router;
