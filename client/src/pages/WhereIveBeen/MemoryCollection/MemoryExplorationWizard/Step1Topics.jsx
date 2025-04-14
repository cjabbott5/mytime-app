import React, { useState } from 'react';

const TOPIC_CATEGORIES = {
  'Family Conflict & Rage': [
    'Unspoken family violence',
    'Alcohol-fueled arguments between parents',
    'Yelling or throwing things late at night',
    'A violent episode that was never discussed again'
  ],
  'Silence & Emotional Neglect': [
    'Nobody talked about anything real',
    'I was left to make sense of scary things alone',
    'I never got comfort after something upsetting',
    'I had to pretend things were fine'
  ],
  'Boundary Violations': [
    'Sexual boundary violations that were dismissed',
    'Told I was lying or exaggerating about someone’s behavior',
    'I wasn’t safe in my own room or space',
    'They insisted something wasn’t happening when it was'
  ],
  'Memory Gaps / Confusion': [
    'I’m not sure what happened, but something felt wrong',
    'I was told I was imagining things',
    'The way they describe it doesn’t match what I remember',
    'I’ve blocked out chunks of my childhood'
  ],
  'Parentification & Role Reversal': [
    'I felt like the adult in the room',
    'I took care of my parent’s emotions',
    'I had to calm people down or keep the peace',
    'Nobody checked in on me after big emotional events'
  ]
};

const Step1Topics = ({ data, onChange }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (category) => {
    setExpanded(expanded === category ? null : category);
  };

  const toggleSelection = (option) => {
    const updated = data.includes(option)
      ? data.filter(item => item !== option)
      : [...data, option];
    onChange(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Step 1: What was the situation or topic? <span className="text-sm text-gray-500 font-normal">(Optional)</span></h1>
      <p className="text-sm text-gray-600 mb-4">This part may surface difficult memories. You can skip it or return later when you feel safe. Click a category to explore related topics.</p>

      {Object.entries(TOPIC_CATEGORIES).map(([category, options], idx) => (
        <div key={idx} className="mb-4 border border-gray-300 rounded-md">
          <button
            onClick={() => toggleExpand(category)}
            className="w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200"
          >
            {category}
          </button>
          {expanded === category && (
            <div className="p-4 flex flex-wrap gap-2">
              {options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => toggleSelection(option)}
                  className={`px-3 py-2 rounded-full border ${
                    data.includes(option)
                      ? 'bg-pink-200 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Step1Topics;