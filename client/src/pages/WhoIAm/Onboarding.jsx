import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserData } from '@/context/UserDataContext';
import onboardingCategories from '@/data/onboardingCategories';
import onboardingFieldMap from '@/utils/mapOnboardingToProfile';
import { saveUserData, checkAuthState } from '@/config/firebase';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

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
      navigate('/who-i-am/profile');
    } catch (err) {
      console.error('❌ Failed to save onboarding profile:', err);
    }
  };

  return (
    <LayoutWrapper hideHeader>
      <div className="min-h-screen w-full px-6 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-none">
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
              <p className="text-center text-accent italic">Loading summary...</p>
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
    </LayoutWrapper>
  );  
}
