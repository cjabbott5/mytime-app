import { createContext, useContext, useEffect, useState } from "react";
import themeConfig from "@/config/themeConfig";
import { useUserData } from "@/context/UserDataContext";
import { useRef } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { userData, updateUserData } = useUserData();

  const didInitTheme = useRef(false);

  // Selected theme name (from localStorage or fallback to "blue")
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored && themeConfig[stored] ? stored : "blue";
  });

  // Custom theme colors (if selectedTheme === 'custom')
  const [customTheme, setCustomTheme] = useState(() => {
    const stored = localStorage.getItem("customTheme");
    return stored ? JSON.parse(stored) : null;
  });

  // Load user data from Firebase (but DON'T trigger effects!)
  useEffect(() => {
    // ✅ Prevent re-running this logic after initial load
    if (didInitTheme.current) return;
  
    let updated = false;
  
    if (
      userData?.theme &&
      themeConfig[userData.theme] &&
      userData.theme !== selectedTheme
    ) {
      setSelectedTheme(userData.theme);
      updated = true;
    }
  
    if (
      userData?.customTheme &&
      JSON.stringify(userData.customTheme) !== JSON.stringify(customTheme)
    ) {
      setCustomTheme(userData.customTheme);
      updated = true;
    }
  
    // ✅ Set the lock AFTER we potentially call state setters
    if (updated) {
      didInitTheme.current = true;
    }
  }, [userData]);
  
  

  // 💅 Apply theme colors to :root
  useEffect(() => {
    const current =
      selectedTheme === "custom" && customTheme
        ? customTheme
        : themeConfig[selectedTheme];

    if (!current) return;

    // Inject all CSS variables
    Object.entries(current.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Save to localStorage
    localStorage.setItem("theme", selectedTheme);
    if (selectedTheme === "custom" && customTheme) {
      localStorage.setItem("customTheme", JSON.stringify(customTheme));
    }
  }, [selectedTheme, customTheme]);

  // 🔄 Sync Firebase (split to avoid infinite loops)
  useEffect(() => {
    if (!userData) return;

    const needsThemeUpdate = userData.theme !== selectedTheme;
    const needsCustomUpdate =
      selectedTheme === "custom" &&
      JSON.stringify(userData.customTheme) !== JSON.stringify(customTheme);

    if (needsThemeUpdate || needsCustomUpdate) {
      const updates = {};
      if (needsThemeUpdate) updates.theme = selectedTheme;
      if (needsCustomUpdate) updates.customTheme = customTheme;

      updateUserData(updates);
    }
  }, [selectedTheme, customTheme]); // 🚫 no userData in deps!
  
  return (
    <ThemeContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        customTheme,
        setCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
