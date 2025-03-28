import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

// Export the hook FIRST
export const useUserData = () => useContext(UserDataContext);

// Create the context
const UserDataContext = createContext();

// Provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  // Load user data from Firestore
  const loadUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
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
  };

  // Update Firestore and local state with the new user data
  const updateUserData = async (updatedFields) => {
    if (!currentUser) return;

    const docRef = doc(db, 'users', currentUser.uid);
    const newUserData = {
      ...userData,
      ...updatedFields,
    };

    await setDoc(docRef, newUserData);
    setUserData(newUserData);
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadUserData(user.uid);
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
