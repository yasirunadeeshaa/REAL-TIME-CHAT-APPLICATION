const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// User Registration
exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Validate inputs
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if the email is already in use
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user in the database
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
  
    } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  };

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Get User Profile (Protected)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};
