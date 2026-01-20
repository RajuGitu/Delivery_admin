
// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./db/db");
// const authRoutes = require("./routes/authRoutes");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // Routes
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

console.log("🔥 BACKEND INDEX.JS LOADED");

const app = express();

/* ✅ CORS — MUST BE FIRST */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* LOG ALL REQUESTS */
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* BODY PARSER */
app.use(express.json());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Server is running");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
