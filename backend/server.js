
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import customersRoutes from "./routes/customers.js"; 
import dotenv from 'dotenv';
import salesRoutes from "./routes/sales.js"; 
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customersRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/users", userRoutes);

// Root test
app.get("/", (req, res) => res.send("API running..."));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
