import express from "express";
const router = express.Router();

import {
  getProducts,
  getCustomers,
  getTransaction,
  getGeography,
} from "../controllers/clientController.js";

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransaction);
router.get("/geography", getGeography);
export default router;