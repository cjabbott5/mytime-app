import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LayoutWrapper from "./components/layout/LayoutWrapper";

// 🔹 Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// 🔹 Public Pages
import HeroSection from './pages/Home/HeroSection';
import AboutJourney from './pages/Home/AboutJourney';

// 🔹 Top-Level Protected Pages
import Dashboard from './pages/Dashboard';
import WhoIAm from './pages/WhoIAm';
import WhereImGoing from './pages/WhereImGoing';
import Settings from './pages/Settings';

// 🔸 Sub-Pages (Protected)
import Profile from './pages/WhoIAm/Profile';
import IdentityPrompt from './pages/WhoIAm/IdentityPrompt';
import Onboarding from './pages/WhoIAm/Onboarding';
import DreamPrompt from './pages/WhereImGoing/DreamPrompt';
import GoalVisionBoard from './pages/WhereImGoing/GoalVisionBoard';

// 🧠 ROUTE GROUPS
import { whereIveBeenRoutes } from './pages/WhereIveBeen/routes.jsx';

export default function App() {
  return (
    <Routes>
      {/* 🏠 Public Landing Page */}
      <Route
        path="/"
        element={
          <LayoutWrapper>
            <HeroSection />
          </LayoutWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <LayoutWrapper>
            <AboutJourney />
          </LayoutWrapper>
        }
      />

      {/* 🔐 Auth Pages */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <Dashboard />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/who-i-am"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <WhoIAm />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/who-i-am/onboarding"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <Onboarding />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/who-i-am/profile"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <Profile />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/who-i-am/identity"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <IdentityPrompt />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />

      {/* 🌸 WHERE I'VE BEEN ROUTES */}
      {whereIveBeenRoutes}

      {/* 🚀 WHERE I'M GOING */}
      <Route
        path="/where-im-going"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <WhereImGoing />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/where-im-going/dream-prompt"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <DreamPrompt />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/where-im-going/goal-vision-board"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <GoalVisionBoard />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />

      {/* 🛠 SETTINGS */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <Settings />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
