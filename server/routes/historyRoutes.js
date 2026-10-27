import express from "express";
import { getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/:email", getHistory);

export default router;