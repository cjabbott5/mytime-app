import React from "react";
import { useMemory } from "../context/MemoryContext";

const MyTimeline = () => {
  const { memories } = useMemory();

  // Sort oldest → newest
  const sorted = [...memories].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-rose-600 mb-4">My Timeline</h1>

      {sorted.length === 0 ? (
        <p className="text-gray-500 italic">No memories to show yet. Start building your story ✨</p>
      ) : (
        <div className="flex overflow-x-auto space-x-4 pb-4 snap-x">
          {sorted.map((m) => (
            <div
              key={m.id}
              className="min-w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md p-4 snap-start"
            >
              {m.image && (
                <img
                  src={m.image}
                  alt="memory"
                  className="rounded-md mb-2 w-full h-40 object-cover"
                />
              )}
              <h2 className="text-lg font-semibold">{m.title}</h2>
              <p className="text-sm text-gray-500">{new Date(m.date).toDateString()}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {m.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {m.mood && (
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs ml-auto">
                    {m.mood}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTimeline;
