// src/components/MemoryPortal/ReflectionStep.jsx
import React, { useState } from 'react';
import { useMemory } from '../../context/MemoryContext';

const feelings = [
  "Empowering",
  "Hard but helpful",
  "Overwhelming",
  "Numb",
  "Confusing",
  "Joyful"
];

const ReflectionStep = () => {
  const { setCurrentStep } = useMemory();
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [notes, setNotes] = useState('');

  const handleComplete = () => {
    console.log({ selectedFeeling, notes });
    setCurrentStep(4); // Proceed to FinalConfirmation
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-pink-700 text-center">
        How did it feel to recall that memory?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {feelings.map((feeling) => (
          <button
            key={feeling}
            onClick={() => setSelectedFeeling(feeling)}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
              selectedFeeling === feeling
                ? 'bg-pink-500 text-white border-pink-500'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            {feeling}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Want to share more about how it felt?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full min-h-[120px] p-3 rounded border border-gray-300"
      />

      <div className="text-right">
        <button
          onClick={handleComplete}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow"
        >
          Complete Reflection
        </button>
      </div>
    </div>
  );
};

export default ReflectionStep;
