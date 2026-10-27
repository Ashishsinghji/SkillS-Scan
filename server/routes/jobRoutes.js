import express from "express";
import {
  createJob,
  getRecruiterJobs, getAllJobs, deleteJob, updateJob
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:email", getRecruiterJobs);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);

export default router;