import { createContext, useContext, useState } from "react";

// Create context for authentication
const AuthContext = createContext();

// AuthProvider wraps the app and provides auth context values
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to set user data
  const login = (userData) => setUser(userData);

  // Logout function to clear user data
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
