import Analysis from "../models/Analysis.js";
export const getDashboard = async (req, res) => {
  try {
    const latestAnalysis = await Analysis.findOne({
      userEmail: req.params.email
    }).sort({ createdAt: -1 });

    const totalAnalysis = await Analysis.countDocuments({
      userEmail: req.params.email
    });

    if (!latestAnalysis) {
      return res.status(200).json({
        atsScore: 0,
        role: "Not Available",
        skills: [],
        missingSkills: [],
        totalAnalysis: 0
      });
    }

    res.status(200).json({
      atsScore: latestAnalysis.atsScore,
      role: latestAnalysis.role,
      skills: latestAnalysis.skills,
      missingSkills: latestAnalysis.missingSkills,
      totalAnalysis
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};