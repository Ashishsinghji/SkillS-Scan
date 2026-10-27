import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaSearch, FaUserTie, FaEnvelope, FaBriefcase, FaMoneyBillWave, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { getAllJobs } from "../services/jobService";
import { applyJob } from "../services/applicationService";
import "../css/JobPortal.css";

const JobPortal = () => {
  const student = JSON.parse(sessionStorage.getItem("currentUser"));
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadJobs();
    const handleFocus = () => { loadJobs(); };
    window.addEventListener("focus", handleFocus);
    return () => { window.removeEventListener("focus", handleFocus); };
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob({
        jobId,
        studentEmail: student.email,
        studentName: student.fullName
      });
      alert("Application Submitted Successfully!");
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;

      if (message === "You have already applied for this job") {
        alert("You have already applied for this job.");
      } else if (message === "Job not found") {
        alert("This job is no longer available. Please refresh the Job Portal.");
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        alert(message || "Something went wrong. Please try again.");
      }
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      job.jobTitle?.toLowerCase().includes(search) ||
      job.companyName?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search) ||
      job.experience?.toLowerCase().includes(search) ||
      job.requiredSkills?.some((skill) => skill.toLowerCase().includes(search))
    );
  });

  return (
    <div className="job-page">
      <Sidebar />
      <main className="job-content">
        <div className="job-header">
          <h1>Available Jobs</h1>
          <p>Explore opportunities that match your skills and career goals.</p>

          <div className="job-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search jobs, companies, locations or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className="job-result-count">
            {searchTerm
              ? `${filteredJobs.length} matching job${filteredJobs.length !== 1 ? "s" : ""} found`
              : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.jobTitle}</h2>
              <h3>{job.companyName}</h3>

              <div className="recruiter-info">
                <p>
                  <FaUserTie />
                  <span>{job.recruiterName || "Recruiter"}</span>
                </p>
                <p>
                  <FaEnvelope />
                  <span>{job.recruiterEmail}</span>
                </p>
              </div>

              <div className="job-details">
                <p className="job-info">
                  <FaMapMarkerAlt />
                  <span>{job.location}</span>
                </p>
                <p className="job-info">
                  <FaBriefcase />
                  <span>{job.experience}</span>
                </p>
                <p className="job-info">
                  <FaMoneyBillWave />
                  <span>{job.salary}</span>
                </p>
              </div>

              {job.requiredSkills && job.requiredSkills.length > 0 && (
                <div className="skills-section">
                  <h4>Required Skills</h4>
                  <div className="skills-list">
                    {job.requiredSkills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        <FaCheckCircle />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="job-description">
                <h4>Job Description</h4>
                <p>{job.jobDescription || "No description provided."}</p>
              </div>

              <div className="job-footer">
                <span className="posted-date">
                  <FaCalendarAlt />
                  Posted{" "}
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "Recently"}
                </span>

                <button onClick={() => handleApply(job._id)}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="no-jobs">
              <h2>{searchTerm ? "No Matching Jobs" : "No Jobs Available"}</h2>
              <p>
                {searchTerm
                  ? "Try searching with a different job title, skill, company, or location."
                  : "There are currently no job openings available."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobPortal;