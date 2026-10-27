import { useEffect, useState } from "react";
import RecruiterSidebar from "../components/RecruiterSidebar";
import { getRecruiterJobs, deleteJob, updateJob } from "../services/jobService";
import "../css/RecruiterJobs.css";

const RecruiterJobs = () => {
  const recruiter = JSON.parse(sessionStorage.getItem("currentUser"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getRecruiterJobs(recruiter.email);
      setJobs(data);
    } catch (error) {
      console.log("Failed to load recruiter jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteJob(jobId);
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
      alert("Job deleted successfully.");
    } catch (error) {
      console.log("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  const handleEdit = async (job) => {
    const updatedTitle = prompt(
      "Enter new job title:",
      job.jobTitle
    );

    if (updatedTitle === null) {
      return;
    }

    try {
      await updateJob(job._id, {
        ...job,
        jobTitle: updatedTitle
      });

      alert("Job updated successfully!");
      await loadJobs();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Failed to update job"
      );
    }
  };

  return (
    <div className="recruiter-jobs-page">
      <RecruiterSidebar />

      <main className="recruiter-jobs-content">
        <h1 className="recruiter-jobs-title">
          My Posted Jobs
        </h1>

        {jobs.length === 0 ? (
          <div className="recruiter-jobs-empty">
            <h2>No jobs posted yet.</h2>
            <p>Your posted jobs will appear here.</p>
          </div>
        ) : (
          <div className="recruiter-jobs-grid">
            {jobs.map((job) => (
              <div
                className="recruiter-job-card"
                key={job._id}
              >
                <h2 className="recruiter-job-title">
                  {job.jobTitle}
                </h2>

                <h4 className="recruiter-job-company">
                  {job.companyName}
                </h4>

                <div className="recruiter-job-details">
                  <p>
                    <strong>Location:</strong>{" "}
                    {job.location}
                  </p>

                  <p>
                    <strong>Experience:</strong>{" "}
                    {job.experience}
                  </p>

                  <p>
                    <strong>Salary:</strong>{" "}
                    {job.salary}
                  </p>

                  <p>
                    <strong>Skills:</strong>{" "}
                    {job.requiredSkills.join(", ")}
                  </p>
                </div>

                <div className="recruiter-job-actions">
                  <button
                    className="recruiter-job-edit-btn"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </button>

                  <button
                    className="recruiter-job-delete-btn"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecruiterJobs;