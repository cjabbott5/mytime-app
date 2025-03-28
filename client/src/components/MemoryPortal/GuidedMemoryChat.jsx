// src/components/MemoryPortal/GuidedMemoryChat.jsx

import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import LifeStageSelection from './LifeStageSelection';
import EmotionalCategorySelection from './EmotionalCategorySelection';
import MemoryEntry from './MemoryEntry';
import ReflectionStep from './ReflectionStep';
import FinalConfirmation from './FinalConfirmation';
import StepLayout from './StepLayout';
import CalmCorner from './CalmCorner';

const GuidedMemoryChat = () => {
  const [step, setStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState(null); // 'lifeStage' or 'emotional'

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepLayout>
            <WelcomeScreen onSelectPath={(path) => {
              setSelectedPath(path);
              nextStep();
            }} />
          </StepLayout>
        );

      case 1:
        if (selectedPath === 'lifeStage') {
          return (
            <StepLayout>
              <LifeStageSelection onNext={nextStep} />
            </StepLayout>
          );
        }
        if (selectedPath === 'emotional') {
          return (
            <StepLayout>
              <EmotionalCategorySelection onNext={nextStep} />
            </StepLayout>
          );
        }
        return null;

      case 2:
        return (
          <StepLayout>
            <MemoryEntry onNext={nextStep} onBack={prevStep} />
          </StepLayout>
        );

      case 3:
        return (
          <StepLayout>
            <ReflectionStep onNext={nextStep} onBack={prevStep} />
          </StepLayout>
        );

      case 4:
        return (
          <StepLayout>
            <FinalConfirmation />
          </StepLayout>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      <CalmCorner />
      {renderStep()}
    </div>
  );
};

export default GuidedMemoryChat;
