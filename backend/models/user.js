import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  role: { type: String, default: "user" },

  skills: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
