import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper function to generate a JWT token
const generateToken = (id, role) => {
  // Ensure the JWT_SECRET is available
  if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup Route
router.post("/signup", async (req, res) => {
  // Log to confirm the route is being reached by a request
  console.log("✅ /api/auth/signup route was hit!");

  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the new user in the database
    const user = await User.create({ username, password, role });

    // If creation is successful, send back user data and a new token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
      streakDays: user.streakDays,
    });
  } catch (error) {
    // Log the detailed error to the server console for debugging
    console.error("🔥 SIGNUP FAILED:", error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  // Log to confirm the route is being reached
  console.log("✅ /api/auth/login route was hit!");

  const { username, password } = req.body;
  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if user exists AND if the provided password matches the stored one
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id, user.role),
        streakDays: user.streakDays,
      });
    } else {
      // Send a specific "invalid credentials" error if login fails
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    // Log any unexpected server errors during the login process
    console.error("🔥 LOGIN FAILED:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

export default router;

