import express from "express";
import Customer from "../models/Customer.js";
import { getTimeWindow } from "../utils/timeWindows.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: "username, email and phone are required" });
    }

    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = Math.max(Number(page), 1);
    limit = Math.max(Number(limit), 1);

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Customer.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Customer.countDocuments(),
    ]);

    res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/seed", async (req, res) => {
  try {
    const now = new Date();
    const sample = [
//   { username: "john_doe", email: "john@example.com", phone: "9876543210", address: "B-12 Gandhinagar" },
  { username: "jane_smith", email: "jane@example.com", phone: "9876500001", address: "Ahmedabad" },
  { username: "mihir_k", email: "mihir@foo.com", phone: "9000001234", address: "Vadodara" },
  { username: "raj_patel", email: "raj@bar.com", phone: "9998887777", address: "Surat" },
  { username: "ankit_rai", email: "ankit@domain.com", phone: "9812345678", address: "Gandhinagar" },
  { username: "meera_desai", email: "meera@domain.com", phone: "9876512345", address: "Ahmedabad" },
  { username: "vishal_shah", email: "vishal@domain.com", phone: "9823456789", address: "Surat" },
  { username: "aarti_patel", email: "aarti@domain.com", phone: "9901234567", address: "Vadodara" },
  { username: "devansh_mehta", email: "devansh@domain.com", phone: "9876600001", address: "Ahmedabad" },
  { username: "kiran_jain", email: "kiran@domain.com", phone: "9876777777", address: "Gandhinagar" },
  { username: "tanvi_kapoor", email: "tanvi@domain.com", phone: "9876888888", address: "Surat" },
  { username: "rajat_gupta", email: "rajat@domain.com", phone: "9876999999", address: "Vadodara" },
  { username: "pallavi_sharma", email: "pallavi@domain.com", phone: "9876101010", address: "Ahmedabad" },
  { username: "nisha_singh", email: "nisha@domain.com", phone: "9876212121", address: "Gandhinagar" },
  { username: "aditya_malhotra", email: "aditya@domain.com", phone: "9876323232", address: "Surat" },
];


    const createdDocs = [];
    for (let i = 0; i < sample.length; i++) {
      const doc = await Customer.create(sample[i]);
      doc.createdAt = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      await doc.save();
      createdDocs.push(doc);
    }

    res.json({ inserted: createdDocs.length, docs: createdDocs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    let { search = "", mode = "daily", date, page = 1, limit = 10 } = req.query;
    page = Math.max(Number(page), 1);
    limit = Math.max(Number(limit), 1);

    const { start, end } = getTimeWindow(mode, date);

    const searchRegex = new RegExp(
      search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );

    const filter = {
      createdAt: { $gte: start, $lte: end },
      $or: [
        { username: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } },
        { address: { $regex: searchRegex } }, // ✅ include address
      ],
    };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Customer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Customer.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
      window: { start, end },
    });
  } catch (err) {
    console.error("Error in /search:", err);
    res.status(500).json({ message: err.message });
  }
});



export default router;

