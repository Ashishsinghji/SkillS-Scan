import Analysis from "../models/Analysis.js";
export const getHistory = async (req, res) => {
  try {

    const history = await Analysis.find({
      userEmail: req.params.email
    }).sort({ createdAt: -1 });

    res.status(200).json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};