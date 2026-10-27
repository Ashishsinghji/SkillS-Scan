import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaUniversity, FaGraduationCap, FaLinkedin, FaGithub, FaGlobe, FaSave } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { getStudentProfile, updateStudentProfile } from "../services/studentService";
import "../css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = sessionStorage.getItem("currentUser");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      const currentUser = JSON.parse(storedUser);

      if (currentUser.role !== "student") {
        navigate("/login");
        return;
      }

      try {
        const data = await getStudentProfile(currentUser.email);
        setProfile(data);
        setSkillsInput((data.skills || []).join(", "));
      } catch (err) {
        console.log("Error loading student profile:", err);
        setError(err.response?.data?.message || "Unable to load your profile.");
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const skills = skillsInput
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);

      const data = await updateStudentProfile(profile.email, {
        fullName: profile.fullName,
        phone: profile.phone,
        location: profile.location,
        university: profile.university,
        degree: profile.degree,
        graduationYear: profile.graduationYear,
        skills,
        linkedin: profile.linkedin,
        github: profile.github,
        portfolio: profile.portfolio,
        bio: profile.bio
      });

      setProfile(data.student);
      setSkillsInput((data.student.skills || []).join(", "));

      sessionStorage.setItem("currentUser", JSON.stringify(data.student));
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.log("Error updating student profile:", err);
      setError(err.response?.data?.message || "Failed to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return null;
  }

  const firstLetter = profile.fullName?.trim()?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="student-profile-page">
      <Sidebar />

      <main className="student-profile-content">
        <section className="student-profile-title">
          <span className="student-profile-eyebrow">STUDENT PROFILE</span>
          <h1>Build Your Career Profile</h1>
          <p>
            Keep your education, skills, and professional information updated to make your profile stronger for career opportunities.
          </p>
        </section>

        <section className="student-profile-card">
          <div className="student-profile-hero">
            <div className="student-avatar">{firstLetter}</div>

            <div>
              <h2>{profile.fullName || "Student"}</h2>
              <p>{profile.degree || "Student / Aspiring Professional"}</p>
              <span>{profile.university || "Add your university or college"}</span>
            </div>
          </div>

          <div className="student-profile-body">
            {message && <div className="profile-success">{message}</div>}
            {error && <div className="profile-error">{error}</div>}

            <div className="profile-section-block">
              <div className="profile-section-heading">
                <h3>Personal Information</h3>
                <p>Basic details about you.</p>
              </div>

              <div className="student-profile-grid">
                <div className="student-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="student-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    readOnly
                    className="student-readonly"
                  />
                  <small>Your registered email cannot be changed.</small>
                </div>

                <div className="student-field">
                  <label>
                    <FaPhone />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone || ""}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="student-field">
                  <label>
                    <FaMapMarkerAlt />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location || ""}
                    onChange={handleChange}
                    placeholder="e.g. Bokaro, Jharkhand"
                  />
                </div>
              </div>
            </div>

            <div className="profile-section-block">
              <div className="profile-section-heading">
                <h3>Education</h3>
                <p>Add your academic information.</p>
              </div>

              <div className="student-profile-grid">
                <div className="student-field">
                  <label>
                    <FaUniversity />
                    University / College
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={profile.university || ""}
                    onChange={handleChange}
                    placeholder="Enter your university or college"
                  />
                </div>

                <div className="student-field">
                  <label>
                    <FaGraduationCap />
                    Degree / Course
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={profile.degree || ""}
                    onChange={handleChange}
                    placeholder="e.g. BCA, B.Tech, MCA"
                  />
                </div>

                <div className="student-field">
                  <label>Graduation Year</label>
                  <input
                    type="number"
                    name="graduationYear"
                    min="2020"
                    max="2100"
                    value={profile.graduationYear || ""}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                  />
                </div>
              </div>
            </div>

            <div className="profile-section-block">
              <div className="profile-section-heading">
                <h3>Skills & Career Summary</h3>
                <p>Highlight your strengths, skills, and career goals.</p>
              </div>

              <div className="student-profile-grid single-column">
                <div className="student-field">
                  <label>Skills</label>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="React, JavaScript, Python, SQL"
                  />
                  <small>Separate skills with commas.</small>
                </div>

                <div className="student-field">
                  <label>About You</label>
                  <textarea
                    name="bio"
                    rows="5"
                    maxLength="500"
                    value={profile.bio || ""}
                    onChange={handleChange}
                    placeholder="Write a short introduction about yourself, your interests, strengths, projects, and career goals."
                  />
                </div>
              </div>
            </div>

            <div className="profile-section-block last-section">
              <div className="profile-section-heading">
                <h3>Professional Links</h3>
                <p>Let recruiters explore your professional work.</p>
              </div>

              <div className="student-profile-grid">
                <div className="student-field">
                  <label>
                    <FaLinkedin />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin || ""}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/yourname"
                  />
                </div>

                <div className="student-field">
                  <label>
                    <FaGithub />
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profile.github || ""}
                    onChange={handleChange}
                    placeholder="https://github.com/yourname"
                  />
                </div>

                <div className="student-field full-width-field">
                  <label>
                    <FaGlobe />
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={profile.portfolio || ""}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="student-profile-footer">
            <button
              className="student-save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              <FaSave />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;