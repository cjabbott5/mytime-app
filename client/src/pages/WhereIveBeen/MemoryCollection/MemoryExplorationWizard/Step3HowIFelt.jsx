import React from 'react';

const OPTIONS = [
  'Small or powerless',
  'Like I was crazy',
  'Like I had to explain myself',
  'Angry but couldn’t show it',
  'Like I wanted to disappear',
  'Like I wasn’t allowed to be upset',
  'Like maybe I was wrong'
];

const Step3HowIFelt = ({ data, onChange }) => {
  const toggleSelection = (option) => {
    const updated = data.includes(option)
      ? data.filter(item => item !== option)
      : [...data, option];
    onChange(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Step 3: How did it make you feel?</h1>
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

export default Step3HowIFelt;
