// components/MemoryViews/WelcomeScreen.jsx
import React from "react";

const WelcomeScreen = ({ title, description, onContinue, onCancel }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-rose-200 max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onContinue}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          I’m Ready to Begin
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-100 text-rose-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Not Today, Take Me Back
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
