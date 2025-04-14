import React from 'react';
import { useMemory } from '../../context/MemoryContext';
import { v4 as uuidv4 } from 'uuid';

const FinalConfirmation = ({ memoryDraft }) => {
  const { addMemory } = useMemory();

  const handleSubmit = () => {
    const newMemory = {
      ...memoryDraft,
      id: uuidv4(),
      date: new Date().toISOString(),
    };
    addMemory(newMemory);
    // optional: redirect or reset flow
  };

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-pink-700">You did great.</h2>
      <p className="text-gray-600">One memory at a time.</p>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={handleSubmit}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow"
        >
          Add to Timeline
        </button>
        <button
          onClick={() => window.location.href = '/timeline'} // or route programmatically
          className="text-sm text-gray-500 underline"
        >
          Return to Timeline
        </button>
      </div>
    </div>
  );
};

export default FinalConfirmation;
