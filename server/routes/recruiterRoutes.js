import express from "express";
import { searchCandidates, getRecruiterProfile,  updateRecruiterProfile} from "../controllers/recruiterController.js";

const router = express.Router();

router.get("/search", searchCandidates);
router.get("/profile/:email", getRecruiterProfile);
router.put("/profile/:email", updateRecruiterProfile);

export default router;