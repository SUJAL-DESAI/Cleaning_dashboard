import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    location: { type: String },
    pincode: { type: String },
    otp: { type: String },  
    token: { type: String }, 
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
export default User;
