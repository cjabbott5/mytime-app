import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserData } from '@/context/UserDataContext';
import onboardingCategories from '@/data/onboardingCategories';
import onboardingFieldMap from '@/utils/mapOnboardingToProfile';

import { saveUserData, checkAuthState } from '@/config/firebase';

import OnboardingStep from '@/components/sections/onboarding/OnboardingStep';
import OnboardingSummary from '@/components/sections/onboarding/OnboardingSummary';
import OnboardingProgress from '@/components/sections/onboarding/OnboardingProgress';
import useAutoSaveUserData from '@/hooks/useAutoSaveUserData';

export default function Onboarding() {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();
  useAutoSaveUserData(userData);

  const isSummaryStep = stepIndex === onboardingCategories.length;
  const currentStep = onboardingCategories[stepIndex];

  const handleNext = (stepData = {}) => {
    console.log('[🧠 handleNext received]', stepData);

    const updatedData = {
      ...userData,
      ...Object.entries(stepData).reduce((acc, [fieldId, value]) => {
        const mappedKey = onboardingFieldMap[fieldId] || fieldId;
        acc[mappedKey] = value;
        return acc;
      }, {}),
    };

    updateUserData(updatedData);
    setStepIndex((prev) => prev + 1);
  };

  const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleFinish = async () => {
    try {
      const user = await checkAuthState();
      const flatProfile = Object.entries(userData || {}).reduce((acc, [key, val]) => {
        acc[onboardingFieldMap[key] || key] = val;
        return acc;
      }, {});

      await saveUserData(user.uid, flatProfile);
      console.log('✅ Final profile saved to Firestore:', flatProfile);
      navigate('/who-i-am/profile');
    } catch (err) {
      console.error('❌ Failed to save onboarding profile:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full space-y-6">
        {!isSummaryStep && (
          <OnboardingProgress
            currentStep={stepIndex}
            totalSteps={onboardingCategories.length}
            title={currentStep?.title}
          />
        )}

        {isSummaryStep ? (
          userData ? (
            <OnboardingSummary onBack={handleBack} onFinish={handleFinish} />
          ) : (
            <p className="text-center text-gray-500">Loading summary...</p>
          )
        ) : (
          <OnboardingStep
            step={currentStep}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={stepIndex === 0}
            isLast={stepIndex === onboardingCategories.length - 1}
            formData={userData}
            updateUserData={updateUserData}
          />
        )}
      </div>
    </div>
  );
}
