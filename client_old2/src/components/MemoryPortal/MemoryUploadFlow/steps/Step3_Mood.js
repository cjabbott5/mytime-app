import React, { useState } from "react";

const moodGroups = [
  {
    label: "Positive",
    color: "bg-yellow-100",
    moods: ["Happy", "Grateful", "Proud", "Loved", "Peaceful"],
  },
  {
    label: "Difficult",
    color: "bg-rose-100",
    moods: ["Sad", "Angry", "Ashamed", "Lonely", "Anxious"],
  },
  {
    label: "Complex",
    color: "bg-purple-100",
    moods: ["Confused", "Numb", "Relieved", "Overwhelmed", "Mixed"],
  },
];

const Step3_Mood = ({ data, onNext, onBack, updateData }) => {
  const [selectedMoods, setSelectedMoods] = useState(data.mood || []);

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const handleContinue = () => {
    updateData({ mood: selectedMoods });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        How did this memory feel?
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        Emotions can be layered. Choose as many as you like.
      </p>

      <div className="space-y-4">
        {moodGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-md font-semibold text-gray-700 mb-2">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`${
                    selectedMoods.includes(mood)
                      ? "ring-2 ring-pink-400 bg-white"
                      : group.color
                  } px-4 py-2 rounded-full text-sm font-medium transition duration-200 border border-gray-200`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        ))}
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
          disabled={selectedMoods.length === 0}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Mood;
