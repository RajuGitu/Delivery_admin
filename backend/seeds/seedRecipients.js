const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipient = require("../models/recipientSchema");
const connectDB = require("../db/db");

dotenv.config();
connectDB();

const seedRecipients = async () => {
  try {
    await Recipient.deleteMany();

    await Recipient.insertMany([
      {
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        address: "Andheri East, Mumbai",
        pincode: "400069",
        recipientSuccessRate: 85,
        localityPastRate: 78,
      },
      {
        name: "Anjali Verma",
        email: "anjali@gmail.com",
        phone: "9876543211",
        address: "Indiranagar, Bengaluru",
        pincode: "560038",
        recipientSuccessRate: 92,
        localityPastRate: 88,
      },
      {
        name: "Amit Patel",
        email: "amit@gmail.com",
        phone: "9876543212",
        address: "Navrangpura, Ahmedabad",
        pincode: "380009",
        recipientSuccessRate: 75,
        localityPastRate: 70,
      },
      {
        name: "Sneha Kulkarni",
        email: "sneha@gmail.com",
        phone: "9876543213",
        address: "Kothrud, Pune",
        pincode: "411038",
        recipientSuccessRate: 90,
        localityPastRate: 83,
      },
    ]);

    console.log("✅ TEMP RECIPIENTS ADDED");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedRecipients();
