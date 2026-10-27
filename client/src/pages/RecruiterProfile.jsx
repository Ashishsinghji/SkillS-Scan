import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "../components/RecruiterSidebar";

import {
  getRecruiterProfile,
  updateRecruiterProfile
} from "../services/recruiterService";

import "../css/RecruiterProfile.css";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const recruiter = JSON.parse(
    sessionStorage.getItem("currentUser")
  );

  const [profile, setProfile] = useState({
    companyName: recruiter?.companyName || "",
    recruiterName: recruiter?.recruiterName || "",
    designation: recruiter?.designation || "",
    companyLocation: recruiter?.companyLocation || "",
    companyWebsite: recruiter?.companyWebsite || "",
    email: recruiter?.email || ""
  });

  useEffect(() => {

    if (!recruiter) {
      navigate("/login");
      return;
    }

    if (recruiter.role !== "recruiter") {
      navigate("/login");
      return;
    }

    loadProfile();

  }, [navigate]);

  const loadProfile = async () => {

    try {

      const data = await getRecruiterProfile(
        recruiter.email
      );

      setProfile({
        companyName: data.companyName || "",
        recruiterName: data.recruiterName || "",
        designation: data.designation || "",
        companyLocation: data.companyLocation || "",
        companyWebsite: data.companyWebsite || "",
        email: data.email || ""
      });

    } catch (error) {

      console.log(
        "Error loading recruiter profile:",
        error
      );

    }

  };

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = async () => {
    try {
      const data = await updateRecruiterProfile(
        recruiter.email,
        {
          recruiterName: profile.recruiterName,
          companyName: profile.companyName,
          designation: profile.designation,
          companyLocation: profile.companyLocation,
          companyWebsite: profile.companyWebsite
        }
      );

      // Keep the complete logged-in user information
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(data.recruiter)
      );

      setProfile({
        recruiterName: data.recruiter.recruiterName,
        companyName: data.recruiter.companyName,
        designation: data.recruiter.designation,
        companyLocation: data.recruiter.companyLocation,
        companyWebsite: data.recruiter.companyWebsite,
        email: data.recruiter.email
      });

      alert("Profile updated successfully.");

    } catch (error) {
      console.log(
        "Error updating profile:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update profile."
      );
    }
  };

  return (

    <div className="recruiter-profile-page">

      <RecruiterSidebar />

      <div className="recruiter-profile-content">

        <div className="profile-title-section">

          <h1>Recruiter Profile</h1>

          <p className="profile-subtitle">
            Manage your professional and company information.
          </p>

        </div>

        <div className="profile-card">

          <div className="profile-header">

            <div className="profile-avatar">

              {profile.recruiterName
                ? profile.recruiterName
                  .charAt(0)
                  .toUpperCase()
                : "R"}

            </div>

            <div className="profile-header-info">

              <h2>
                {profile.recruiterName || "Recruiter"}
              </h2>

              <p className="profile-designation">
                {profile.designation ||
                  "Recruitment Professional"}
              </p>

              <p className="profile-company">
                {profile.companyName || "Company"}
              </p>

            </div>

          </div>

          <div className="profile-section">

            <div className="section-heading">

              <h3>Personal Information</h3>

              <p>
                Your professional recruiter details.
              </p>

            </div>

            <div className="profile-form">

              <div className="form-group">

                <label>Recruiter Name</label>

                <input
                  type="text"
                  name="recruiterName"
                  value={profile.recruiterName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

              </div>

              <div className="form-group">

                <label>Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  placeholder="e.g. Talent Acquisition Specialist"
                />

              </div>

              <div className="form-group full-width">

                <label>Email</label>

                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="readonly-input"
                />

                <span className="input-hint">
                  Your registered email cannot be changed.
                </span>

              </div>

            </div>

          </div>

          <div className="profile-section">

            <div className="section-heading">

              <h3>Company Information</h3>

              <p>
                Information that represents your organization.
              </p>

            </div>

            <div className="profile-form">

              <div className="form-group">

                <label>Company Name</label>

                <input
                  type="text"
                  name="companyName"
                  value={profile.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />

              </div>

              <div className="form-group">

                <label>Company Location</label>

                <input
                  type="text"
                  name="companyLocation"
                  value={profile.companyLocation}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru, India"
                />

              </div>

              <div className="form-group full-width">

                <label>Company Website</label>

                <input
                  type="url"
                  name="companyWebsite"
                  value={profile.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                />

              </div>

            </div>

          </div>

          <div className="profile-footer">

            <button
              className="save-profile-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default RecruiterProfile;