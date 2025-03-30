import React from "react";

const memoryTypes = [
  {
    label: "Joyful or Uplifting",
    value: "joyful",
    bg: "bg-pink-100",
    hover: "hover:bg-pink-200",
  },
  {
    label: "Difficult or Challenging",
    value: "difficult",
    bg: "bg-rose-100",
    hover: "hover:bg-rose-200",
  },
  {
    label: "Milestone or Turning Point",
    value: "milestone",
    bg: "bg-fuchsia-100",
    hover: "hover:bg-fuchsia-200",
  },
  {
    label: "Connection or Relationship",
    value: "connection",
    bg: "bg-purple-100",
    hover: "hover:bg-purple-200",
  },
  {
    label: "Personal Growth or Achievement",
    value: "growth",
    bg: "bg-indigo-100",
    hover: "hover:bg-indigo-200",
  },
];

const Step1_MemoryType = ({ data, onNext, updateData }) => {
  const handleSelect = (value) => {
    updateData({ type: value });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        What kind of memory would you like to start with?
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        There’s no right or wrong answer. Go with what feels present right now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {memoryTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`${type.bg} ${type.hover} text-gray-800 font-medium py-4 px-5 rounded-2xl shadow-sm border border-gray-200 transition-all duration-200 transform hover:scale-105 focus:outline-none text-left`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        You’re in control of your story. We’re just here to support you.
      </div>
    </div>
  );
};

export default Step1_MemoryType;
