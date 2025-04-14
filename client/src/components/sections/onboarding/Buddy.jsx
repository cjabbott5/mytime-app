import React from 'react';

const Buddy = ({ options, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {options.map((buddy) => (
        <div
          key={buddy.value}
          onClick={() => onSelect(buddy.value)}
          className={`cursor-pointer p-3 rounded-xl border-4 transition-all duration-200 ${
            selected === buddy.value ? 'border-pink-600' : 'border-transparent'
          } hover:scale-105 bg-white shadow`}
        >
          <img
            src={buddy.image}
            alt={buddy.label}
            className="w-full h-40 object-contain rounded-md mb-2"
          />
          <p className="text-center text-pink-700 font-medium">{buddy.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Buddy;
