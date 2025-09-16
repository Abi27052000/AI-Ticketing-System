import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String, default: "TODO" },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  createdBy: { type: String, ref: "User" },
  assignedTo: {
    type: String,
    ref: "User",
    default: null,
  },
  deadline: { type: Date },

  helpfulNotes: String,
  relatedSkills: [String],
  createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
