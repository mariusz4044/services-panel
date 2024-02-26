import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: { type: String },
  password: { type: String },
  email: { type: String },
  IP: { type: String },
  tokens: { type: Number, default: 0 },
  rank: { type: String, default: "USER" },
});

export default mongoose.model("User", userSchema);
