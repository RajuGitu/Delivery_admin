const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log(error);
    console.error("⚠️ MongoDB not connected (running without DB)");
    // ❌ DO NOT exit process
  }
};

module.exports = connectDB;
