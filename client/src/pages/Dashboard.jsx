import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getDashboardData } from "../services/dashboardService";
import { FaRegHandPaper  } from "react-icons/fa";
import "../css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [dashboard, setDashboard] = useState({
    atsScore: 0,
    role: "Not Available",
    totalAnalysis: 0,
    skills: [],
    missingSkills: []
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData(currentUser.email);
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>
            Welcome Back, {currentUser?.fullName}
            <FaRegHandPaper  className="hello-icon" />
          </h1>
          <p>Track your resume performance and continue improving your professional profile.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Latest ATS Score</h3>
            <h2>{dashboard.atsScore}%</h2>
            <span>Latest resume analysis</span>
          </div>
          <div className="dashboard-card">
            <h3>Recommended Role</h3>
            <h2>{dashboard.role}</h2>
            <span>Based on detected skills</span>
          </div>
          <div className="dashboard-card">
            <h3>Total Analyses</h3>
            <h2>{dashboard.totalAnalysis}</h2>
            <span>Stored in your history</span>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => navigate("/resume-analysis")}>
              Analyze Resume
            </button>
            <button onClick={() => navigate("/career-insights")}>
              Career Insights
            </button>
            <button onClick={() => navigate("/history")}>
              Analysis History
            </button>
          </div>
        </div>

        <div className="recent-section">
          <h2>Latest Analysis</h2>
          <div className="activity-card">
            <p>
              <strong>Detected Skills:</strong>{" "}
              {dashboard.skills.length > 0
                ? dashboard.skills.join(", ")
                : "No analysis yet"}
            </p>
            <p>
              <strong>Missing Skills:</strong>{" "}
              {dashboard.missingSkills.length > 0
                ? dashboard.missingSkills.join(", ")
                : "No missing skills"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;