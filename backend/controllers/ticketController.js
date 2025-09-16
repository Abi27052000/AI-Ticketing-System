import Ticket from "../models/ticket.js";
import User from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const createTicket = async (req, res) => {
  const { title, description, deadline, _id } = req.body;
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY not configured" });
    }

    const existingUser = await User.findOne({ _id });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Polish description using Gemini LLM with structured JSON output
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const polishPrompt = `Polish this ticket description to make it clear, concise, and professional and make it more explainable. Mention the tech stack needed as well: ${description}

Return the result as a valid JSON object with the following format:
{
  "description": "The polished description here",
  "skills": ["skill1", "skill2", "etc."]
}`;
    const polishResult = await model.generateContent(polishPrompt);
    const polishResponse = await polishResult.response;
    const polishText = polishResponse
      .text()
      .replace(/```json\n?|\n?```/g, "")
      .trim();
    console.log("Polish response text:", polishText);
    let parsedDescription;
    try {
      parsedDescription = JSON.parse(polishText);
    } catch (parseError) {
      console.log("Parse error:", parseError.message);
      return res
        .status(500)
        .json({ message: "Failed to parse description from AI" });
    }
    const polishedDescription = parsedDescription.description;
    const relatedSkills = parsedDescription.skills || [];

    // Determine priority using AI with structured JSON output
    const priorityPrompt = `Determine the priority of this ticket as low, medium, or high based on title and description. Title: ${title}, Description: ${polishedDescription}.

Return the result as a valid JSON object with the following format:
{
  "priority": "low" or "medium" or "high"
}`;
    const priorityResult = await model.generateContent(priorityPrompt);
    const priorityResponse = await priorityResult.response;
    const priorityText = priorityResponse
      .text()
      .replace(/```json\n?|\n?```/g, "")
      .trim();
    console.log("Priority response text:", priorityText);
    let parsedPriority;
    try {
      parsedPriority = JSON.parse(priorityText);
    } catch (parseError) {
      console.log("Parse error:", parseError.message);
      return res
        .status(500)
        .json({ message: "Failed to parse priority from AI" });
    }
    const priority = parsedPriority.priority;
    if (!["low", "medium", "high"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "Invalid priority determined by AI" });
    }

    // Create ticket
    const ticket = new Ticket({
      title,
      description: polishedDescription,
      priority,
      deadline: deadline ? new Date(deadline) : null,
      createdBy: _id,
      relatedSkills,
      createdAt: new Date(),
    });
    await ticket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { priority, status } = req.query;
    const filter = {};

    if (priority) {
      filter.priority = priority;
    }

    if (status) {
      filter.status = status;
    }

    const tickets = await Ticket.find(filter);
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTicketById = async (req, res) => {
  const { _id } = req.params;
  try {
    const ticket = await Ticket.find({ createdBy: _id });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
