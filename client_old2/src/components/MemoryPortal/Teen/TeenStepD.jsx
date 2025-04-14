import React from "react";

const TeenStepD = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Emotional Memory 💭</h2>

      <label className="block">
        What’s one emotional memory from your teen years that still stays with you?
        <textarea
          className="mt-1 w-full p-2 border rounded"
          rows={4}
          value={data?.coreMemory || ""}
          onChange={(e) => setData({ ...data, coreMemory: e.target.value })}
        />
      </label>

      <label className="block">
        Would you describe it as more safe, scary, confusing, or something else?
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

export default TeenStepD;
