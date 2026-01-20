const Recipient = require("../models/recipientSchema");

/* =========================
   CREATE RECIPIENT
========================= */
const createRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.create(req.body);

    res.status(201).json({
      success: true,
      message: "Recipient created successfully",
      recipient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL RECIPIENTS
========================= */
const getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find();

    res.status(200).json({
      success: true,
      count: recipients.length,
      recipients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET SINGLE RECIPIENT
========================= */
const getRecipientById = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    res.status(200).json(recipient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipient,
  getAllRecipients,
  getRecipientById,
};
