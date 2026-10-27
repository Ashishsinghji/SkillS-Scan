import "../css/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaFileAlt, FaHistory, FaBriefcase, FaQuestionCircle, FaUserCircle, FaSignOutAlt, FaBrain, FaSuitcase, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
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
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume-analysis" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaFileAlt />
            <span>Resume Analysis</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/job-portal" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaSuitcase />
            <span>Job Portal</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-applications" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaClipboardList />
            <span>My Applications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaHistory />
            <span>History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/career-insights" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaBriefcase />
            <span>Career Insights</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/interview-prep" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaQuestionCircle />
            <span>Interview Prep</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaUserCircle />
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

export default Sidebar;