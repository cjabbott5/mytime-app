// src/components/MemoryPortal/FinalConfirmation.jsx
import React from 'react';
import { useMemory } from '../../context/MemoryContext';

const FinalConfirmation = () => {
  const { setCurrentStep } = useMemory();

  const handleFinish = () => {
    // Reset or route somewhere else if needed
    setCurrentStep(0); // Reset back to the beginning
    console.log('Reflection complete 🚀');
  };

  return (
    <div className="text-center space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-rose-700">You're all done!</h2>
      <p className="text-gray-700 text-lg">
        Thank you for taking the time to reflect. Your memory has been recorded, and your feelings matter. 🧠✨
      </p>
      <button
        onClick={handleFinish}
        className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full shadow transition"
      >
        Reflect on Another Memory
      </button>
    </div>
  );
};

export default FinalConfirmation;
