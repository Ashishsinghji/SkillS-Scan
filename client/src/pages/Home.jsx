import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import Footer from "../components/Footer";
import { FaFileAlt, FaChartLine, FaBriefcase, FaUserTie, FaUpload, FaSearch, FaChartPie, FaRocket, FaUsers, FaChartBar } from "react-icons/fa";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const handleGetStarted = () => {
    if (currentUser) {
      if (currentUser.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/dashboard");
      }

    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-tag">
            Resume Screening Platform
          </span>
          <h1>
            Analyze Your Resume
            <br />
            Build Your Career
          </h1>

          <p>
            SkillScan helps students analyze resumes,
            improve ATS scores, discover career opportunities,
            and prepare for interviews through a smart resume
            analysis system.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="resume-card">
            <div className="score-circle">
              85%
            </div>
            <h2>Resume Score</h2>
            <p>
              Upload your resume and improve your ATS score.
            </p>
          </div>
        </div>
      </section>
      <section id="features" className="features-section">

        <h2>Why Choose SkillScan?</h2>

        <p>
          Everything you need to improve your resume and prepare for your career.
        </p>

        <div className="features-grid">

          <div className="feature-card">
            <FaFileAlt className="feature-icon" />
            <h3>Resume Analysis</h3>
            <p>Upload your resume and receive a complete skill analysis.</p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>ATS Score</h3>
            <p>Know how recruiter-friendly your resume is.</p>
          </div>

          <div className="feature-card">
            <FaBriefcase className="feature-icon" />
            <h3>Career Insights</h3>
            <p>Discover career opportunities based on your skills.</p>
          </div>

          <div className="feature-card">
            <FaUserTie className="feature-icon" />
            <h3>Interview Prep</h3>
            <p>Prepare confidently with role-based interview questions.</p>
          </div>

        </div>

      </section>

      <section id="workflow" className="workflow-section">

        <h2>How SkillScan Works</h2>

        <p>
          Follow four simple steps to improve your resume and prepare for your career.
        </p>

        <div className="workflow-container">

          <div className="workflow-card">
            <FaUpload className="workflow-icon" />
            <h3>Upload Resume</h3>
            <p>Select your PDF resume securely.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <FaSearch className="workflow-icon" />
            <h3>Analyze Resume</h3>
            <p>Detect skills and calculate ATS score.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <FaChartPie className="workflow-icon" />
            <h3>View Report</h3>
            <p>Check skills, missing skills and recommendations.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <FaRocket className="workflow-icon" />
            <h3>Improve</h3>
            <p>Learn new skills and build a stronger resume.</p>
          </div>

        </div>

      </section>

      <section className="stats-section">

        <h2>SkillScan in Numbers</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <FaFileAlt className="stat-icon" />
            <h3>30+</h3>
            <p>Resume Analyses</p>
          </div>

          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>20+</h3>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <FaChartBar className="stat-icon" />
            <h3>84%</h3>
            <p>Average ATS Score</p>
          </div>

          <div className="stat-card">
            <FaBriefcase className="stat-icon" />
            <h3>10+</h3>
            <p>Career Roles</p>
          </div>

        </div>

      </section>

      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
      <Footer id="footer" />
    </div>
  );
};
export default Home;