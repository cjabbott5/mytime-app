import React from "react";

const WelcomeScreen = ({ onContinue, onCancel }) => {
  const handleLifeStage = () => {
    // Tell the parent (GuidedMemoryChat) to set path to 'lifeStage' and move to step 1
    onContinue({ path: "lifeStage" });
  };

  const handleCategory = () => {
    // Tell the parent (GuidedMemoryChat) to set path to 'emotional' and move to step 1
    onContinue({ path: "emotional" });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-rose-200 max-w-3xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold text-rose-600 mb-4">
        Welcome to Your Memory Portal
      </h2>
      <p className="text-gray-700 mb-6 max-w-md mx-auto">
        This space is safe, calming, and here to help you piece together your personal life story.
      </p>
      <h3 className="text-lg font-semibold text-rose-500 mb-4">
        How would you like to begin?
      </h3>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleCategory}
          className="bg-rose-100 text-rose-700 font-medium py-3 px-4 rounded-xl shadow-sm hover:bg-rose-200 transition text-sm"
        >
          By Category
        </button>

        <button
          onClick={handleLifeStage}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          By Life Stage
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
