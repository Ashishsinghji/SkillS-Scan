import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getLatestAnalysis } from "../services/historyService";
import "../css/CareerInsights.css";

const CareerInsights = () => {
  const [analysis, setAnalysis] = useState(null);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const data = await getLatestAnalysis(currentUser.email);
      setAnalysis(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analysis) {
    return (
      <div className="career-page">
        <Sidebar />
        <div className="career-content">
          <h1>Career Insights</h1>
          <div className="empty-career">
            <h2>No Analysis Available</h2>
            <p>Please analyze your resume first.</p>
          </div>
        </div>
      </div>
    );
  }

  const salaryData = {
    "Frontend Developer": "₹4 - ₹10 LPA",
    "Backend Developer": "₹5 - ₹12 LPA",
    "MERN Stack Developer": "₹6 - ₹15 LPA",
    "Java Developer": "₹5 - ₹12 LPA",
    "Python Developer": "₹5 - ₹14 LPA",
    "Data Analyst": "₹4 - ₹11 LPA",
    "Software Developer": "₹4 - ₹12 LPA",
    "Unable to Predict": "Unknown"
  };

  const demandData = {
    "Frontend Developer": "High",
    "Backend Developer": "Very High",
    "MERN Stack Developer": "Very High",
    "Java Developer": "High",
    "Python Developer": "High",
    "Data Analyst": "High",
    "Software Developer": "High",
    "Unable to Predict": "Unknown"
  };

  const companyData = {
    "Frontend Developer": ["Google", "Microsoft", "Infosys", "TCS", "Wipro"],
    "Backend Developer": ["Amazon", "Microsoft", "Capgemini", "Infosys", "Accenture"],
    "MERN Stack Developer": ["Google", "Amazon", "Adobe", "Flipkart", "Paytm"],
    "Java Developer": ["Oracle", "Infosys", "TCS", "IBM", "Capgemini"],
    "Python Developer": ["Google", "Amazon", "Zoho", "Accenture", "Infosys"],
    "Data Analyst": ["Deloitte", "EY", "PwC", "KPMG", "Accenture"],
    "Software Developer": ["Infosys", "TCS", "Wipro", "Capgemini", "IBM"],
    "Unable to Predict": []
  };

  const compatibility = Math.min(100, Math.round((analysis.skills.length / 12) * 100));

  return (
    <div className="career-page">
      <Sidebar />
      <div className="career-content">
        <h1>Career Insights</h1>
        <p>Your personalized career roadmap based on your latest resume.</p>

        <div className="career-top">
          <div className="career-card">
            <h3>Recommended Career</h3>
            <h2>{analysis.role}</h2>
          </div>
          <div className="career-card">
            <h3>Compatibility</h3>
            <h2>{compatibility}%</h2>
          </div>
        </div>

        <div className="career-stats">
          <div className="info-card">
            <h4>Salary Range</h4>
            <p>{salaryData[analysis.role] || "Not Available"}</p>
          </div>
          <div className="info-card">
            <h4>Industry Demand</h4>
            <p>{demandData[analysis.role] || "Not Available"}</p>
          </div>
          <div className="info-card">
            <h4>Detected Skills</h4>
            <p>{analysis.skills.length} / 12</p>
          </div>
        </div>

        <div className="section">
          <h2>Your Skills</h2>
          <div className="tag-box">
            {analysis.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Skills To Learn</h2>
          <div className="tag-box">
            {analysis.missingSkills.map((skill, index) => (
              <span key={index} className="missing-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Learning Roadmap</h2>
          <div className="roadmap">
            {analysis.learningPath.map((item, index) => (
              <div key={index} className="roadmap-step">
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Top Companies</h2>
          <div className="company-list">
            {companyData[analysis.role]?.map((company, index) => (
              <div key={index} className="company-card">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;