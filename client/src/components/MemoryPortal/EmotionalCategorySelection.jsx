// src/components/MemoryPortal/EmotionalCategorySelection.jsx
import React from 'react';

const EmotionalCategorySelection = () => {
  const categories = [
    { label: 'Joyful & Positive Memories', value: 'joyful' },
    { label: 'Challenging or Difficult Memories', value: 'challenging' },
    { label: 'Milestones & Turning Points', value: 'milestones' },
    { label: 'Relationships & Connections', value: 'relationships' },
    { label: 'Achievements & Personal Growth', value: 'achievements' },
  ];

  const handleCategoryClick = (category) => {
    console.log(`Selected Emotional Category: ${category}`);
  };

  return (
    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold text-rose-700 mb-4">
        Select a Memory Category
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className="bg-rose-500 text-white px-4 py-2 rounded shadow hover:bg-rose-600 transition"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionalCategorySelection;
