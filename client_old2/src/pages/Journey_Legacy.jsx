import React from 'react';
import ChapterCard from '../components/Journey/ChapterCard';
import ChapterProgress from '../components/Journey/ChapterProgress';

const Journey = () => {
  const chapters = [
    {
      id: 'who-i-am',
      title: 'Who I Am',
      emoji: '🧬',
      unlocked: true,
    },
    {
      id: 'joy-curiosity',
      title: 'Joy & Curiosity',
      emoji: '✨',
      unlocked: true,
    },
    {
      id: 'foundations',
      title: 'Foundations',
      emoji: '🌱',
      unlocked: false,
      message: "We’ll get here when you’re ready 🌿",
    },
    // You can add more chapters here later
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-800 mb-2">Journey Mode</h1>
      <p className="text-pink-600 mb-6">
        Explore your story through guided chapters. Move at your own pace.
      </p>

      {/* Chapter Progress Bar */}
      <ChapterProgress />

      {/* Chapter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} {...chapter} />
        ))}
      </div>
    </div>
  );
};

export default Journey;
