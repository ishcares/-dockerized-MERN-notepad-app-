process.on('uncaughtException', (err) => {
    // This logs synchronous errors (the most likely cause of a crash)
    console.error('💥 Uncaught Exception:', err.message, err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    // This logs asynchronous promise errors
    console.error('⚠️ Unhandled Rejection:', reason.stack || reason);
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authenticateToken } = require("./utilities");

const noteRoutes = require("./routes/notes.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('💥 Bad JSON received:', req.body);
        return res.status(400).send({ success: false, message: 'Invalid JSON format in request body.' });
    }
    next();
});

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

  app.get("/", (req, res) => {

    res.json({ status: "ok", service: "Notes Backend" });

});
// ✅ Routes
app.use("/api", authRoutes);       // handles /api/login and /api/signup
app.use("/api/notes", noteRoutes); // handles /api/notes routes

// ✅ Protected test route (optional)
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ success: true, message: "You have access!", user: req.user });
});

// 🟢 CRITICAL FIX: Define the PORT variable before the server starts
const PORT = process.env.PORT || 8000;

// Use a variable to hold the server instance
const server = app.listen(PORT, '0.0.0.0', () => { 
    console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});

// ⚡ CRITICAL FIX: Increase timeouts to prevent 502 on Render proxy
server.keepAliveTimeout = 65000; // 65 seconds
server.headersTimeout = 66000; // 66 seconds

// ------------------------------------------