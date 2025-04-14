import React from "react";

const Step2_Identity = ({ data, onUpdate, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">How did you see yourself as a child?</h2>

      <div>
        <label className="block mb-2 text-rose-600 font-medium">
          How would you describe yourself back then?
        </label>
        <input
          type="text"
          className="w-full border border-rose-300 rounded-md p-2"
          value={data?.selfWords || ""}
          onChange={(e) => onUpdate({ ...data, selfWords: e.target.value })}
          placeholder="e.g., curious, sensitive, quiet..."
        />
      </div>

      <div>
        <label className="block mb-2 text-rose-600 font-medium">
          How did others describe you? (family, teachers, friends)
        </label>
        <input
          type="text"
          className="w-full border border-rose-300 rounded-md p-2"
          value={data?.othersWords || ""}
          onChange={(e) => onUpdate({ ...data, othersWords: e.target.value })}
          placeholder="e.g., shy, talkative, smart..."
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

export default Step2_Identity;
