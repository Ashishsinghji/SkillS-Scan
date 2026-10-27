import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBook } from "react-icons/fa";
import "../css/ResumeAnalysis.css";
import { uploadResume, analyzeResume } from "../services/resumeService";

const ResumeAnalysis = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF resume.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const uploadResponse = await uploadResume(formData);

      const analysisResponse = await analyzeResume({
        fileName: uploadResponse.file,
        userEmail: currentUser.email
      });

      setResult(analysisResponse);

      sessionStorage.setItem(
        "latestAnalysis",
        JSON.stringify(analysisResponse)
      );
      sessionStorage.setItem("atsScore", analysisResponse.atsScore);
      sessionStorage.setItem("careerRole", analysisResponse.role);
      sessionStorage.setItem(
        "skills",
        JSON.stringify(analysisResponse.skills)
      );
      sessionStorage.setItem(
        "missingSkills",
        JSON.stringify(analysisResponse.missingSkills)
      );

      setMessage("Resume uploaded and analyzed successfully.");
    } catch (error) {
      console.error("Resume analysis error:", error);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <Sidebar />

      <div className="resume-content">
        <h1>Resume Analysis</h1>

        <p>
          Upload your resume and receive a complete analysis.
        </p>

        <div className="upload-card">
          <h2>Upload Resume</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          {selectedFile && (
            <p className="selected-file">
              Selected File :
              <strong> {selectedFile.name}</strong>
            </p>
          )}

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading
              ? "Analyzing..."
              : "Upload & Analyze Resume"}
          </button>

          {message && (
            <p className="upload-message">
              {message}
            </p>
          )}
        </div>

        {!result ? (
          <div className="result-placeholder">
            <h2>Analysis Result</h2>

            <p>
              Upload your resume to view the complete analysis.
            </p>
          </div>
        ) : (
          <div className="analysis-result">
            <div className="result-top">
              <div className="score-card">
                <h2>ATS Score</h2>

                <div className="score-circle">
                  {result.atsScore}%
                </div>
              </div>

              <div className="role-card">
                <h2>Recommended Role</h2>

                <p className="career-role">
                  {result.role}
                </p>

                {result.roleMatch && (
                  <p className="role-match">
                    Match Score : {result.roleMatch}%
                  </p>
                )}
              </div>
            </div>

            <h2>Detected Skills</h2>

            <div className="skills-list">
              {result.skills.length > 0 ? (
                result.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No technical skills detected.</p>
              )}
            </div>

            <h2>Missing Skills</h2>

            <div className="skills-list">
              {result.missingSkills.length > 0 ? (
                result.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="missing-tag"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No missing skills.</p>
              )}
            </div>

            <h2>Learning Recommendations</h2>

            <div className="skills-list">
              {result.learningPath.length > 0 ? (
                result.learningPath.map((item, index) => (
                  <span
                    key={index}
                    className="learning-tag"
                  >
                    <FaBook /> {item}
                  </span>
                ))
              ) : (
                <p>No recommendations available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;