import React from "react";

const AdultStepB = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Who Are You Now? 🧠</h2>

      <label className="block">
        How would you describe yourself right now?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.currentSelf || ""}
          onChange={(e) => setData({ ...data, currentSelf: e.target.value })}
        />
      </label>

      <label className="block">
        How do you think you've changed since your younger self?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.changeFromPast || ""}
          onChange={(e) => setData({ ...data, changeFromPast: e.target.value })}
        />
      </label>

      <label className="block">
        Are there parts of your identity you're still exploring?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.stillExploring || ""}
          onChange={(e) => setData({ ...data, stillExploring: e.target.value })}
        />
      </label>

      <button
        onClick={onNext}
        className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
      >
        Next
      </button>
    </div>
  );
};

export default AdultStepB;
