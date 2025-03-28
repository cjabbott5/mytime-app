import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages (Absolute imports for cleaner Vite resolution)
import Landing from '/src/pages/Landing';
import Register from '/src/pages/Register';
import Login from '/src/pages/Login';
import Profile from '/src/pages/Profile';
import Onboarding from '/src/pages/Onboarding';
import MyMemoryCenter from '/src/pages/MyMemoryCenter';
import MyTimeline from '/src/pages/MyTimeline';
import GuidedPortalPage from '/src/pages/GuidedPortalPage';

// Contexts & Layout
import { AuthProvider, useAuth } from '/src/context/AuthContext';
import { UserDataProvider } from '/src/context/UserDataContext';
import ProtectedRoute from '/src/components/ProtectedRoute';
import Layout from '/src/components/Layout';

// 🔐 Routes gated behind auth
const AppRoutes = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 text-rose-500 font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={user ? <Navigate to="/profile" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/profile" replace /> : <Register />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Layout>
              <Onboarding />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <MyMemoryCenter />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <Layout>
              <MyTimeline />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 🧠 NEW Guided Portal Route */}
      <Route
        path="/guided-portal"
        element={
          <ProtectedRoute>
            <Layout>
              <GuidedPortalPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// 🧬 App wrapper with Auth + Data Providers
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserDataProvider>
          <AppRoutes />
        </UserDataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
