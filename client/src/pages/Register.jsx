import "../css/Login.css";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logoIcon from "../assets/logos/logo-icon.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleRegister = async () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Use 8+ characters with uppercase, lowercase, number and special character.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    const users =
      JSON.parse(sessionStorage.getItem("users")) || [];

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (emailExists) {
      newErrors.email =
        "This email is already registered.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await registerUser({
        fullName: name,
        email,
        password,
        role,
        recruiterName: role === "recruiter" ? name : "",
        companyName: role === "recruiter" ? name : ""
      });

      navigate("/login", {
        state: {
          success: "Registration successful. Please login."
        }
      });
    } catch (error) {
      setErrors({
        email:
          error.response?.data?.message ||
          "Registration failed"
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <img
            src={logoIcon}
            alt="SkillScan"
            className="auth-logo"
          />
          <h1>Create Account</h1>
          <p>
            Join SkillScan and start your journey.
          </p>
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h2>Register</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                const formattedName = value.replace(
                  /\b\w/g,
                  (char) => char.toUpperCase()
                );
                setName(formattedName);
              }}
            />

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onBlur={() => {
                if (email && !validateEmail(email)) {
                  setErrors((prev) => ({
                    ...prev,
                    email:
                      "Please enter a valid email address."
                  }));
                }
              }}
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);

                  if (
                    value &&
                    !validatePassword(value)
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      password:
                        "Password must contain uppercase, lowercase, number and special character."
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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <p className="password-info">
              Use 8+ characters with uppercase,
              lowercase, number and special character.
            </p>

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

            <div className="password-field">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);

                  if (
                    password &&
                    value &&
                    password !== value
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword:
                        "Passwords do not match."
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: ""
                    }));
                  }
                }}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword}
              </p>
            )}

            <div className="role-field">
              <label>Register As</label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <button onClick={handleRegister}>
              Create Account
            </button>

            <p className="auth-link">
              Already have an account?
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;