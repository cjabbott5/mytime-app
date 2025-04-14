import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuthState, getUserData } from '@/config/firebase';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUserData = (newData) => {
    setUserData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 🔁 1. Try localStorage first
        const savedData = localStorage.getItem('onboardingData');
        if (savedData) {
          setUserData(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        // 🔁 2. If no local data, fetch from Firebase
        const user = await checkAuthState();
        const firebaseData = await getUserData(user.uid);

        if (firebaseData) {
          setUserData(firebaseData);
        } else {
          // ✅ Fallback if no Firebase data
          setUserData({
            name: 'Taylor Moon',
            pronouns: 'she/they',
            genderIdentity: ['Nonbinary'],
            culturalIdentity: ['Latina'],
            spirituality: ['Spiritual but not religious'],
            mentalHealth: ['Anxiety', 'PTSD'],
            copingTools: ['Music', 'Exercise / Movement', 'Therapist'],
            avatar: '',
            goals: ['Feel grounded', 'Remember who I am', 'Rebuild routines'],
            frustrations: ['Sleep inconsistency', 'Emotional overwhelm'],
            moods: ['Calm', 'Hopeful'],
            supportSystem: ['Friends', 'Therapist', 'Pet / animal'],
            currentReflection: 'I am still figuring things out — and that’s okay.',
            personalitySpectrum: {
              introvertExtrovert: 40,
              analyticalCreative: 75,
              loyalFickle: 90,
              passiveActive: 60,
              structuredFlexible: 55,
              groundedDreamy: 70,
            },
            moodLog: [],
          });
        }
      } catch (error) {
        console.warn("⚠️ Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 💾 Auto-save userData to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('onboardingData', JSON.stringify(userData));
    }
  }, [userData, loading]);

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {!loading && children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
