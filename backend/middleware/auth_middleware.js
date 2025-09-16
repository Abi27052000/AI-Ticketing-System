import { requireAuth } from "@clerk/express";
import clerkClient from "@clerk/clerk-sdk-node";

export const authMiddleware = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const user = await clerkClient.users.getUser(req.auth.userId);
      req.userRole = user.publicMetadata.role;
      next();
    } catch (error) {
      console.error("Error fetching user role:", error);
      res.status(500).json({ error: "Failed to fetch user role" });
    }
  },
];
