import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student"
    },

    companyName: {
      type: String,
      trim: true,
      default: ""
    },

    recruiterName: {
      type: String,
      trim: true,
      default: ""
    },
    designation: {
      type: String,
      trim: true,
      default: ""
    },

    companyLocation: {
      type: String,
      trim: true,
      default: ""
    },

    companyWebsite: {
      type: String,
      trim: true,
      default: ""
    },

    phone: {
  type: String,
  trim: true,
  default: ""
},

location: {
  type: String,
  trim: true,
  default: ""
},

university: {
  type: String,
  trim: true,
  default: ""
},

degree: {
  type: String,
  trim: true,
  default: ""
},

graduationYear: {
  type: String,
  trim: true,
  default: ""
},

skills: {
  type: [String],
  default: []
},

linkedin: {
  type: String,
  trim: true,
  default: ""
},

github: {
  type: String,
  trim: true,
  default: ""
},

portfolio: {
  type: String,
  trim: true,
  default: ""
},

bio: {
  type: String,
  trim: true,
  maxlength: 500,
  default: ""
},

  },
  {
    timestamps: true
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;