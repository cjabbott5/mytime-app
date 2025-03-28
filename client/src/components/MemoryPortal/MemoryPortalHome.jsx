import React, { useState, useEffect } from 'react';
import DailyCheckin from './DailyCheckin';
import LifeStageSelection from './LifeStageSelection';
import EmotionalCategorySelection from './EmotionalCategorySelection';
import MemoryEntry from './MemoryEntry';
import ReflectionStep from './ReflectionStep';
import FinalConfirmation from './FinalConfirmation';
import { useMemory } from '../../context/MemoryContext';
import GuidedJourney from './GuidedJourney';
import ChildhoodProfileBuilder from './Childhood/ChildhoodProfileBuilder'; // ✅ NEW

const affirmations = [
  "You are safe here.",
  "One memory at a time.",
  "Your story matters.",
  "You are not alone.",
  "Healing is a journey.",
  "We're proud of you."
];

const MemoryPortalHome = () => {
  const [checkinDone, setCheckinDone] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [selection, setSelection] = useState(null); // 'lifeStage' or 'emotional'
  const [selectedStage, setSelectedStage] = useState(null);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const [profileData, setProfileData] = useState(null); // ✅ stores GuidedJourney responses

  const { currentStep, setCurrentStep } = useMemory();

  useEffect(() => {
    setFadeIn(true);
    const interval = setInterval(() => {
      setCurrentAffirmationIndex((prev) => (prev + 1) % affirmations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Advance to memory entry after guided journey
  useEffect(() => {
    if (journeyComplete) {
      setCurrentStep(2);
    }
  }, [journeyComplete, setCurrentStep]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      {/* Floating Affirmation */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-medium z-20 animate-fade float-slow pointer-events-none select-none">
        {affirmations[currentAffirmationIndex]}
      </div>

      {/* Main Card */}
      <div
        className={`w-full max-w-5xl h-fit bg-white/90 rounded-2xl shadow-xl p-10 md:p-16 backdrop-blur-md transition-opacity duration-1000 z-10 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-rose-700 mb-4 text-center">
          Welcome to Your Memory Portal
        </h1>
        <p className="text-gray-700 text-lg md:text-xl text-center mb-10">
          This space is safe, calming, and here to help you piece together your personal life story.
        </p>

        {/* Step 0: Daily Check-In */}
        {!checkinDone ? (
          <DailyCheckin onComplete={() => setCheckinDone(true)} />
        ) : (
          <>
            {/* Step 1: Choose how to begin */}
            {currentStep === 0 && (
              <div className="mt-6 text-center">
                <h2 className="text-xl md:text-2xl text-rose-700 mb-6">
                  How would you like to start your memory journey today?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelection('lifeStage');
                      setCurrentStep(1);
                    }}
                    className="bg-rose-500 text-white px-5 py-3 rounded shadow hover:bg-rose-600 transition"
                  >
                    By Life Stage
                  </button>
                  <button
                    onClick={() => {
                      setSelection('emotional');
                      setCurrentStep(1);
                    }}
                    className="bg-rose-500 text-white px-5 py-3 rounded shadow hover:bg-rose-600 transition"
                  >
                    By Emotional Category
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Life Stage Selection */}
            {currentStep === 1 && selection === 'lifeStage' && !selectedStage && (
              <LifeStageSelection setSelectedStage={setSelectedStage} />
            )}

            {/* Step 2B: Guided Journey by Stage */}
            {currentStep === 1 && selection === 'lifeStage' && selectedStage && (
              <GuidedJourney
                stage={selectedStage}
                onComplete={(responses) => {
                  setProfileData(responses);        // ✅ Save journey responses
                  setJourneyComplete(true);         // ✅ Move to next step
                }}
              />
            )}

            {/* Step 2: Emotional Category path */}
            {currentStep === 1 && selection === 'emotional' && (
              <EmotionalCategorySelection />
            )}

            {/* Step 3: Show profile summary after Guided Journey */}
            {currentStep === 2 && profileData && (
              <ChildhoodProfileBuilder responses={profileData} />
            )}

            {/* Step 4: Memory Entry */}
            {currentStep === 2 && !profileData && <MemoryEntry />}

            {/* Step 5: Reflection */}
            {currentStep === 3 && <ReflectionStep />}

            {/* Step 6: Final Confirmation */}
            {currentStep === 4 && <FinalConfirmation />}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryPortalHome;
