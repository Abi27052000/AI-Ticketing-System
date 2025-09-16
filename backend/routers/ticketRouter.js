import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/create-ticket", createTicket);
router.get("/get-tickets", getTickets);
router.get("/get-ticket/:_id", getTicketById);
router.delete("/delete-ticket/:ticketId", deleteTicket);

export default router;
