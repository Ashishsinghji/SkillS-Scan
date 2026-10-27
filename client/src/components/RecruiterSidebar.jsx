import "../css/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTachometerAlt, FaUsers, FaFileAlt, FaUserTie, FaSignOutAlt, FaBrain, FaClipboardList } from "react-icons/fa";

const RecruiterSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <FaBrain className="logo-icon" />
        <h2>SkillScan</h2>
      </div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruiter-dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/candidate-search" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaUsers />
            <span>Candidates</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/job-posting" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaFileAlt />
            <span>Post Job</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruiter-applicants" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaClipboardList />
            <span>Applicants</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruiter-jobs" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaFileAlt />
            <span>My Jobs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recruiter-profile" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaUserTie />
            <span>Profile</span>
          </NavLink>
        </li>
        <li onClick={handleLogout}>
          <div className="sidebar-link">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RecruiterSidebar;