import React from "react";

const Step3_Sensory = ({ data, onUpdate, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">Let’s activate some sensory memories.</h2>

      <div>
        <label className="block mb-2 text-rose-600 font-medium">
          Who were you closest to as a child?
        </label>
        <input
          type="text"
          className="w-full border border-rose-300 rounded-md p-2"
          value={data?.closePerson || ""}
          onChange={(e) => onUpdate({ ...data, closePerson: e.target.value })}
          placeholder="e.g., my brother, grandma, neighbor..."
        />
      </div>

      <div>
        <label className="block mb-2 text-rose-600 font-medium">
          What food, smell, or sound reminds you of childhood?
        </label>
        <input
          type="text"
          className="w-full border border-rose-300 rounded-md p-2"
          value={data?.sensoryAnchor || ""}
          onChange={(e) => onUpdate({ ...data, sensoryAnchor: e.target.value })}
          placeholder="e.g., popcorn, the smell of grass..."
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Sensory;
