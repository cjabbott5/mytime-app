import React from 'react';

const OPTIONS = [
  'You’re overreacting',
  'I never said that',
  'You always twist things',
  'Laughed or smirked when I was upset',
  'Changed the subject',
  'Started crying or turned it around on me',
  'Brought up something I did instead'
];

const Step2WhatTheyDid = ({ data, onChange }) => {
  const toggleSelection = (option) => {
    const updated = data.includes(option)
      ? data.filter(item => item !== option)
      : [...data, option];
    onChange(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Step 2: What did they say or do?</h1>
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

export default Step2WhatTheyDid;
