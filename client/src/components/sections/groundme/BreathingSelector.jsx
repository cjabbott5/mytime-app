import React from 'react';
import { Link } from 'react-router-dom';

const breathingTechniques = [
  {
    name: 'Paced Breathing',
    slug: 'paced',
    description: 'Inhale for 4 seconds, hold, exhale for 8 seconds. Promotes calm and slows heart rate.',
  },
  {
    name: 'Mindful Breathing',
    slug: 'mindful',
    description: 'Focus on the natural rhythm of your breath to stay present and reduce reactivity.',
  },
  {
    name: 'Box Breathing',
    slug: 'box',
    description: 'Inhale, hold, exhale, hold — each for 4 seconds. Great for grounding and anxiety.',
  },
  {
    name: '4-7-8 Breathing',
    slug: 'four-seven-eight',
    description: 'Breathe in for 4s, hold 7s, exhale 8s. Perfect for sleep and deep calming.',
  },
];

export default function BreathingSelector() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 px-6 py-16">
      <h1 className="text-3xl font-bold text-accent mb-4">Choose a Breathing Practice</h1>
      <p className="text-body text-lg mb-6">
        Select a technique to begin a short, guided breathing experience based in DBT and mindfulness.
      </p>

      {/* 🌬️ Technique Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {breathingTechniques.map(({ name, slug, description }) => (
          <Link to={`/ground-me/breathing/${slug}`} key={slug}>
            <div className="bg-white rounded-xl shadow hover:shadow-md p-6 transition cursor-pointer border border-loop-highlight hover:bg-loop-soft">
              <h2 className="text-xl font-semibold text-accent mb-2">{name}</h2>
              <p className="text-body text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔙 Back to Categories Button */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/ground-me"
          className="inline-block bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
