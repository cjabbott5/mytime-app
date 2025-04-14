import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useUserData } from "../context/UserDataContext";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      unsub();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-rose-100/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center z-50 relative">
      <Link
        to="/"
        className="text-rose-700 font-bold text-xl tracking-tight"
      >
        MyTime
      </Link>

      {isAuthenticated ? (
        <div className="relative z-50" ref={dropdownRef}>
          <button
            className="flex items-center gap-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={userData?.avatar || "https://www.gravatar.com/avatar/?d=mp&f=y"}
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-rose-400 shadow"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg py-2 w-44 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/onboarding"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                onClick={() => setDropdownOpen(false)}
              >
                Onboarding
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                onClick={() => setDropdownOpen(false)}
              >
                My Memory Center
              </Link>
              <Link
                to="/guided-portal"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                onClick={() => setDropdownOpen(false)}
              >
                Guided Portal
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-rose-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <nav className="space-x-4 text-sm text-rose-700">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
