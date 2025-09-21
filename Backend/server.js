import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import your existing route files
import appointmentRoutes from "./routes/appointmentRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// ------------------ MongoDB Connection ------------------ //
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    // CORRECTED: dbName now matches your Atlas database name exactly.
    dbName: "saathidatabase", 
    // REMOVED: useNewUrlParser and useUnifiedTopology are deprecated and no longer needed.
  })
  .then(() => console.log("✅ MongoDB connected successfully to saathidatabase!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Optional: Connection event listeners for debugging
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connection is OPEN");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});
// -------------------------------------------------------- //

// API Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Saathi backend server is running!");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error("🔥 Error stack:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
