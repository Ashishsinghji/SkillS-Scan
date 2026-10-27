import { Link } from "react-router-dom";
import { FaBrain, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {

    return (
        <footer id="footer" className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <div className="footer-logo">
                        <FaBrain />
                        <h2>SkillScan</h2>
                    </div>
                    <p>
                        Smart Resume Analysis Platform that helps students improve ATS scores, discover career opportunities and prepare for interviews.
                    </p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p><FaEnvelope /> support@skillscan.com</p>
                    <div className="footer-social">
                        <FaGithub />
                        <FaLinkedin />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 SkillScan. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;