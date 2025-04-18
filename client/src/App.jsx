import { Routes, Route, Navigate } from 'react-router-dom';
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
import GroundMe from './components/sections/groundme/GroundMeMain.jsx'; // ✅ GroundMe main screen
import BreathingGuide from './components/sections/groundme/BreathingGuide.jsx'; // ✅ Guided breathing
import BreathingSelector from '@/components/sections/groundme/BreathingSelector';
import BoxBreathing from '@/components/sections/groundme/breathing/BoxBreathing';
import FourSevenEight from '@/components/sections/groundme/breathing/FourSevenEight';
import MindfulBreathing from '@/components/sections/groundme/breathing/MindfulBreathing';
import PacedBreathing from '@/components/sections/groundme/breathing/PacedBreathing';

// 🔸 Sub-Pages (Protected)
import Profile from './pages/WhoIAm/Profile';
import IdentityPrompt from './pages/WhoIAm/IdentityPrompt';
import Onboarding from './pages/WhoIAm/Onboarding';
import DreamPrompt from './pages/WhereImGoing/DreamPrompt';
import GoalVisionBoard from './pages/WhereImGoing/GoalVisionBoard';

// 🧠 WHERE I'VE BEEN ROUTES
import { whereIveBeenRoutes } from './pages/WhereIveBeen/routes.jsx';

export default function App() {
  return (
    <Routes>
      {/* 🏠 Public Landing Pages */}
      <Route
        path="/"
        element={
          <LayoutWrapper hideHeader>
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
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

      {/* 🛡 Protected Routes */}
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

    {/* 🧘 Ground Me main screen */}
  <Route
    path="/ground-me"
    element={
      <ProtectedRoute>
        <LayoutWrapper hideHeader>
          <GroundMe />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />

  {/* ✅ Individual breathing session pages */}
  <Route
    path="/ground-me/breathing/box"
    element={
      <ProtectedRoute>
        <LayoutWrapper hideHeader>
          <BoxBreathing />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />
  <Route
    path="/ground-me/breathing/four-seven-eight"
    element={
      <ProtectedRoute>
        <LayoutWrapper hideHeader>
          <FourSevenEight />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />
  <Route
    path="/ground-me/breathing/mindful"
    element={
      <ProtectedRoute>
        <LayoutWrapper hideHeader>
          <MindfulBreathing />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />
  <Route
    path="/ground-me/breathing/paced"
    element={
      <ProtectedRoute>
        <LayoutWrapper hideHeader>
          <PacedBreathing />
        </LayoutWrapper>
      </ProtectedRoute>
    }
  />
<Route
  path="/ground-me/breathing"
  element={
    <ProtectedRoute>
      <LayoutWrapper hideHeader>
        <BreathingSelector />
      </LayoutWrapper>
    </ProtectedRoute>
  }
/>

      {/* 👤 Who I Am */}
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

      {/* 🌸 Where I’ve Been */}
      {whereIveBeenRoutes}

      {/* 🚀 Where I’m Going */}
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

      {/* ⚙️ Settings */}
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
