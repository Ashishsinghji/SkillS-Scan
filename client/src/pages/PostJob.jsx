import { useState } from "react";
import RecruiterSidebar from "../components/RecruiterSidebar";
import { createJob } from "../services/jobService";
import "../css/PostJob.css";

const PostJob = () => {

  const recruiter = JSON.parse(sessionStorage.getItem("currentUser"));

  const [job, setJob] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    experience: "",
    salary: "",
    requiredSkills: "",
    jobDescription: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    try {

      await createJob({
        ...job,
        recruiterName:
          recruiter.recruiterName ||
          recruiter.fullName,

        recruiterEmail:
          recruiter.email,

        requiredSkills:
          job.requiredSkills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean)
      });

      alert("Job Posted Successfully!");

      setJob({
        companyName: "",
        jobTitle: "",
        location: "",
        experience: "",
        salary: "",
        requiredSkills: "",
        jobDescription: ""
      });

    } catch (error) {
      console.log(error);
      alert("Failed to post job");
    }

  };

  return (
    <div className="post-job-page">
      <RecruiterSidebar />

      <div className="post-job-content">

        <h1>Post New Job</h1>

        <div className="post-job-form">

          <div className="form-row">

            <div className="form-group">
              <label>Company Name</label>
              <input
                name="companyName"
                placeholder="Enter company name"
                value={job.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                name="jobTitle"
                placeholder="e.g. React Developer"
                value={job.jobTitle}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                placeholder="e.g. Bengaluru, India"
                value={job.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <input
                name="experience"
                placeholder="e.g. 1-3 Years"
                value={job.experience}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Salary</label>
              <input
                name="salary"
                placeholder="e.g. ₹6 - ₹10 LPA"
                value={job.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                name="requiredSkills"
                placeholder="React, Node.js, MongoDB"
                value={job.requiredSkills}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              placeholder="Describe the job responsibilities and requirements..."
              value={job.jobDescription}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSubmit}>
            Post Job
          </button>

        </div>

      </div>
    </div>
  );
};

export default PostJob;