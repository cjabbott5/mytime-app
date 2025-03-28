// src/components/MemoryPortal/LifeStageSelection.jsx
import React from 'react';

const LifeStageSelection = ({ setSelectedStage }) => {
  const lifeStages = [
    { label: 'Childhood (0-12)', value: 'childhood' },
    { label: 'Teenage Years (13-19)', value: 'teenage' },
    { label: 'Young Adult/College (20-25)', value: 'youngAdult' },
    { label: 'Adult Life (26+)', value: 'adult' },
  ];

  const handleLifeStageClick = (stage) => {
    console.log(`Selected Life Stage: ${stage}`);
    setSelectedStage(stage); // Send selected stage up to parent
  };

  return (
    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold text-rose-700 mb-4">
        Select a Life Stage
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
        {lifeStages.map((stage) => (
          <button
            key={stage.value}
            onClick={() => handleLifeStageClick(stage.label)} // or use stage.value if preferred
            className="bg-rose-500 text-white px-4 py-2 rounded shadow hover:bg-rose-600 transition"
          >
            {stage.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LifeStageSelection;
