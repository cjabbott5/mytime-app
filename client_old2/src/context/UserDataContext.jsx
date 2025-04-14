import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

const UserDataContext = createContext();

// Export hook first
export const useUserData = () => useContext(UserDataContext);

// Provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        // Initialize user data if not found
        const initialData = {
          name: '',
          pronouns: '',
          age: '',
          genderIdentity: '',
          culturalIdentity: '',
          spirituality: '',
          livingSituation: '',
          mentalHealth: '',
          copingTools: [],
          traits: [],
          moods: [],
          avatar: '',
          goals: [],
          frustrations: [],
          emotionalDepth: '',
          promptFrequency: '',
          timeOfDay: '',
          languageTone: '',
        };

        await setDoc(docRef, initialData);
        setUserData(initialData);
      }
    } catch (error) {
      console.error('🔥 Firestore error in loadUserData:', error);
    }
  };

  const updateUserData = async (updatedFields) => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      const newUserData = {
        ...userData,
        ...updatedFields,
      };

      await setDoc(docRef, newUserData);
      setUserData(newUserData);
    } catch (error) {
      console.error('🔥 Failed to update user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
  
      if (user) {
        console.log("✅ AUTH UID:", user.uid); // 👈 Add this
        loadUserData(user.uid);
      } else {
        console.warn("⚠️ No authenticated user.");
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
