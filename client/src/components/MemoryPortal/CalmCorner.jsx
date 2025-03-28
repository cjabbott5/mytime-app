// src/components/MemoryPortal/CalmCorner.jsx
import React from 'react';

const CalmCorner = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-md mt-4 max-w-md text-center">
      <h3 className="text-lg font-semibold mb-2">Calm Corner</h3>
      <p className="mb-2">Take a deep breath and relax. Here are some grounding exercises:</p>
      <ul className="list-disc list-inside text-left mx-auto">
        <li>Deep Breathing: Inhale 4s, hold 4s, exhale 4s.</li>
        <li>Focus on a calming image or sound.</li>
        <li>Take a short break if needed.</li>
      </ul>
    </div>
  );
};

export default CalmCorner;
