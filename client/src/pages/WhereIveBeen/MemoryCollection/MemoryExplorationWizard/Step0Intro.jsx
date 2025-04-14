import React from 'react';

const Step0Intro = ({ onNext }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Guided Reflection</h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        This gentle tool will guide you through a 4-step process to help you process memories that may involve gaslighting, emotional invalidation, or past confusion. You are in control. You can stop, skip, or return at any time.
      </p>
      <button
        onClick={onNext}
        className="px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700"
      >
        Begin Reflection
      </button>
    </div>
  );
};

export default Step0Intro;
