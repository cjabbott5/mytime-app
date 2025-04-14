import React from 'react';

const OPTIONS = [
  'I apologized',
  'I shut down completely',
  'I cried',
  'I got angry and tried to explain myself',
  'I changed the subject to keep the peace',
  'I froze—I couldn’t speak',
  'I left the room or dissociated',
  'I tried to be the bigger person'
];

const Step4HowIResponded = ({ data, onChange }) => {
  const toggleSelection = (option) => {
    const updated = data.includes(option)
      ? data.filter(item => item !== option)
      : [...data, option];
    onChange(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Step 4: How did you respond?</h1>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option, idx) => (
          <button
            key={idx}
            onClick={() => toggleSelection(option)}
            className={`px-4 py-2 rounded-full border ${
              data.includes(option)
                ? 'bg-pink-200 border-pink-400'
                : 'bg-white border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step4HowIResponded;
