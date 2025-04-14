// client/src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Make sure this is correct path to firebase.js
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Keep track of loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);  // Set the user data
      setAuthLoading(false);  // Done loading
    });

    // Clean up the listener when component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
