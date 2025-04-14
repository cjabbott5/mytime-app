/**
 * Wrapper to update onboarding data using your context's updateUserData
 * You can optionally call this from the final step or keep it for organization.
 */

import { useUserData } from '../context/UserDataContext';

/**
 * Hook-friendly version of onboarding submit (React-friendly).
 * Call this from inside a component.
 */
export const useHandleOnboardingSubmit = () => {
  const { updateUserData } = useUserData();

  const submit = async (flattenedData) => {
    try {
      await updateUserData(flattenedData);
      console.log('✅ Onboarding data saved via updateUserData.');
    } catch (error) {
      console.error('🔥 Error during onboarding submit:', error);
      throw error;
    }
  };

  return submit;
};
