import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
} from "../controllers/ticketController.js";
import { assignTicket, getUsers } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-ticket", createTicket);
router.get("/get-tickets", getTickets);
router.get("/get-ticket/:_id", getTicketById);
router.delete("/delete-ticket/:ticketId", deleteTicket);
router.put("/assign-ticket", assignTicket);

export default router;
