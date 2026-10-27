import fullLogo from "../assets/logos/logo-full.png";
import "../css/SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={fullLogo} alt="SkillScan Logo" className="splash-logo" />
      <p className="splash-text">Smart Resume Analyzer</p>
      <div className="loader-container">
        <div className="loader-bar"></div>
      </div>
    </div>
  );
};

export default SplashScreen;