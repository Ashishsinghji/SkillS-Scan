import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Analysis from "../models/Analysis.js";

export const searchCandidates = async (req, res) => {
  try {

    const skill = req.query.skill;

    const candidates = await Analysis.find({
      skills: {
        $regex: skill,
        $options: "i"
      }
    }).sort({ atsScore: -1 });

    res.status(200).json(candidates);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getRecruiterProfile = async (req, res) => {
  try {

    const recruiter = await User.findOne({
      email: req.params.email,
      role: "recruiter"
    }).select("-password");

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found"
      });
    }

    res.status(200).json({
  id: recruiter._id,
  fullName: recruiter.fullName,
  recruiterName: recruiter.recruiterName,
  companyName: recruiter.companyName,
  designation: recruiter.designation,
  companyLocation: recruiter.companyLocation,
  companyWebsite: recruiter.companyWebsite,
  email: recruiter.email,
  role: recruiter.role
});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const updateRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await User.findOne({
      email: req.params.email,
      role: "recruiter"
    });

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found"
      });
    }

   recruiter.recruiterName = req.body.recruiterName;
recruiter.companyName = req.body.companyName;
recruiter.designation = req.body.designation;
recruiter.companyLocation = req.body.companyLocation;
recruiter.companyWebsite = req.body.companyWebsite;

    await recruiter.save();

   res.status(200).json({
  message: "Profile updated successfully",
  recruiter: {
  id: recruiter._id,
  fullName: recruiter.fullName,
  email: recruiter.email,
  role: recruiter.role,
  recruiterName: recruiter.recruiterName,
  companyName: recruiter.companyName,
  designation: recruiter.designation,
  companyLocation: recruiter.companyLocation,
  companyWebsite: recruiter.companyWebsite
}
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};