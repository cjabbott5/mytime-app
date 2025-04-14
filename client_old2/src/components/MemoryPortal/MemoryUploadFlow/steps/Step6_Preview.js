import React from "react";

const Step6_Preview = ({ data, onBack, updateData }) => {
  const { type, date, mood, tags, content, media } = data;

  const handleSave = () => {
    const memory = {
      ...data,
      id: Date.now(), // simple unique ID
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("mytime_memories") || "[]");
    localStorage.setItem("mytime_memories", JSON.stringify([...existing, memory]));

    // Show a success message (or replace this with toast/modal later)
    alert("Memory saved!");

    // Clear form for new memory
    updateData({});
  };

  const handleCreateAnother = () => {
    updateData({});
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        Here’s your memory
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        You’ve built something powerful. Take a look below.
      </p>

      <div className="border border-gray-300 rounded-2xl p-6 shadow-md bg-white space-y-4">
        {media && (
          <img
            src={URL.createObjectURL(media)}
            alt="Memory"
            className="rounded-xl max-h-64 w-full object-cover border border-gray-200"
          />
        )}
        <div>
          <div className="text-sm text-gray-400 mb-1">Memory Type</div>
          <div className="text-lg font-semibold">{type}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Date</div>
          <div className="text-base">
            {date === "unsure"
              ? "Not sure"
              : date === "childhood"
              ? "During childhood"
              : date}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Mood</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {mood?.map((m) => (
              <span
                key={m}
                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Tags</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags?.map((t) => (
              <span
                key={t}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Memory Description</div>
          <p className="text-gray-700 whitespace-pre-wrap mt-1">{content}</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        You can always return later to view or update this memory.
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition"
        >
          Save Memory
        </button>
        <button
          onClick={handleCreateAnother}
          className="bg-white border border-pink-400 text-pink-600 px-6 py-2 rounded-xl shadow-sm hover:bg-pink-50 transition"
        >
          Create Another Memory
        </button>
      </div>
    </div>
  );
};

export default Step6_Preview;
