import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getHistory } from "../services/historyService";
import "../css/History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {loadHistory();}, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory(currentUser.email);
      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="history-page">
      <Sidebar />
      <div className="history-content">
        <h1>Analysis History</h1>
        <p>
          View all your previous resume analyses and track your progress.
        </p>
        <div className="history-stats">
          <div className="stat-box">
            <h2>{history.length}</h2>
            <p>Total Analyses</p>
          </div>

          <div className="stat-box">
            <h2>
              {
                history.length > 0
                  ? Math.max(...history.map(item => item.atsScore))
                  : 0
              }%
            </h2>
            <p>Best ATS Score</p>
          </div>

          <div className="stat-box">
            <h2>
              {
                history.length > 0
                  ? history[0].role
                  : "-"
              }
            </h2>
            <p>Latest Role</p>
          </div>
        </div>

        {
          history.length === 0 ?
            (
              <div className="empty-history">
                <h2>No Resume Analysis Yet</h2>
                <p>
                  Analyze your first resume to start tracking your progress.
                </p>
              </div>

            )
            :
            (
              <div className="history-grid">
                {
                  history.map((item, index) => (
                    <div className="history-card" key={item._id}>
                      <h2>
                        Resume Analysis #{history.length - index}
                      </h2>

                      <h3>{item.role}</h3>
                      <div className="history-score">
                        ATS Score
                        <strong>
                          {item.atsScore}%
                        </strong>
                      </div>

                      <p className="history-date">
                        📅 {" "}
                        {
                          new Date(item.createdAt)
                            .toLocaleDateString()
                        }
                      </p>

                      <button
                        className="details-btn"
                        onClick={() =>
                          setExpandedCard(
                            expandedCard === item._id
                              ? null
                              : item._id
                          )
                        }
                      >

                        {
                          expandedCard === item._id
                            ? "Hide Details"
                            : "View Details"
                        }
                      </button>
                      {
                        expandedCard === item._id &&
                        (
                          <div className="details-section">
                            <h4>Detected Skills</h4>
                            <div className="skills-box">
                              {
                                item.skills.length > 0 ?
                                  item.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="skill-tag"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                  :
                                  <p>No Skills Found</p>
                              }
                            </div>
                            <h4>Missing Skills</h4>
                            <div className="skills-box">
                              {
                                item.missingSkills.length > 0 ?
                                  item.missingSkills.map((skill, index) => (
                                    <span key={index} className="missing-tag">
                                      {skill}
                                    </span>
                                  ))
                                  :
                                  <p>No Missing Skills</p>
                              }
                            </div>
                            <h4>Learning Recommendations</h4>
                            <div className="skills-box">
                              {
                                item.learningPath &&
                                item.learningPath.length > 0 ?
                                  item.learningPath.map((learn, index) => (
                                    <span
                                      key={index}
                                      className="learning-tag"
                                    >
                                      📘 {learn}
                                    </span>
                                  ))
                                  :
                                  <p>No Recommendation Available</p>
                              }
                            </div>
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    </div>
 );
};
export default History;