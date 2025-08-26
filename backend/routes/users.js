import User from "../models/Users.js";  
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, username, email, mobileNumber, location } = req.query;

    // Build search filter
    let filter = {};
    if (username) {
      filter.username = { $regex: username, $options: "i" }; // case-insensitive search
    }
    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }
    if (mobileNumber) {
      filter.mobileNumber = { $regex: mobileNumber, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    
    // Fetch users with pagination
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Count total documents
    const total = await User.countDocuments(filter);

    res.json({
      users, // return the fetched users
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const newUsers = await User.insertMany(req.body);
    res.status(201).json(newUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
