import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import PostLoginLanding from './pages/PostLoginLanding'; // Added post-login landing page
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import MyMemoryCenter from './pages/MyMemoryCenter';
import MyTimeline from './pages/MyTimeline';
import ClientSettings from './pages/ClientSettings';
import GroundMePage from './pages/GroundMePage';
import MemoryJourneyPage from './pages/MemoryJourneyPage';
import ChapterPromptsPage from './pages/ChapterPromptsPage';
import SafeMomentsPage from './pages/chapter/SafeMomentsPage';

// Layout & Route Guards
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';

const App = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();  // Hook to programmatically navigate

  useEffect(() => {
    if (user && !window.location.pathname.includes("/post-login-landing")) {
      navigate('/post-login-landing');  // Redirect to post-login landing page if logged in
    }
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-500 text-lg font-semibold">
        Initializing auth...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      {!user && (
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* Authenticated Routes */}
      {user && (
        <>
          {/* Post-login landing page, only accessible once logged in */}
          <Route path="/post-login-landing" element={<PostLoginLanding />} />

          {/* Authenticated Routes (all protected routes) */}
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><Layout><Onboarding /></Layout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><MyMemoryCenter /></Layout></ProtectedRoute>} />
          <Route path="/timeline" element={<ProtectedRoute><Layout><MyTimeline /></Layout></ProtectedRoute>} />
          <Route path="/guided-portal" element={<ProtectedRoute><Layout><MemoryJourneyPage /></Layout></ProtectedRoute>} />
          <Route path="/chapter/:chapterId" element={<ProtectedRoute><Layout><ChapterPromptsPage /></Layout></ProtectedRoute>} />
          <Route path="/chapter/safeMoments" element={<ProtectedRoute><Layout><SafeMomentsPage /></Layout></ProtectedRoute>} />
          <Route path="/ground-me" element={<ProtectedRoute><Layout><GroundMePage /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Layout><ClientSettings /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
