import { useState } from "react";
import RecruiterSidebar from "../components/RecruiterSidebar";
import { searchCandidates } from "../services/recruiterService";
import "../css/CandidateSearch.css";

const CandidateSearch = () => {
  const [searchSkill, setSearchSkill] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleSearch = async () => {
    if (!searchSkill.trim()) {
      return;
    }

    try {
      const data = await searchCandidates(searchSkill);
      setCandidates(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="candidate-page">
      <RecruiterSidebar />
      <div className="candidate-content">
        <h1>Candidate Search</h1>
        <p>Search students based on skills and ATS score.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Skill (React, Java, Python...)"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="candidate-results">
          {candidates.length === 0 ? (
            <>
              <h2>No Candidates Found</h2>
              <p>Search a skill to view matching students.</p>
            </>
          ) : (
            candidates.map((candidate) => (
              <div key={candidate._id} className="candidate-card">
                <h3>{candidate.userEmail}</h3>
                <p>
                  <strong>ATS Score:</strong> {candidate.atsScore}%
                </p>
                <p>
                  <strong>Recommended Role:</strong> {candidate.role}
                </p>
                <p>
                  <strong>Skills:</strong> {candidate.skills.join(", ")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;