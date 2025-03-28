import React from 'react';

const LifeStageSelection = ({ setSelectedStage }) => {
  const handleSelect = (label) => {
    console.log("Selected Life Stage:", label);
    setSelectedStage(label.toLowerCase());
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-rose-700">
        Select a Life Stage to Begin
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Each stage is its own path. You’ll be gently guided through supportive prompts to help you remember.
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={() => handleSelect("childhood")}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Childhood (0–12)
        </button>
        <button
          onClick={() => handleSelect("teen")}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Teenage Years (13–19)
        </button>
        <button
          onClick={() => handleSelect("college")}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Young Adult / College (20–25)
        </button>
        <button
          onClick={() => handleSelect("adulthood")}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Adult Life (26+)
        </button>
      </div>
    </div>
  );
};

export default LifeStageSelection;
