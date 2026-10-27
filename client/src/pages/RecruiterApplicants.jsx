
import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus,
  scheduleInterview
} from "../services/applicationService";
import { getStudentProfile } from "../services/studentService";
import { getLatestAnalysis } from "../services/historyService";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPhone,
  FaMapMarkerAlt,
  FaUniversity,
  FaGraduationCap
} from "react-icons/fa";
import RecruiterSidebar from "../components/RecruiterSidebar";
import "../css/RecruiterApplicants.css";

const RecruiterApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [interviewMode, setInterviewMode] = useState("Online");

  const [reviewApplication, setReviewApplication] = useState(null);
  const [reviewProfile, setReviewProfile] = useState(null);
  const [reviewAnalysis, setReviewAnalysis] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const recruiter = JSON.parse(
    sessionStorage.getItem("currentUser")
  );

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getRecruiterApplications(
        recruiter.email
      );

      setApplications(data);
    } catch (error) {
      console.error(
        "Failed to load applications:",
        error
      );
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  const openReview = async (application) => {
    setReviewApplication(application);
    setReviewProfile(null);
    setReviewAnalysis(null);
    setReviewError("");
    setReviewLoading(true);

    try {
      const [profile, analysis] = await Promise.all([
        getStudentProfile(application.studentEmail),
        getLatestAnalysis(application.studentEmail)
      ]);

      setReviewProfile(profile);
      setReviewAnalysis(analysis);
    } catch (error) {
      console.error(
        "Failed to load candidate review data:",
        error
      );

      setReviewError(
        error.response?.data?.message ||
          "Unable to load complete candidate information."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const closeReview = () => {
    setReviewApplication(null);
    setReviewProfile(null);
    setReviewAnalysis(null);
    setReviewError("");
    setReviewLoading(false);
  };

  const keepUnderReview = async () => {
    if (!reviewApplication) {
      return;
    }

    try {
      await updateApplicationStatus(
        reviewApplication._id,
        "Under Review"
      );

      closeReview();
      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to keep application under review:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  const shortlistCandidate = async () => {
    if (!reviewApplication) {
      return;
    }

    try {
      await updateApplicationStatus(
        reviewApplication._id,
        "Shortlisted"
      );

      closeReview();
      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to shortlist candidate:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to shortlist candidate."
      );
    }
  };

  const rejectCandidate = async () => {
    if (!reviewApplication) {
      return;
    }

    try {
      await updateApplicationStatus(
        reviewApplication._id,
        "Rejected"
      );

      closeReview();
      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to reject candidate:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to reject candidate."
      );
    }
  };

  const openInterviewModal = (application) => {
    if (!application.jobId) {
      alert(
        "Job associated with this application is no longer available."
      );

      return;
    }

    if (application.status !== "Shortlisted") {
      alert(
        "Only shortlisted candidates can be scheduled for an interview."
      );

      return;
    }

    setSelectedApplication(application);
    setInterviewMode("Online");
  };

  const closeInterviewModal = () => {
    setSelectedApplication(null);
    setInterviewMode("Online");
  };

  const handleScheduleInterview = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const date = formData.get("date");
      const time = formData.get("time");
      const mode = formData.get("mode");
      const location = formData.get("location") || "";
      const meetingLink =
        formData.get("meetingLink") || "";

      if (!date || !time || !mode) {
        alert(
          "Please fill all required interview details."
        );

        return;
      }

      if (mode === "Online" && !meetingLink) {
        alert(
          "Please enter the Google Meet link."
        );

        return;
      }

      if (mode === "Offline" && !location) {
        alert(
          "Please enter the interview location."
        );

        return;
      }

      const interviewData = {
        date,
        time,
        mode,
        location:
          mode === "Offline"
            ? location
            : "",
        meetingLink:
          mode === "Online"
            ? meetingLink
            : ""
      };

      await scheduleInterview(
        selectedApplication._id,
        interviewData
      );

      alert(
        "Interview scheduled successfully."
      );

      closeInterviewModal();
      await loadApplications();
    } catch (error) {
      console.error(
        "Failed to schedule interview:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to schedule interview."
      );
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case "Applied":
        return "New application received. Recruiter has not reviewed it yet.";

      case "Under Review":
        return "Recruiter is evaluating the candidate's application.";

      case "Shortlisted":
        return "Candidate has been selected for the interview stage.";

      case "Interview Scheduled":
        return "Interview has been scheduled.";

      case "Interview Completed":
        return "Interview has been completed. Recruiter can now make the final decision.";

      case "Selected":
        return "Candidate has been selected for the position.";

      case "Rejected":
        return "This application has been rejected.";

      default:
        return "";
    }
  };

  return (
    <div className="recruiter-page">
      <RecruiterSidebar />

      <div className="recruiter-content">
        <h1>Job Applicants</h1>

        <p>
          Review applications, shortlist suitable
          candidates and manage interviews.
        </p>

        <div className="applicant-grid">
          {applications.length === 0 ? (
            <div className="empty-box">
              <h2>No Applicants Yet</h2>

              <p>
                Students who apply for your jobs
                will appear here.
              </p>
            </div>
          ) : (
            applications.map((application) => {
              const jobAvailable =
                Boolean(application.jobId);

              const jobTitle =
                application.jobTitle ||
                application.jobId?.jobTitle ||
                "Job information unavailable";

              const companyName =
                application.companyName ||
                application.jobId?.companyName ||
                "Company information unavailable";

              const location =
                application.location ||
                application.jobId?.location ||
                "Location unavailable";

              return (
                <div
                  className="applicant-card"
                  key={application._id}
                >
                  <h2>
                    {application.studentName}
                  </h2>

                  <p>
                    <strong>Email:</strong>{" "}
                    {application.studentEmail}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {application.role ||
                      "Not Available"}
                  </p>

                  <p>
                    <strong>ATS Score:</strong>{" "}
                    {application.atsScore ?? 0}%
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {application.status}
                  </p>

                  <div className="status-description">
                    <strong>
                      What this means:
                    </strong>

                    <p>
                      {getStatusDescription(
                        application.status
                      )}
                    </p>
                  </div>

                  <div className="interview-job-info">
                    <p>
                      <strong>Job:</strong>{" "}
                      {jobTitle}
                    </p>

                    <p>
                      <strong>Company:</strong>{" "}
                      {companyName}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {location}
                    </p>
                  </div>

                  {!jobAvailable && (
                    <div className="job-unavailable">
                      Job associated with this
                      application is no longer
                      available.
                    </div>
                  )}

                  <div className="button-group">
                    {application.status ===
                      "Applied" && (
                      <>
                        <button
                          className="review-btn"
                          onClick={() =>
                            openReview(
                              application
                            )
                          }
                        >
                          Review Application
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            changeStatus(
                              application._id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {application.status ===
                      "Under Review" && (
                      <>
                        <button
                          className="shortlist-btn"
                          onClick={() =>
                            changeStatus(
                              application._id,
                              "Shortlisted"
                            )
                          }
                        >
                          Shortlist for Interview
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            changeStatus(
                              application._id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {application.status ===
                      "Shortlisted" &&
                      (jobAvailable ? (
                        <button
                          className="interview-btn"
                          onClick={() =>
                            openInterviewModal(
                              application
                            )
                          }
                        >
                          Schedule Interview
                        </button>
                      ) : (
                        <div className="job-unavailable">
                          Job no longer available
                        </div>
                      ))}

                    {application.status ===
                      "Interview Scheduled" && (
                      <button
                        className="complete-btn"
                        onClick={() =>
                          changeStatus(
                            application._id,
                            "Interview Completed"
                          )
                        }
                      >
                        Mark Interview Completed
                      </button>
                    )}

                    {application.status ===
                      "Interview Completed" && (
                      <>
                        <button
                          className="select-btn"
                          onClick={() =>
                            changeStatus(
                              application._id,
                              "Selected"
                            )
                          }
                        >
                          Select Candidate
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            changeStatus(
                              application._id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {application.status ===
                      "Selected" && (
                      <div className="selected-message">
                        Candidate Selected
                      </div>
                    )}

                    {application.status ===
                      "Rejected" && (
                      <div className="rejected-message">
                        Application Rejected
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {reviewApplication && (
        <div className="modal-overlay">
          <div className="review-modal">
            <div className="review-modal-header">
              <div>
                <span className="review-eyebrow">
                  CANDIDATE REVIEW
                </span>

                <h2>
                  Candidate Review
                </h2>

                <p>
                  Evaluate the candidate before
                  making a decision.
                </p>
              </div>

              <button
                type="button"
                className="review-close-btn"
                onClick={closeReview}
              >
                ×
              </button>
            </div>

            {reviewLoading ? (
              <div className="review-loading">
                Loading candidate information...
              </div>
            ) : (
              <>
                {reviewError && (
                  <div className="review-error">
                    {reviewError}
                  </div>
                )}

                <div className="review-top-grid">
                  <div className="review-panel candidate-panel">
                    <div className="review-avatar">
                      {(
                        reviewProfile?.fullName ||
                        reviewApplication.studentName ||
                        "S"
                      )
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {reviewProfile?.fullName ||
                          reviewApplication.studentName}
                      </h3>

                      <span>
                        {reviewProfile?.degree ||
                          reviewApplication.role ||
                          "Student"}
                      </span>

                      <p>
                        {reviewProfile?.email ||
                          reviewApplication.studentEmail}
                      </p>

                      <p>
                        <FaMapMarkerAlt />
                        {reviewProfile?.location ||
                          reviewApplication.location ||
                          "Location not provided"}
                      </p>

                      {reviewProfile?.phone && (
                        <p>
                          <FaPhone />
                          {reviewProfile.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="review-panel ats-panel">
                    <span className="review-panel-label">
                      ATS ANALYSIS
                    </span>

                    <div className="ats-score">
                      {reviewApplication.atsScore ??
                        reviewAnalysis?.atsScore ??
                        0}

                      <span>/100</span>
                    </div>

                    <div className="ats-progress">
                      <span
                        style={{
                          width: `${Math.min(
                            reviewApplication.atsScore ??
                              reviewAnalysis?.atsScore ??
                              0,
                            100
                          )}%`
                        }}
                      />
                    </div>

                    <p>
                      Role Match:{" "}
                      <strong>
                        {reviewAnalysis?.roleMatch ??
                          "Not available"}

                        {reviewAnalysis?.roleMatch !=
                          null && "%"}
                      </strong>
                    </p>

                    <p>
                      Recommended Role:{" "}
                      <strong>
                        {reviewAnalysis?.role ||
                          reviewApplication.role ||
                          "Not available"}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-section-title">
                    <span>
                      APPLIED POSITION
                    </span>
                  </div>

                  <div className="review-job-grid">
                    <div>
                      <label>
                        Job
                      </label>

                      <p>
                        {reviewApplication.jobTitle ||
                          reviewApplication.jobId?.jobTitle ||
                          "Job information unavailable"}
                      </p>
                    </div>

                    <div>
                      <label>
                        Company
                      </label>

                      <p>
                        {reviewApplication.companyName ||
                          reviewApplication.jobId?.companyName ||
                          "Company information unavailable"}
                      </p>
                    </div>

                    <div>
                      <label>
                        Location
                      </label>

                      <p>
                        {reviewApplication.location ||
                          reviewApplication.jobId?.location ||
                          "Location unavailable"}
                      </p>
                    </div>

                    <div>
                      <label>
                        Applied
                      </label>

                      <p>
                        {reviewApplication.createdAt
                          ? new Date(
                              reviewApplication.createdAt
                            ).toLocaleDateString()
                          : "Date unavailable"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="review-two-column">
                  <div className="review-section">
                    <div className="review-section-title">
                      <span>
                        SKILLS
                      </span>
                    </div>

                    <div className="review-skills">
                      {(
                        reviewAnalysis?.skills ||
                        reviewProfile?.skills ||
                        []
                      ).length > 0 ? (
                        (
                          reviewAnalysis?.skills ||
                          reviewProfile?.skills ||
                          []
                        ).map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="review-skill-tag"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p>
                          No skills available.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="review-section">
                    <div className="review-section-title">
                      <span>
                        EDUCATION
                      </span>
                    </div>

                    <div className="review-education">
                      <p>
                        <FaGraduationCap />
                        {reviewProfile?.degree ||
                          "Degree not provided"}
                      </p>

                      <p>
                        <FaUniversity />
                        {reviewProfile?.university ||
                          "University not provided"}
                      </p>

                      {reviewProfile?.graduationYear && (
                        <p>
                          Graduation:{" "}
                          {
                            reviewProfile.graduationYear
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-section-title">
                    <span>
                      ABOUT THE CANDIDATE
                    </span>
                  </div>

                  <p className="review-bio">
                    {reviewProfile?.bio ||
                      "The student has not added a career summary yet."}
                  </p>
                </div>

                <div className="review-section">
                  <div className="review-section-title">
                    <span>
                      PROFESSIONAL LINKS
                    </span>
                  </div>

                  <div className="review-links">
                    {reviewProfile?.linkedin && (
                      <a
                        href={reviewProfile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                        LinkedIn
                      </a>
                    )}

                    {reviewProfile?.github && (
                      <a
                        href={reviewProfile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}

                    {reviewProfile?.portfolio && (
                      <a
                        href={reviewProfile.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe />
                        Portfolio
                      </a>
                    )}

                    {!reviewProfile?.linkedin &&
                      !reviewProfile?.github &&
                      !reviewProfile?.portfolio && (
                      <p>
                        No professional links provided.
                      </p>
                    )}
                  </div>
                </div>

                <div className="review-decision">
                  <div>
                    <span>
                      RECRUITER DECISION
                    </span>

                    <p>
                      Choose how you want to move
                      this application forward.
                    </p>
                  </div>

                  <div className="review-decision-buttons">
                    <button
                      type="button"
                      className="review-keep-btn"
                      onClick={
                        keepUnderReview
                      }
                    >
                      Keep Under Review
                    </button>

                    <button
                      type="button"
                      className="review-shortlist-btn"
                      onClick={
                        shortlistCandidate
                      }
                    >
                      Shortlist for Interview
                    </button>

                    <button
                      type="button"
                      className="review-reject-btn"
                      onClick={
                        rejectCandidate
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {selectedApplication && (
        <div className="modal-overlay">
          <div className="schedule-modal">
            <h2>
              Schedule Interview
            </h2>

            <p>
              Candidate:{" "}
              <strong>
                {selectedApplication.studentName}
              </strong>
            </p>

            <div className="interview-job-info">
              <p>
                <strong>
                  Job:
                </strong>{" "}
                {selectedApplication.jobTitle ||
                  selectedApplication.jobId?.jobTitle ||
                  "Job information unavailable"}
              </p>

              <p>
                <strong>
                  Company:
                </strong>{" "}
                {selectedApplication.companyName ||
                  selectedApplication.jobId?.companyName ||
                  "Company information unavailable"}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {selectedApplication.location ||
                  selectedApplication.jobId?.location ||
                  "Location unavailable"}
              </p>
            </div>

            <form
              onSubmit={
                handleScheduleInterview
              }
            >
              <label htmlFor="interview-date">
                Interview Date
              </label>

              <input
                id="interview-date"
                type="date"
                name="date"
                required
              />

              <label htmlFor="interview-time">
                Interview Time
              </label>

              <input
                id="interview-time"
                type="time"
                name="time"
                required
              />

              <label htmlFor="interview-mode">
                Interview Mode
              </label>

              <select
                id="interview-mode"
                name="mode"
                value={interviewMode}
                onChange={(e) =>
                  setInterviewMode(
                    e.target.value
                  )
                }
              >
                <option value="Online">
                  Online
                </option>

                <option value="Offline">
                  Offline
                </option>
              </select>

              {interviewMode ===
                "Online" && (
                <>
                  <label htmlFor="meeting-link">
                    Google Meet Link
                  </label>

                  <input
                    id="meeting-link"
                    type="url"
                    name="meetingLink"
                    placeholder="https://meet.google.com/..."
                    required
                  />
                </>
              )}

              {interviewMode ===
                "Offline" && (
                <>
                  <label htmlFor="interview-location">
                    Interview Location
                  </label>

                  <input
                    id="interview-location"
                    type="text"
                    name="location"
                    placeholder="Office / Interview location"
                    required
                  />
                </>
              )}

              <div className="modal-buttons">
                <button
                  type="submit"
                  className="confirm-btn"
                >
                  Confirm Interview
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={
                    closeInterviewModal
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplicants;
