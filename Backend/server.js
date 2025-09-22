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
const PORT = process.env.PORT || 5000;

// ------------------ CORS Middleware (The Fix) ------------------ //
// We define the exact URL of the frontend that is allowed to make requests.
const allowedOrigins = ["https://saathi-website.onrender.com"];

const corsOptions = {
  origin: (origin, callback) => {
    // The 'origin' is the URL of the site making the request (your frontend)
    // We check if it's in our allowed list.
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If it is, allow the request.
      callback(null, true);
    } else {
      // If it's not, block the request.
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // This allows cookies and authorization headers.
};

// Use the CORS middleware with our options at the very top.
app.use(cors(corsOptions));
// ------------------------------------------------------------- //


app.use(express.json());

// ------------------ MongoDB Connection ------------------ //
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    dbName: "saathidatabase",
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------ API Routes ------------------ //
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
  console.log(`⚡ Server running on port ${PORT}`);
});