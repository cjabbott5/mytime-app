import React from "react";

const AdultStepD = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">An Emotional Check-In 💬</h2>

      <label className="block">
        What's something emotionally meaningful from this time?
        <textarea
          className="mt-1 w-full p-2 border rounded"
          rows={4}
          value={data?.coreMemory || ""}
          onChange={(e) => setData({ ...data, coreMemory: e.target.value })}
        />
      </label>

      <label className="block">
        What’s the emotional tone? (e.g. proud, exhausted, grateful, lost)
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.emotionTone || ""}
          onChange={(e) => setData({ ...data, emotionTone: e.target.value })}
        />
      </label>

      <button
        onClick={onNext}
        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
      >
        Finish & Build Profile
      </button>
    </div>
  );
};

export default AdultStepD;
