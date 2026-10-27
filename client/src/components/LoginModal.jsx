import "../css/LoginModal.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onClose }) => {
    const navigate = useNavigate();

    if (!show) return null;
    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <FaLock className="modal-icon" />
                <h2>Login Required</h2>
                <p>Please login first to continue.</p>
                <div className="modal-buttons">

                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
export default LoginModal;