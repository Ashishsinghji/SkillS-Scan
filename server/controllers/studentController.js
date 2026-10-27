import User from "../models/User.js";

export const getStudentProfile = async (req, res) => {
  try {

    const student = await User.findOne({
      email: req.params.email,
      role: "student"
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      id: student._id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone || "",
      location: student.location || "",
      university: student.university || "",
      degree: student.degree || "",
      graduationYear: student.graduationYear || "",
      skills: student.skills || [],
      linkedin: student.linkedin || "",
      github: student.github || "",
      portfolio: student.portfolio || "",
      bio: student.bio || ""
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const updateStudentProfile = async (req, res) => {
  try {

    const student = await User.findOne({
      email: req.params.email,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    student.fullName =
      req.body.fullName?.trim() || student.fullName;

    student.phone =
      req.body.phone?.trim() || "";

    student.location =
      req.body.location?.trim() || "";

    student.university =
      req.body.university?.trim() || "";

    student.degree =
      req.body.degree?.trim() || "";

    student.graduationYear =
      req.body.graduationYear || "";

    student.skills =
      Array.isArray(req.body.skills)
        ? req.body.skills
            .map(skill => skill.trim())
            .filter(Boolean)
        : [];

    student.linkedin =
      req.body.linkedin?.trim() || "";

    student.github =
      req.body.github?.trim() || "";

    student.portfolio =
      req.body.portfolio?.trim() || "";

    student.bio =
      req.body.bio?.trim() || "";

    await student.save();

    res.status(200).json({

      message: "Profile updated successfully",

      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role,
        phone: student.phone,
        location: student.location,
        university: student.university,
        degree: student.degree,
        graduationYear: student.graduationYear,
        skills: student.skills,
        linkedin: student.linkedin,
        github: student.github,
        portfolio: student.portfolio,
        bio: student.bio
      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};