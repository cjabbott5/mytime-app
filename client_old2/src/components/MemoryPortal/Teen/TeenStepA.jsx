import React from "react";

const TeenStepA = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Your Teenage World 🌍</h2>

      <label className="block">
        What was your home or living situation like during your teen years?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.homeLife || ""}
          onChange={(e) => setData({ ...data, homeLife: e.target.value })}
        />
      </label>

      <label className="block">
        What was school like for you?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.schoolExperience || ""}
          onChange={(e) => setData({ ...data, schoolExperience: e.target.value })}
        />
      </label>

      <label className="block">
        Did you have privacy or freedom during this time?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.freedom || ""}
          onChange={(e) => setData({ ...data, freedom: e.target.value })}
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

export default TeenStepA;
