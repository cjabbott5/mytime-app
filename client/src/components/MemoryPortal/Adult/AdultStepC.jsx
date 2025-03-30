import React from "react";

const AdultStepC = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Relationships & Anchors 🤝</h2>

      <label className="block">
        Who feels like your closest emotional support?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.closePerson || ""}
          onChange={(e) => setData({ ...data, closePerson: e.target.value })}
        />
      </label>

      <label className="block">
        Are there routines, objects, or places that ground you right now?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.groundingThings || ""}
          onChange={(e) => setData({ ...data, groundingThings: e.target.value })}
        />
      </label>

      <label className="block">
        What's a comforting or nostalgic anchor in this stage?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.sensoryAnchor || ""}
          onChange={(e) => setData({ ...data, sensoryAnchor: e.target.value })}
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

export default AdultStepC;
