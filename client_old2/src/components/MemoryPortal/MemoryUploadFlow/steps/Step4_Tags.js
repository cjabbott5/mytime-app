import React, { useState } from "react";

const tagColors = {
  Family: "bg-blue-100",
  Friendship: "bg-blue-100",
  "Coming Out": "bg-purple-100",
  Identity: "bg-purple-100",
  Transition: "bg-purple-100",
  Healing: "bg-green-100",
  Breakthrough: "bg-green-100",
  School: "bg-yellow-100",
  Home: "bg-yellow-100",
  Loss: "bg-rose-100",
};

const suggestedTags = Object.keys(tagColors);

const Step4_Tags = ({ data, onNext, onBack, updateData }) => {
  const [selectedTags, setSelectedTags] = useState(data.tags || []);
  const [customTag, setCustomTag] = useState("");

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed]);
    }
    setCustomTag("");
  };

  const handleContinue = () => {
    updateData({ tags: selectedTags });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        What themes or tags fit this memory?
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        Tags help you organize and revisit memories. Add your own or choose from suggestions.
      </p>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestedTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const color = tagColors[tag] || "bg-gray-100";
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`${
                isSelected ? "ring-2 ring-pink-400 bg-white" : color
              } px-4 py-2 rounded-full text-sm font-medium transition duration-200 border border-gray-200`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 max-w-sm mx-auto">
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="Add your own tag"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
        />
        <button
          onClick={handleAddCustomTag}
          className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
        >
          Add
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step4_Tags;
