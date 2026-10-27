import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterEmail: {
      type: String,
      required: true,
    },

    recruiterName: {
      type: String,
      required: true,
    },


    companyName: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    requiredSkills: [
      {
        type: String,
      },
    ],

    jobDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);