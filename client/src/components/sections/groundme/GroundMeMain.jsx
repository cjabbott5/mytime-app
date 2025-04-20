import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import Header from '@/components/layout/Header'; // ✅ Add Header
import loopLogo from '@/assets/loop-logo-large2.png';
import BoxBreathing from './breathing/BoxBreathing';
import FourSevenEight from './breathing/FourSevenEight';
import MindfulBreathing from './breathing/MindfulBreathing';
import PacedBreathing from './breathing/PacedBreathing';

import {
  FiWind,
  FiEye,
  FiImage,
  FiHeadphones,
} from 'react-icons/fi'; // Minimalist icons

const exercises = [
  {
    category: 'Breathing',
    icon: <FiWind size={28} />,
    items: [
      { title: 'Box Breathing', description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s.' },
      { title: '4-7-8 Breath', description: 'Inhale 4s, hold 7s, exhale 8s.' },
    ],
  },
  {
    category: '5 Senses',
    icon: <FiEye size={28} />,
    items: [
      { title: 'Name 5 Things You See', description: 'Look around and name 5 things you can see.' },
      { title: 'Describe What You Feel', description: 'Touch something and describe its texture.' },
    ],
  },
  {
    category: 'Visual Anchors',
    icon: <FiImage size={28} />,
    items: [
      { title: 'Look at Something Beautiful', description: 'Find a calming image or object around you.' },
    ],
  },
  {
    category: 'Audio Cues',
    icon: <FiHeadphones size={28} />,
    items: [
      { title: 'Listen to Nature Sounds', description: 'Play ocean, rain, or forest sounds.' },
    ],
  },
];

export default function GroundMeMain() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const currentSection = exercises.find((e) => e.category === selectedCategory);

  return (
    <>
      <Header /> {/* ✅ Restored Header */}
      <LayoutWrapper hideHeader>
        <div className="min-h-screen px-6 py-16 bg-loop-soft text-center text-loop-dark transition-all">
          {/* 🌀 Logo */}
          <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-4" />

          {/* ✨ Title & Tagline */}
          <h1 className="text-4xl font-extrabold text-accent mb-2">Ground Me</h1>
          <p className="text-lg text-body mb-10 max-w-xl mx-auto">
            You’re safe here. Let’s take a mindful pause and find something
            that helps ground you in this moment.
          </p>

          {/* 🌿 Category Grid */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {exercises.map((section) =>
                section.category === 'Breathing' ? (
                  <Link to="/ground-me/breathing" key={section.category}>
                    <div className="bg-white/90 border border-loop-highlight rounded-2xl p-6 shadow hover:shadow-md hover:bg-white transition-all text-center flex flex-col items-center gap-2">
                      <div className="text-accent">{section.icon}</div>
                      <h2 className="text-lg font-semibold text-accent">{section.category}</h2>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={section.category}
                    onClick={() => setSelectedCategory(section.category)}
                    className="bg-white/90 border border-loop-highlight rounded-2xl p-6 shadow hover:shadow-md hover:bg-white transition-all text-center flex flex-col items-center gap-2"
                  >
                    <div className="text-accent">{section.icon}</div>
                    <h2 className="text-lg font-semibold text-accent">{section.category}</h2>
                  </button>
                )
              )}
            </div>
          )}

          {/* 🧘‍♀️ Selected Category Exercises */}
          {selectedCategory && (
            <div className="max-w-3xl mx-auto bg-white/90 border border-loop-highlight p-8 mt-8 rounded-2xl shadow-inner transition-all">
              <div className="flex items-center justify-center gap-3 mb-4 text-accent">
                {currentSection.icon}
                <h3 className="text-2xl font-bold">{selectedCategory}</h3>
              </div>

              <div className="space-y-4 text-left">
                {currentSection.items.map((item, idx) => (
                  <div key={idx} className="bg-loop-highlight/20 rounded-xl p-4 shadow-sm">
                    <h4 className="text-lg font-semibold text-loop-dark">{item.title}</h4>
                    <p className="text-sm text-body mt-1">{item.description}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-8 inline-block bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition"
              >
                ← Back to Categories
              </button>
            </div>
          )}
        </div>
      </LayoutWrapper>
    </>
  );
}
