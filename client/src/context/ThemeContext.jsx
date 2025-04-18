import { createContext, useContext, useEffect, useState } from "react";
import themeConfig from "@/config/themeConfig";
import { useUserData } from "@/context/UserDataContext"; // 👈 must exist!

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { userData, updateUserData } = useUserData(); // 👈 from your Firebase layer

  // Initial state from localStorage OR default
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored && themeConfig[stored] ? stored : "blue";
  });

  // 🧠 Pull Firebase theme if logged in + valid
  useEffect(() => {
    if (userData?.theme && themeConfig[userData.theme]) {
      setSelectedTheme(userData.theme);
    }
  }, [userData]);

  // 🎨 Apply theme to <html> + persist to localStorage + Firestore
  useEffect(() => {
    const currentTheme = themeConfig[selectedTheme];
    if (!currentTheme) return;

    // Apply CSS vars
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    localStorage.setItem("theme", selectedTheme);

    // 🔄 Sync with Firebase if needed
    if (userData && userData.theme !== selectedTheme) {
      updateUserData({ theme: selectedTheme });
    }
  }, [selectedTheme, userData]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
