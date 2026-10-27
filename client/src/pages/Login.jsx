import "../css/Login.css";
import { loginUser } from "../services/authService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoIcon from "../assets/logos/logo-icon.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authMessage, setAuthMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  };

  const handleLogin = async () => {
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await loginUser({ email, password });
      sessionStorage.setItem("currentUser", JSON.stringify(response.user));
      sessionStorage.setItem("isLoggedIn", "true");

      if (response.user.role === "student") {
        navigate("/dashboard");
      } else if (response.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      }
    } catch (error) {
      setAuthMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <img src={logoIcon} alt="SkillScan" className="auth-logo" />
          <h1>Welcome Back</h1>
          <p>Login to continue using SkillScan.</p>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Login</h2>

            {location.state?.success && (
              <p className="success-text">{location.state.success}</p>
            )}

            {authMessage && (
              <div className="auth-message">{authMessage}</div>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                if (value && !validateEmail(value)) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "Please enter a valid email address."
                  }));
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    email: ""
                  }));
                }
              }}
            />

            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);

                  if (value && !validatePassword(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      password: "Password must contain uppercase, lowercase, number and special character."
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      password: ""
                    }));
                  }
                }}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}

            <button onClick={handleLogin}>Login</button>

            <p className="auth-link">
              Don't have an account?
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;