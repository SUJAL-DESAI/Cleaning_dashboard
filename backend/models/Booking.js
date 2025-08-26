import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    date: { type: Date, required: true },
    address: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
    assignedStaff: { type: String },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);