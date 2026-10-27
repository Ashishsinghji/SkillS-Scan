import Job from "../models/Job.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all jobs of a recruiter
export const getRecruiterJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      recruiterEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

 

};
 // Get all jobs (Student Portal)

  export const getAllJobs = async (req, res) => {

    try {

      const jobs = await Job.find().sort({
        createdAt: -1
      });

      res.status(200).json(jobs);

    }

    catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

  // Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a recruiter job
export const updateJob = async (req, res) => {
    try {

        const { id } = req.params;

        const job = await Job.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};