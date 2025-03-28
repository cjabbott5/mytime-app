// src/pages/Onboarding.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import onboardingCategories from '../data/onboardingCategories';
import OnboardingStep from '../components/OnboardingStep';
import OnboardingSummary from '../components/OnboardingSummary';
import { useUserData } from '../context/UserDataContext';
import onboardingFieldMap from '../utils/mapOnboardingToProfile';

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const { userData, updateUserData } = useUserData();

  const isSummaryStep = stepIndex === onboardingCategories.length;
  const currentStep = onboardingCategories[stepIndex];

  const handleNext = (stepData) => {
    const flatData = {};
    const [stepId, values] = Object.entries(stepData)[0];

    if (typeof values === 'object' && !Array.isArray(values)) {
      Object.entries(values).forEach(([fieldId, value]) => {
        const mappedKey = onboardingFieldMap[fieldId] || fieldId;
        flatData[mappedKey] = value;
      });
    } else {
      const mappedKey = onboardingFieldMap[stepId] || stepId;
      flatData[mappedKey] = values;
    }

    updateUserData(flatData);

    if (stepIndex < onboardingCategories.length) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    try {
      console.log('✅ Final user data:', userData);
      navigate('/profile');
    } catch (err) {
      console.error('❌ Failed to finish onboarding:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        {isSummaryStep ? (
          <OnboardingSummary onBack={handleBack} onFinish={handleFinish} />
        ) : (
          <OnboardingStep
            step={currentStep}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={stepIndex === 0}
            isLast={stepIndex === onboardingCategories.length - 1}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
