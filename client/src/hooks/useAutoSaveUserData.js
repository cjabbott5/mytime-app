import { useEffect } from 'react';
import { checkAuthState, saveUserData } from '@/config/firebase';

export default function useAutoSaveUserData(userData) {
  useEffect(() => {
    const saveData = async () => {
      try {
        const user = await checkAuthState();
        if (user && userData) {
          await saveUserData(user.uid, userData);
          console.log('✅ Autosaved userData:', userData);
        }
      } catch (err) {
        console.error('❌ Failed to autosave user data:', err);
      }
    };

    if (userData && Object.keys(userData).length > 0) {
      saveData();
    }
  }, [userData]);
}
