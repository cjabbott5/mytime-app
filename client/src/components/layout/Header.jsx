import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profilePic from '@/assets/profile.png';
import loopLogo from '@/assets/loop-logo-large2.png';
import { logout } from '@/config/firebase';
import { useTheme } from '@/context/ThemeContext';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    whoiam: false,
    memory: false,
    vision: false,
    provider: false,
    reflection: false,
  });

  const { selectedTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleAndNavigate = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setMenuOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* LEFT: Logo */}
      <Link to="/dashboard">
        <img src={loopLogo} alt="Loop Logo" className="h-14 w-auto object-contain" />
      </Link>

      {/* CENTER: Ground Me */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/ground-me">
          <button className="bg-accent-dark text-white text-xl font-semibold px-9 py-3 rounded-full hover:bg-theme transition-all shadow-md">
            Ground Me
          </button>
        </Link>
      </div>

      {/* RIGHT: Profile Button + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full border-2 border-accent overflow-hidden hover:scale-105 transition"
        >
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 bg-white border border-card shadow-xl rounded-lg p-4 z-50 w-64 text-body font-semibold space-y-3">
            <SectionGroup
              label="Who I Am"
              section="whoiam"
              isOpen={openSections.whoiam}
              toggle={() => toggleAndNavigate('whoiam')}
              mainLink="/who-i-am"
              links={[
                { to: '/who-i-am/profile', label: 'Profile' },
                { to: '/who-i-am/identity', label: 'Identity Prompt' },
                { to: '/who-i-am/onboarding', label: 'Onboarding' },
              ]}
            />

            <SectionGroup
              label="Memory Center"
              section="memory"
              isOpen={openSections.memory}
              toggle={() => toggleAndNavigate('memory')}
              mainLink="/where-ive-been"
              links={[
                { to: '/where-ive-been/memory-center', label: 'My Memories' },
                { to: '/where-ive-been/reflection-prompts', label: 'Reflection Prompts' },
              ]}
            />

            <SectionGroup
              label="Vision & Planning"
              section="vision"
              isOpen={openSections.vision}
              toggle={() => toggleAndNavigate('vision')}
              mainLink="/where-im-going"
              links={[
                { to: '/where-im-going/dream-prompt', label: 'Dream Prompt' },
                { to: '/where-im-going/goal-vision-board', label: 'Goal / Vision Board' },
              ]}
            />

            <SectionGroup
              label="Provider Loop"
              section="provider"
              isOpen={openSections.provider}
              toggle={() => toggleAndNavigate('provider')}
              mainLink="/provider-loop"
              links={[
                { to: '/provider-loop/dashboard', label: 'Provider Dashboard' },
                { to: '/provider-loop/settings', label: 'Settings' },
              ]}
            />

            <SectionGroup
              label="Reflection Space"
              section="reflection"
              isOpen={openSections.reflection}
              toggle={() => toggleAndNavigate('reflection')}
              mainLink="/reflection"
              links={[
                { to: '/reflection/library', label: 'Library' },
                { to: '/reflection/daily', label: 'Daily Reflection' },
              ]}
            />

            <div className="border-t border-card pt-3 mt-3 space-y-2">
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-accent-dark"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full hover:text-accent-dark"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function SectionGroup({ label, section, isOpen, toggle, links, mainLink }) {
  return (
    <div>
      <div className="flex justify-between items-center border-b border-card pb-1 mb-1">
        <Link
          to={mainLink}
          className="block text-left hover:text-accent-dark font-semibold"
        >
          {label}
        </Link>
        <button
          onClick={toggle}
          className="text-accent-dark hover:text-theme focus:outline-none"
          aria-label={`Toggle ${label}`}
        >
          {isOpen ? <FiMinus /> : <FiPlus />}
        </button>
      </div>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-1 text-sm">
          {links.map(({ to, label }) => (
            <Link to={to} key={label} className="block hover:text-accent-dark">
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
