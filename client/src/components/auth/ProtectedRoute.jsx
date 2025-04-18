import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import themeConfig from '@/config/themeConfig';
import { useTheme } from '@/context/ThemeContext';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const { selectedTheme } = useTheme(); // ✅ use global theme

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return null; // Optionally show a loading spinner

  if (!user) return <Navigate to="/auth/login" />;

  const currentTheme = themeConfig[selectedTheme];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${currentTheme.bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ProtectedRoute;
