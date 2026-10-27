import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "../components/RecruiterSidebar";
import "../css/RecruiterDashboard.css";
import { getRecruiterJobs } from "../services/jobService";
import { getRecruiterApplications } from "../services/applicationService";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedRecruiter = JSON.parse(storedUser);

    if (parsedRecruiter.role !== "recruiter") {
      navigate("/login");
      return;
    }

    setRecruiter(parsedRecruiter);
    loadJobs(parsedRecruiter.email);
    loadApplications(parsedRecruiter.email);
  }, [navigate]);

  const loadJobs = async (email) => {
    try {
      const data = await getRecruiterJobs(email);
      setJobs(data);
    } catch (error) {
      console.log("Error loading recruiter jobs:", error);
    }
  };

  const loadApplications = async (email) => {
    try {
      const data = await getRecruiterApplications(email);
      setApplications(data);
    } catch (error) {
      console.log("Error loading recruiter applications:", error);
    }
  };

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  if (!recruiter) {
    return null;
  }

  return (
    <div className="recruiter-dashboard">
      <RecruiterSidebar />

      <div className="recruiter-content">
        <div className="recruiter-header">
          <h1>
            Welcome, {recruiter.recruiterName || recruiter.fullName} 👋
          </h1>

          <p>
            Manage job postings and screen candidates from one place.
          </p>
        </div>

        <div className="recruiter-grid">
          <div className="recruiter-card">
            <h3>Total Jobs Posted</h3>
            <h2>{jobs.length}</h2>
          </div>

          <div className="recruiter-card">
            <h3>Total Applicants</h3>
            <h2>{applications.length}</h2>
          </div>

          <div className="recruiter-card">
            <h3>Shortlisted</h3>
            <h2>{shortlistedCount}</h2>
          </div>
        </div>

        <div className="recruiter-actions">
          <button onClick={() => navigate("/job-posting")}>
            Post New Job
          </button>

          <button onClick={() => navigate("/recruiter-applicants")}>
            View Applicants
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;