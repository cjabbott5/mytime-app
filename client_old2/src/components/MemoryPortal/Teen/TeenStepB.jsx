import React from "react";

const TeenStepB = ({ data, setData, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-rose-600">Your Identity in These Years 🧍</h2>

      <label className="block">
        How would you describe yourself as a teenager?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.selfDescription || ""}
          onChange={(e) => setData({ ...data, selfDescription: e.target.value })}
        />
      </label>

      <label className="block">
        How did others (friends, teachers, family) describe you?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.othersView || ""}
          onChange={(e) => setData({ ...data, othersView: e.target.value })}
        />
      </label>

      <label className="block">
        Were there any major identity shifts or challenges?
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={data?.identityShift || ""}
          onChange={(e) => setData({ ...data, identityShift: e.target.value })}
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

export default TeenStepB;
