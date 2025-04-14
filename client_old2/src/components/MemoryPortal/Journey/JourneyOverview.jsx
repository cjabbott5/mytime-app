import React from 'react';
import chapters from './chaptersConfig';
import ChapterCard from './ChapterCard';

const JourneyOverview = ({ progress, onChapterClick }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center">
        My Journey
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore the chapters of your story. Start where it feels safe. Some chapters may require provider support to unlock.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => {
          const isLocked = chapter.requiresProvider && !progress.therapistLinked;
          const isCompleted = progress.chapters?.[chapter.id]?.completed || false;

          return (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isLocked={isLocked}
              isCompleted={isCompleted}
              onClick={() => onChapterClick(chapter)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JourneyOverview;
