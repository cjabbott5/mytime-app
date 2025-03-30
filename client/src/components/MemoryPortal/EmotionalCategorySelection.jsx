import React from "react";

// The category data from your old WelcomeScreen:
const categories = [
  { label: "Joyful & Positive Memories", value: "joyful" },
  { label: "Challenging or Difficult Memories", value: "difficult" },
  { label: "Milestones & Turning Points", value: "milestone" },
  { label: "Relationships & Connections", value: "relationship" },
  { label: "Achievements & Personal Growth", value: "growth" },
];

const EmotionalCategorySelection = ({ category, setMemoryDraft, onNext }) => {
  const handleSelect = (catValue) => {
    // Optionally store selected category in memoryDraft
    setMemoryDraft((prev) => ({ ...prev, category: catValue }));
    // Then move to the next step
    onNext();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-rose-200 max-w-3xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">
        Select a Memory Category
      </h2>
      <p className="text-gray-700 mb-6 max-w-md mx-auto">
        Pick the category that best describes the memory you want to capture.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleSelect(cat.value)}
            className="bg-rose-100 text-rose-700 font-medium py-3 px-4 rounded-xl shadow-sm hover:bg-rose-200 transition text-sm"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionalCategorySelection;
