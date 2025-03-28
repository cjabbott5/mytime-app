import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import GuidedPortalPage from './pages/GuidedPortalPage';
import Onboarding from './pages/Onboarding';
import MyMemoryCenter from './pages/MyMemoryCenter';
import MyTimeline from './pages/MyTimeline';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
import { MemoryProvider } from './context/MemoryContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-500 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={user ? <Navigate to="/profile" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/profile" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/profile" replace /> : <Register />}
      />

      {/* Protected Routes */}
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserDataProvider>
          <MemoryProvider>
            <AppRoutes />
          </MemoryProvider>
        </UserDataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
