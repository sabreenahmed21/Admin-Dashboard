import express from "express";
const router = express.Router();
import {
  getAdmins,
  getUserPerformance,
} from "../controllers/managementController.js";

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;
