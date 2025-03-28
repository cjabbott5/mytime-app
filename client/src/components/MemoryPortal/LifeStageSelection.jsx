import React from 'react';

const LifeStageSelection = ({ onNext, setMemoryDraft }) => {
  const handleSelect = (label) => {
    console.log("Selected Life Stage:", label);
    setMemoryDraft((prev) => ({
      ...prev,
      tags: [...(prev?.tags || []), label.toLowerCase()],
    }));
    onNext();
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold text-pink-700">Select a Life Stage</h2>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button onClick={() => handleSelect("childhood")} className="bg-pink-500 text-white px-4 py-2 rounded shadow">Childhood (0–12)</button>
        <button onClick={() => handleSelect("teen")} className="bg-pink-500 text-white px-4 py-2 rounded shadow">Teenage Years (13–19)</button>
        <button onClick={() => handleSelect("college")} className="bg-pink-500 text-white px-4 py-2 rounded shadow">Young Adult/College (20–25)</button>
        <button onClick={() => handleSelect("adulthood")} className="bg-pink-500 text-white px-4 py-2 rounded shadow">Adult Life (26+)</button>
      </div>
    </div>
  );
};

export default LifeStageSelection;
