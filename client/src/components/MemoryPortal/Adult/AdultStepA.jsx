import React from "react";

const AdultStepA = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Your Current Life Context 🏡</h2>

      <label className="block">
        What's your current living situation like?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.livingSituation || ""}
          onChange={(e) => setData({ ...data, livingSituation: e.target.value })}
        />
      </label>

      <label className="block">
        What life roles or responsibilities do you hold right now?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.roles || ""}
          onChange={(e) => setData({ ...data, roles: e.target.value })}
        />
      </label>

      <label className="block">
        What does "home" feel like to you in this stage?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.definitionOfHome || ""}
          onChange={(e) => setData({ ...data, definitionOfHome: e.target.value })}
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

export default AdultStepA;
