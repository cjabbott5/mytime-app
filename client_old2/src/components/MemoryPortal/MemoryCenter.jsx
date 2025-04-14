import React, { useEffect, useState } from "react";

const MemoryCenter = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mytime_memories") || "[]");
    setMemories(saved);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-pink-700 text-center">
        Your Memory Center
      </h1>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        This is your timeline of saved memories. You can reflect, revisit, or add more whenever you’re ready.
      </p>

      {memories.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No memories yet. Try creating one!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {memories.map((mem) => (
            <div
              key={mem.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3"
            >
              {mem.media && (
                <img
                  src={URL.createObjectURL(mem.media)}
                  alt="Memory"
                  className="rounded-xl object-cover w-full max-h-48 border"
                />
              )}
              <div className="text-sm text-gray-400">Memory Type</div>
              <div className="font-semibold">{mem.type}</div>

              <div className="text-sm text-gray-400">Date</div>
              <div className="text-gray-600">
                {mem.date === "unsure"
                  ? "Not sure"
                  : mem.date === "childhood"
                  ? "During childhood"
                  : mem.date}
              </div>

              <div className="text-sm text-gray-400">Mood</div>
              <div className="flex flex-wrap gap-2">
                {mem.mood?.map((m) => (
                  <span
                    key={m}
                    className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-400">Tags</div>
              <div className="flex flex-wrap gap-2">
                {mem.tags?.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-400">Memory</div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{mem.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryCenter;
