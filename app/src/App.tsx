import { useEffect } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { store } from './store/store'; // Make sure this is the correct path
import JobSubmissionForm from "./pages/JobSubmissionForm";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from './pages/AboutUsPage';
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/job_seeker/DashboardPage";
import PosterDashboard from "./pages/job_poster/PosterDashboard";
import JobListPage from "./pages/job_seeker/JobListPage";
import AddJobPage from "./pages/job_poster/AddJobPage";
import PostingHistoryPage from "./pages/job_poster/PostingHistoryPage";
import JobApplications from "./pages/job_seeker/JobApplications";
import ProfilePage from "./pages/job_seeker/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import JobDetailPage from "./pages/job_seeker/jobDetailPage";
import ViewApplicantsPage from "./pages/job_poster/ViewApplicantsPage";
import { register } from './serviceWorkerRegistration';

const AppWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/about") {
      document.body.className = "landing-body"; // Apply landing page styles
    } else {
      document.body.className = "default-body"; // Apply default styles for other pages
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/auth" element={<AuthPage />} /> {/* Public page for login/register */}
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/PosterDashboard" element={<ProtectedRoute><PosterDashboard /></ProtectedRoute>} />
      <Route path="/job-applications" element={<ProtectedRoute><JobApplications /></ProtectedRoute>} />
      <Route path="/apply/:jobID" element={<ProtectedRoute><JobSubmissionForm /></ProtectedRoute>} />
      <Route path="/job-list" element={<ProtectedRoute><JobListPage /></ProtectedRoute>} />
      <Route path="/add-job" element={<ProtectedRoute><AddJobPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/posting-history" element={<ProtectedRoute><PostingHistoryPage /></ProtectedRoute>} />
      <Route path="/job-details/:id" element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>} />
      <Route path="/view-applicants/:jobID" element={<ProtectedRoute><ViewApplicantsPage /></ProtectedRoute>}/>
    </Routes>
  );
};

const App = () => {
  // Register the service worker when the app is loaded
  useEffect(() => {
    register(); // Call register function to register service worker
  }, []);

  return (
    <Router>
      <Provider store={store}> {/* Wrap the entire Router component with the Redux Provider */}
        <AppWrapper />
      </Provider>
    </Router>
  );
};

export default App;


