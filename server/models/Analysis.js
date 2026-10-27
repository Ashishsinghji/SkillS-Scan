import mongoose from "mongoose";
const analysisSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true
  },
  atsScore: Number,
  role: String,
  roleMatch: Number,
  skills: [String],
  learningPath: [String],
  missingSkills: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;