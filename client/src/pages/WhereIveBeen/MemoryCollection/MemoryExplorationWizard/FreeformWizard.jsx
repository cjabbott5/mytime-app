import { useState } from 'react';

const steps = [
  { id: 'memoryTitle', prompt: 'Give this memory a title (or leave it untitled)' },
  { id: 'whatHappened', prompt: 'What happened? What do you remember most clearly?' },
  { id: 'howYouFelt', prompt: 'How did you feel during and after this experience?' },
  { id: 'yourResponse', prompt: 'How did you respond or cope at the time?' },
  { id: 'whatYouNeed', prompt: 'What do you wish you had received or known?' },
  { id: 'reflection', prompt: 'Is there anything you’re taking away from reflecting on this?' },
];

export default function FreeformWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});

  const step = steps[currentStep];

  const handleChange = (e) => {
    setResponses({ ...responses, [step.id]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('✨ Saved memory:', responses);
      // TODO: Save memory to storage
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen px-6 py-12 text-pink-800 flex flex-col items-center text-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-2 text-pink-600">Step {currentStep + 1} of {steps.length}</h2>
        <p className="text-lg mb-6">{step.prompt}</p>

        <textarea
          className="w-full min-h-[180px] p-4 border border-pink-200 rounded-lg shadow"
          placeholder="Write your response here..."
          value={responses[step.id] || ''}
          onChange={handleChange}
        />

        <div className="mt-6 flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-pink-700 rounded-full hover:bg-gray-300 transition"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
