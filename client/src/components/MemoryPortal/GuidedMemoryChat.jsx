import React, { useState, useEffect } from 'react';
import WelcomeScreen from './GuidedPortalWelcomeScreen';
import LifeStageSelection from './LifeStageSelection';
import EmotionalCategorySelection from './EmotionalCategorySelection';
import MemoryEntry from './MemoryEntry';
import ReflectionStep from './ReflectionStep';
import FinalConfirmation from './FinalConfirmation';
import StepLayout from './StepLayout';

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
    category: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  // path will be either "lifeStage" or "emotional" based on user choice
  const path =
    selectedPath && typeof selectedPath === 'object' ? selectedPath.path : null;
  const category =
    selectedPath && typeof selectedPath === 'object' ? selectedPath.category : null;

  // Update memoryDraft if user picks a category
  useEffect(() => {
    if (category) {
      setMemoryDraft((prev) => ({ ...prev, category }));
    }
  }, [category]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepLayout>
            <WelcomeScreen
              onContinue={(data) => {
                setSelectedPath(data); // e.g. { path: 'emotional' } or { path: 'lifeStage' }
                nextStep();
              }}
              onCancel={() => {
                // handle "Not Today, Take Me Back"
                // e.g. navigate away or reset state
              }}
            />
          </StepLayout>
        );

      case 1:
        return (
          <StepLayout>
            {path === 'lifeStage' && (
              <LifeStageSelection
                setMemoryDraft={setMemoryDraft}
                onNext={nextStep}
              />
            )}
            {path === 'emotional' && (
              <EmotionalCategorySelection
                category={category}
                setMemoryDraft={setMemoryDraft}
                onNext={nextStep}
              />
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
      {renderStep()}
    </div>
  );
};

export default GuidedMemoryChat;
