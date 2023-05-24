import express from "express";
import { getOrders } from "../controllers/index.js";

const router = express.Router();

router.route("/get-sales-orders").post(getOrders);

export default router;
