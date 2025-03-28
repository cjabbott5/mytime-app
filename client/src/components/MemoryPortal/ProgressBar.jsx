// src/components/MemoryPortal/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-700 rounded h-2 mt-4">
      <div
        className="bg-my-pink h-2 rounded"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
