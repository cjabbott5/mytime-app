// src/components/MemoryPortal/NavigationSidebar.jsx
import React from 'react';

const NavigationSidebar = ({ steps, currentStep, onStepSelect }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md w-48">
      <h4 className="text-lg font-semibold mb-2">Session Navigation</h4>
      <ul className="space-y-1">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`cursor-pointer px-2 py-1 rounded ${
              index === currentStep ? 'bg-my-pink text-black' : 'hover:bg-gray-700'
            }`}
            onClick={() => onStepSelect(index)}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationSidebar;
