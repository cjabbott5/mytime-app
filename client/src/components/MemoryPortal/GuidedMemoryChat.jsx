// GuidedMemoryChat.jsx
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
  const [selectedPath, setSelectedPath] = useState(null);

  const [memoryDraft, setMemoryDraft] = useState({
    title: '',
    description: '',
    date: new Date().toISOString(),
    image: '',
    mood: '',
    tags: [],
    reflection: '',
    isPrivate: false,
  });

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
        return (
          <StepLayout>
            {selectedPath === 'lifeStage' && (
              <LifeStageSelection setMemoryDraft={setMemoryDraft} onNext={nextStep} />
            )}
            {selectedPath === 'emotional' && (
              <EmotionalCategorySelection setMemoryDraft={setMemoryDraft} onNext={nextStep} />
            )}
          </StepLayout>
        );
      case 2:
        return (
          <StepLayout>
            <MemoryEntry
              memoryDraft={memoryDraft}
              setMemoryDraft={setMemoryDraft}
              onNext={nextStep}
              onBack={prevStep}
            />
          </StepLayout>
        );
      case 3:
        return (
          <StepLayout>
            <ReflectionStep
              memoryDraft={memoryDraft}
              setMemoryDraft={setMemoryDraft}
              onNext={nextStep}
              onBack={prevStep}
            />
          </StepLayout>
        );
      case 4:
        return (
          <StepLayout>
            <FinalConfirmation memoryDraft={memoryDraft} />
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
