import React from 'react';

const ChapterCard = ({ chapter, isLocked, isCompleted, onClick }) => {
  return (
    <div
      onClick={!isLocked ? onClick : null}
      className={`cursor-pointer border rounded-lg p-4 shadow-md transition transform hover:scale-105 ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
      } ${isCompleted ? 'bg-green-100' : 'bg-white'}`}
    >
      <h3 className="text-xl font-bold text-rose-700 mb-2">{chapter.title}</h3>
      <p className="text-gray-600 mb-2">{chapter.description}</p>
      {isLocked && (
        <p className="text-sm text-red-500 italic">Locked – Requires provider</p>
      )}
      {isCompleted && (
        <p className="text-sm text-green-600 font-medium">✓ Completed</p>
      )}
    </div>
  );
};

export default ChapterCard;
