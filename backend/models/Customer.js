// import mongoose from "mongoose";

// const CustomerSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, trim: true, index: true },
//     email: { type: String, required: true, unique: true, lowercase: true, index: true },
//     phone: { type: String, required: true, index: true },
//     address: { type: String },
//     notes: { type: String },
//   },
//   { timestamps: true }
// );

// CustomerSchema.index({ username: "text", email: "text", phone: "text" });

// export default mongoose.model("Customer", CustomerSchema);

// backend/models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true, index: true },
    address: { type: String, trim: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// Full-text search index
customerSchema.index({ username: "text", email: "text", phone: "text" });

// Export as default for ESM imports
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
