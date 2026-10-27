import express from "express";

import {
  getStudentProfile,
  updateStudentProfile
} from "../controllers/studentController.js";

const router = express.Router();

router.get(
  "/profile/:email",
  getStudentProfile
);

router.put(
  "/profile/:email",
  updateStudentProfile
);

export default router;