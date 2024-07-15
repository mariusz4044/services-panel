import mongoose from "mongoose";

const Referrals = new mongoose.Schema({
  code: { type: String },
  referrer: { type: String },
  value: { type: String },
});

export default mongoose.model("Referrals", Referrals);
