import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

// router.post("/register", requireAuth(), userRegister);
// router.post("/login", requireAuth(), userLogin);

export default router;
