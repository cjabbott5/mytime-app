// src/components/MemoryPortal/DailyCheckin.jsx
import React from 'react';

const DailyCheckin = ({ onComplete }) => {
  return (
    <div className="bg-rose-50 p-4 text-center rounded-md">
      <h2 className="text-xl font-semibold text-rose-700 mb-2">
        Daily Check-In
      </h2>
      <p className="text-gray-700 mb-4">
        How are you feeling today? Would you like to continue where you left off or try a new approach?
      </p>
      <button
        onClick={onComplete}
        className="bg-rose-500 text-white px-4 py-2 rounded shadow hover:bg-rose-600 transition"
      >
        Let’s Begin
      </button>
    </div>
  );
};

export default DailyCheckin;
