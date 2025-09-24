import User from "../models/user.js";
import Ticket from "../models/ticket.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const changeRole = async (req, res) => {
  const { newRole, userId } = req.body;

  try {
    // Find user in MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update role in MongoDB
    user.role = newRole;
    await user.save();

    // Update role in Clerk metadata
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: newRole },
    });

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const assignTicket = async (req, res) => {
  const { ticketId, moderatorId } = req.body;

  try {
    // Find the ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Find the moderator
    const moderator = await User.findById(moderatorId);
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }

    // Check if the user is a moderator
    if (moderator.role !== "moderator") {
      return res.status(400).json({ message: "User is not a moderator" });
    }

    // Assign the ticket to the moderator
    ticket.assignedTo = moderatorId;
    await ticket.save();

    res.status(200).json({
      message: "Ticket assigned successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error assigning ticket:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};

    if (role) {
      query.role = role;
    } else {
      query.role = { $ne: "Admin" };
    }

    const users = await User.find(query);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
