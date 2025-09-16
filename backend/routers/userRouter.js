import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";
import { changeRole } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.put("/role", authMiddleware, changeRole);

export default router;
