import React from 'react';

const SubOptionToggle = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition
        ${isSelected
          ? 'bg-rose-100 border-rose-400 text-rose-700'
          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}
      `}
    >
      {label}
    </button>
  );
};

export default SubOptionToggle;
