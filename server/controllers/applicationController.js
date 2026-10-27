import Application from "../models/Application.js";
import Analysis from "../models/Analysis.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {

  try {

    const {
      jobId,
      studentEmail,
      studentName
    } = req.body;

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      jobId,
      studentEmail
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    // Get latest ATS analysis
    const latestAnalysis = await Analysis.findOne({
      userEmail: studentEmail
    }).sort({ createdAt: -1 });

   const application = await Application.create({

  jobId,

  // Save job information as a snapshot
  jobTitle: job.jobTitle,
  companyName: job.companyName,
  location: job.location,

  recruiterEmail: job.recruiterEmail,

  studentEmail,

  studentName,

  atsScore: latestAnalysis
    ? latestAnalysis.atsScore
    : 0,

  role: latestAnalysis
    ? latestAnalysis.role
    : ""

});

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

  

};
export const getStudentApplications = async (req, res) => {

    try {

        const applications = await Application.find({
            studentEmail: req.params.email
        })
        .populate("jobId")
        .sort({ createdAt: -1 });

        res.status(200).json(applications);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
export const getRecruiterApplications = async (req, res) => {

    try {

        const applications = await Application.find({
            recruiterEmail: req.params.email
        })
        .populate("jobId")
        .sort({ atsScore: -1 });

        res.status(200).json(applications);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
export const updateApplicationStatus = async (req, res) => {

    try {

        const { status } = req.body;

// Allowed statuses
const allowedStatuses = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview Scheduled",
    "Interview Completed",
    "Selected",
    "Rejected"
];

if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
        message: "Invalid application status."
    });
}

// Find application first
const application = await Application.findById(req.params.id);

if (!application) {
    return res.status(404).json({
        message: "Application not found"
    });
}

// Define the allowed workflow
const validTransitions = {
    "Applied": [
        "Under Review",
        "Rejected"
    ],

    "Under Review": [
        "Shortlisted",
        "Rejected"
    ],

    "Shortlisted": [
        // Interview is scheduled
        // through scheduleInterview()
    ],

    "Interview Scheduled": [
        "Interview Completed"
    ],

    "Interview Completed": [
        "Selected",
        "Rejected"
    ],

    "Selected": [],

    "Rejected": []
};

// Check whether this transition is allowed
const possibleNextStatuses =
    validTransitions[application.status] || [];

if (!possibleNextStatuses.includes(status)) {
    return res.status(400).json({
        message:
            `Invalid workflow transition: ${application.status} → ${status}`
    });
}

// Update status
application.status = status;

await application.save();

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const scheduleInterview = async (req, res) => {
    try {
        const {
            date,
            time,
            mode,
            location,
            meetingLink
        } = req.body;

        // Find application
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        // Only shortlisted candidates can be scheduled
        if (application.status !== "Shortlisted") {
            return res.status(400).json({
                message:
                    "Only shortlisted candidates can be scheduled for an interview"
            });
        }

        // Check whether the original job still exists
        const job = await Job.findById(application.jobId);

        if (!job) {
            return res.status(400).json({
                message:
                    "Job associated with this application is no longer available. Interview cannot be scheduled."
            });
        }

        // Make sure job information exists in the application
        application.jobTitle =
            application.jobTitle || job.jobTitle;

        application.companyName =
            application.companyName || job.companyName;

        application.location =
            application.location || job.location || "";

        // Update application status
        application.status = "Interview Scheduled";

        // Save interview information
        application.interview = {
            scheduled: true,
            date: date,
            time: time,
            mode: mode,
            location: mode === "Offline" ? location : "",
            meetingLink: mode === "Online" ? meetingLink : ""
        };

        await application.save();

        res.status(200).json({
            message: "Interview scheduled successfully",
            application
        });

    } catch (error) {

        console.error("Schedule Interview Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};