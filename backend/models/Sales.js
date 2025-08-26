import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    amount: { type: Number, required: true },
    product: { type: String, required: true },
    productInfo: { type: String, required: true },
    bookingDate: { type: Date, required: true },   
    purchaseDate: { type: Date, required: true }   
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
