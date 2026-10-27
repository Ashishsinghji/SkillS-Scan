import express from "express";

import { applyJob, getStudentApplications, getRecruiterApplications, updateApplicationStatus,  scheduleInterview
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", applyJob);

router.get("/:email", getStudentApplications);
router.get("/recruiter/:email", getRecruiterApplications);

router.put("/:id/interview", scheduleInterview);
router.put("/:id", updateApplicationStatus);
export default router;