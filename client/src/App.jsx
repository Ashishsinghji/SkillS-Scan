import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import History from "./pages/History";
import InterviewPrep from "./pages/InterviewPrep";
import Profile from "./pages/Profile";
import CareerInsights from "./pages/CareerInsights";
import PostJob from "./pages/PostJob";
import CandidateSearch from "./pages/CandidateSearch";
import RecruiterProfile from "./pages/RecruiterProfile";
import RecruiterJobs from "./pages/RecruiterJobs";
import JobPortal from "./pages/JobPortal";
import MyApplications from "./pages/MyApplications";
import RecruiterApplicants from "./pages/RecruiterApplicants";

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />

        <Route path="/history" element={<History />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/career-insights" element={<CareerInsights />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/job-posting" element={<PostJob />} />        
        <Route path="/candidate-search" element={<CandidateSearch />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/recruiter-jobs" element={<RecruiterJobs />} />
        <Route path="/recruiter-applicants" element={<RecruiterApplicants />} />

        <Route path="/job-portal" element={<JobPortal />} />
        <Route path="/my-applications" element={<MyApplications />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;