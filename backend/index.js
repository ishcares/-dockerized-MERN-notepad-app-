require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authenticateToken } = require("./utilities");

const noteRoutes = require("./routes/notes.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Allow CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api", authRoutes);       // handles /api/login and /api/signup
app.use("/api/notes", noteRoutes); // handles /api/notes routes

// ✅ Protected test route (optional)
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ success: true, message: "You have access!", user: req.user });
});

// 🟢 CRITICAL FIX: Define the PORT variable before the server starts
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => { 
    console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});