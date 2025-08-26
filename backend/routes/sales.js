import Sale from "../models/Sales.js";
import express from "express";
const router = express.Router();

// CREATE Sale
router.post("/", async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ Sales with Search + Pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, name, email, phone, product } = req.query;

    // Build search filter
    let filter = {};
    if (name) {
      filter.customerName = { $regex: name, $options: "i" }; 
    }
    if (email) {
      filter.customerEmail = { $regex: email, $options: "i" };
    }
    if (phone) {
      filter.customerPhone = { $regex: phone, $options: "i" };
    }
    if (product) {
      filter.product = { $regex: product, $options: "i" };
    }

    const sales = await Sale.find(filter)
      .sort({ purchaseDate: -1 }) // latest first
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Sale.countDocuments(filter);

    res.json({
      sales,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// BULK CREATE Sales
router.post("/bulk", async (req, res) => {
  try {
    const newSales = await Sale.insertMany(req.body); 
    res.status(201).json(newSales);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
