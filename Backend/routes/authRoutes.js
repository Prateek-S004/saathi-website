import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // This is the line where the error likely occurs
    const user = await User.create({ username, password, role });

    // If creation is successful, send back user data and token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
      streakDays: user.streakDays,
    });
  } catch (error) {
    // ✅ CORRECTED: Added console.error to log the full error to your Render console.
    console.error("🔥 SIGNUP FAILED:", error); 
    
    // This sends a generic message to the frontend, which is good practice.
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id, user.role),
        streakDays: user.streakDays,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    // It's a good idea to log login errors as well for debugging.
    console.error("🔥 LOGIN FAILED:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

export default router;
