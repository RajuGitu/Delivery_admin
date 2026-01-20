const express = require("express");
const {
  createRecipient,
  getAllRecipients,
  getRecipientById,
} = require("../controllers/recipientController");

const router = express.Router();

/* ROUTES */
router.post("/", createRecipient);    // POST
router.get("/", getAllRecipients);    // GET all
router.get("/:id", getRecipientById); // GET by id

module.exports = router;
