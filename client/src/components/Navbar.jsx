import logoIcon from "../assets/logos/logo-icon.png";
import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(
        sessionStorage.getItem("currentUser")
        
    );

    const isLoggedIn = !!currentUser;
    const dashboardPath = currentUser?.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard";
    const handleLogout = () => {
        sessionStorage.removeItem("currentUser");
         sessionStorage.removeItem("isLoggedIn");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="custom-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand-section">
                    <img src={logoIcon} alt="SkillScan Logo" className="navbar-logo" />
                    <span className="navbar-title">SkillScan</span>
                </Link>

                <ul className="navbar-links">
                    <li><a href="#">Home</a></li>
                    {
                        !isLoggedIn &&
                        <>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#workflow">Workflow</a></li>
                            <li><a href="#footer">About</a></li>
                        </>
                    }

                    {
                        isLoggedIn ?
                            <>
                                <li>
                                    <Link to={dashboardPath}> Dashboard </Link>
                                </li>
                                <li>
                                    <Link to={ currentUser?.role === "recruiter" ? "/recruiter-profile" : "/profile" } >
                                        Profile
                                    </Link>
                                </li>
                                <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                            </>
                            :
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;