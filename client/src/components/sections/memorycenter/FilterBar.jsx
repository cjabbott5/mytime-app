import React from "react";

const FilterBar = ({
  availableMoods = [],
  availableTags = [],
  selectedMoods = [],
  selectedTags = [],
  onMoodToggle,
  onTagToggle,
  onClearFilters,
}) => {
  const chipBase = "px-3 py-1 rounded-full text-sm cursor-pointer border transition";

  const renderChips = (items, selected, toggleFn, colorClass) =>
    items.map((item) => {
      const isActive = selected.includes(item);
      return (
        <span
          key={item}
          onClick={() => toggleFn(item)}
          className={`${chipBase} ${
            isActive
              ? `${colorClass} text-white`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item}
        </span>
      );
    });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="mb-3 text-sm font-semibold text-gray-600">Filter by Mood</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {renderChips(availableMoods, selectedMoods, onMoodToggle, "bg-pink-500")}
      </div>

      <div className="mb-3 text-sm font-semibold text-gray-600">Filter by Tag</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {renderChips(availableTags, selectedTags, onTagToggle, "bg-purple-500")}
      </div>

      {(selectedMoods.length > 0 || selectedTags.length > 0) && (
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 underline hover:text-gray-700"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
