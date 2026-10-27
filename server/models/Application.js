import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    recruiterEmail: {
      type: String,
      required: true,
    },

    studentEmail: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      default: "",
    },

    status: {
    type: String,
    enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview Scheduled",
        "Interview Completed",
        "Selected",
        "Rejected"
    ],
    default: "Applied",
},
interview: {
    scheduled: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: null
    },

    time: {
        type: String,
        default: ""
    },

    mode: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Online"
    },

    location: {
        type: String,
        default: ""
    },

    meetingLink: {
        type: String,
        default: ""
    }
},
    
    jobTitle: {
      type: String,
      default: "",
    },

    companyName: {
      type: String,
     default: "",
    },

    location: {
      type: String,
      default: "",
    },


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", applicationSchema);