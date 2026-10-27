import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    recruiterName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Recruiter", recruiterSchema);