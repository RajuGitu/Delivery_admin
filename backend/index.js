const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

dotenv.config();
connectDB(); // DB connection happens here

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
