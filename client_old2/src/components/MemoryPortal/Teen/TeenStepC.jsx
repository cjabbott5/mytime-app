import React from "react";

const TeenStepC = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Connections + Sensory Anchors 🎧</h2>

      <label className="block">
        Who were you closest to as a teen?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.closePerson || ""}
          onChange={(e) => setData({ ...data, closePerson: e.target.value })}
        />
      </label>

      <label className="block">
        What songs, shows, smells, or spaces do you strongly associate with that time?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.sensoryAnchor || ""}
          onChange={(e) => setData({ ...data, sensoryAnchor: e.target.value })}
        />
      </label>

      <label className="block">
        What made you feel comforted or excited?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.comforts || ""}
          onChange={(e) => setData({ ...data, comforts: e.target.value })}
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

export default TeenStepC;
