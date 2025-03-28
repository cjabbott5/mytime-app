import React from "react";

const Step4_EmotionalRecall = ({ data, onUpdate, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">
        Is there a memory you’d like to save from this time?
      </h2>

      <p className="text-sm text-gray-500 italic">
        You can skip this if you're not ready. You can return to it later.
      </p>

      <div>
        <label className="block mb-2 text-rose-600 font-medium">
          Describe a moment that sticks with you:
        </label>
        <textarea
          rows="4"
          className="w-full border border-rose-300 rounded-md p-2"
          value={data?.coreMemory || ""}
          onChange={(e) => onUpdate({ ...data, coreMemory: e.target.value })}
          placeholder="e.g., The day I ran away from school..."
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600"
        >
          Continue to Profile
        </button>
      </div>
    </div>
  );
};

export default Step4_EmotionalRecall;
