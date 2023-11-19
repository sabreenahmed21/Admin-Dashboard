import express from "express";
const router = express.Router();
import {
  getUser,
  getDashboard,
} from "../controllers/generalController.js";

router.get("/users/:id", getUser);
router.get("/dashboard", getDashboard);

export default router;