import mongoose from "mongoose";

const Users = new mongoose.Schema({
  login: { type: String },
  password: { type: String },
  IP: { type: String },
  session_id: { type: String },
  tokens: { type: Number, default: 0 },
  rank: { type: String, default: "USER" },
  trust_score: { type: Number, default: 0 },
});

export default mongoose.model("User", Users);
