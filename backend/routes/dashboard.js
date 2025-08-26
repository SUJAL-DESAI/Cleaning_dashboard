import express from "express";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalServices = await Service.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: "active" });
    const pendingComplaints = await Booking.countDocuments({ status: "complaint" });

    res.json({
      totalCustomers,
      totalServices,
      activeBookings,
      pendingComplaints,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/bookings-trend", async (req, res) => {
  try {
    const trend = await Booking.aggregate([
      { $group: { _id: { $month: "$date" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(trend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/services-demand", async (req, res) => {
  try {
    const demand = await Booking.aggregate([
      { $group: { _id: "$serviceName", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(demand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
