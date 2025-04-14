import React, { useState } from 'react';
import Step0Intro from './Step0Intro';
import Step1Topics from './Step1Topics';
import Step2WhatTheyDid from './Step2WhatTheyDid';
import Step3HowIFelt from './Step3HowIFelt';
import Step4HowIResponded from './Step4HowIResponded';
import Step5Summary from './Step5Summary';
import { useMemory } from '@/context/MemoryContext';

const ReflectionWizard = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    topics: [],
    whatTheyDid: [],
    howIFelt: [],
    howIResponded: []
  });

  const { addMemory } = useMemory();

  const handleUpdate = (category, updatedList) => {
    setResponses(prev => ({ ...prev, [category]: updatedList }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSave = (memory) => {
    addMemory(memory);
    alert('Memory saved successfully!');
    setStep(0); // Reset to intro after save
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0Intro onNext={handleNext} />;
      case 1:
        return <Step1Topics data={responses.topics} onChange={(list) => handleUpdate('topics', list)} />;
      case 2:
        return <Step2WhatTheyDid data={responses.whatTheyDid} onChange={(list) => handleUpdate('whatTheyDid', list)} />;
      case 3:
        return <Step3HowIFelt data={responses.howIFelt} onChange={(list) => handleUpdate('howIFelt', list)} />;
      case 4:
        return <Step4HowIResponded data={responses.howIResponded} onChange={(list) => handleUpdate('howIResponded', list)} />;
      case 5:
        return <Step5Summary responses={responses} onSave={handleSave} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 text-gray-800"
      style={{ backgroundImage: "url('/src/assets/cloud-bg.jpg')" }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-md p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-pink-700">Guided Reflection</h1>
          <p className="text-sm text-gray-600">
            You're in a safe space to reflect. You can move at your own pace.
          </p>
        </header>

        {renderStep()}

        {step > 0 && step < 5 && (
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button onClick={handleBack} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full shadow">
                Back
              </button>
            ) : <div />}
            <button onClick={handleNext} className="px-4 py-2 bg-pink-600 text-white rounded-full shadow">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionWizard;
