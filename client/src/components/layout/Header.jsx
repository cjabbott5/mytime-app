import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profilePic from '@/assets/profile.png';
import { logout } from '@/config/firebase';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    whoiam: false,
    whereivebeen: false,
    whereimgoing: false,
  });

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
      {/* LEFT: My Time Logo */}
      <Link to="/dashboard">
        <h1 className="text-primary font-extrabold text-2xl tracking-wide">
          MY TIME
        </h1>
      </Link>

      {/* CENTER: Ground Me */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/auth">
          <button className="bg-primary text-white font-bold px-5 py-2 rounded-full hover:bg-secondary transition-all shadow-md">
            Ground Me
          </button>
        </Link>
      </div>

      {/* RIGHT: Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full border-2 border-pink-600 overflow-hidden"
        >
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 bg-white border border-pink-200 shadow-xl rounded-lg p-4 z-50 w-64 text-pink-600 font-semibold space-y-3">
            {/* WHO I AM */}
            <div>
              <Link
                to="/who-i-am"
                onClick={() => toggleAndNavigate('whoiam')}
                className="w-full block text-left hover:text-pink-800 border-b border-pink-300 pb-1 mb-1"
              >
                Who I Am
              </Link>
              {openSections.whoiam && (
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <Link to="/who-i-am/profile" className="block hover:text-pink-800">Profile</Link>
                  <Link to="/who-i-am/identity" className="block hover:text-pink-800">Identity Prompt</Link>
                  <Link to="/who-i-am/onboarding" className="block hover:text-pink-800">Onboarding</Link>
                </div>
              )}
            </div>

            {/* WHERE I'VE BEEN */}
            <div>
              <Link
                to="/where-ive-been"
                onClick={() => toggleAndNavigate('whereivebeen')}
                className="w-full block text-left hover:text-pink-800 border-b border-pink-300 pb-1 mb-1"
              >
                Where I've Been
              </Link>
              {openSections.whereivebeen && (
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <Link to="/where-ive-been/memory-center" className="block hover:text-pink-800">Memory Center</Link>
                  <Link to="/where-ive-been/reflection-prompts" className="block hover:text-pink-800">Reflection Prompts</Link>
                </div>
              )}
            </div>

            {/* WHERE I'M GOING */}
            <div>
              <Link
                to="/where-im-going"
                onClick={() => toggleAndNavigate('whereimgoing')}
                className="w-full block text-left hover:text-pink-800 border-b border-pink-300 pb-1 mb-1"
              >
                Where I'm Going
              </Link>
              {openSections.whereimgoing && (
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <Link to="/where-im-going/dream-prompt" className="block hover:text-pink-800">Dream Prompt</Link>
                  <Link to="/where-im-going/goal-vision-board" className="block hover:text-pink-800">Goal / Vision Board</Link>
                </div>
              )}
            </div>

            {/* SETTINGS & LOGOUT */}
            <div className="border-t border-pink-300 pt-3 mt-3 space-y-2">
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-pink-800"
              >
                ⚙️ Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full hover:text-pink-800"
              >
                🚪 Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
