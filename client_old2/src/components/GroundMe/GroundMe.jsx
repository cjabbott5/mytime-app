// GroundMe.jsx
import React, { useState } from 'react';
// ❌ REMOVE this line if you're defining exercises below
// import { exercises } from './exercisesData';

const exercises = [
  {
    category: 'Breathing',
    items: [
      { title: 'Box Breathing', description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s.' },
      { title: '4-7-8 Breath', description: 'Inhale 4s, hold 7s, exhale 8s.' },
    ],
  },
  {
    category: '5 Senses',
    items: [
      { title: 'Name 5 Things You See', description: 'Look around and name 5 things you can see.' },
      { title: 'Describe What You Feel', description: 'Touch something and describe its texture.' },
    ],
  },
  {
    category: 'Visual Anchors',
    items: [
      { title: 'Look at Something Beautiful', description: 'View a calming image or object.' },
    ],
  },
  {
    category: 'Audio Cues',
    items: [
      { title: 'Listen to Nature Sounds', description: 'Play ocean, rain, or forest sounds.' },
    ],
  },
];

export default function GroundMe() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-pink-100 p-6 text-center">
      <h1 className="text-3xl font-semibold text-pink-800 mb-2">Ground Me</h1>
      <p className="text-base text-pink-700 mb-6">You’re safe here. Take a breath. Let’s find something that helps.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {exercises.map((section) => (
          <button
            key={section.category}
            onClick={() => setSelectedCategory(section.category)}
            className="rounded-2xl shadow-md bg-white p-4 hover:bg-pink-50 transition-all"
          >
            <h2 className="text-lg text-pink-700 font-medium">{section.category}</h2>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-white rounded-2xl p-6 shadow-inner max-w-2xl mx-auto">
          <h3 className="text-xl text-pink-800 font-semibold mb-4">{selectedCategory} Exercises</h3>
          <div className="space-y-4">
            {exercises.find((e) => e.category === selectedCategory)?.items.map((item, idx) => (
              <div key={idx} className="bg-pink-50 rounded-xl p-4 shadow">
                <h4 className="text-pink-700 font-medium text-lg">{item.title}</h4>
                <p className="text-sm text-pink-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-6 bg-pink-500 text-white py-2 px-4 rounded-xl hover:bg-pink-600"
          >
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
}
