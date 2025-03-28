// components/MemoryViews/MapView.jsx
import React, { useMemo } from "react";
import { useMemory } from "../../context/MemoryContext";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis } from "recharts";

const moodColors = {
  positive: "#facc15",   // yellow
  grounded: "#4ade80",   // green
  hard: "#f87171",       // red
  dissociation: "#c084fc", // purple
  identity: "#60a5fa",   // blue
};

const getMoodGroup = (mood) => {
  const m = mood?.toLowerCase();
  if (["joyful", "hopeful", "playful", "curious", "proud"].includes(m)) return "positive";
  if (["calm", "grateful", "relieved", "present"].includes(m)) return "grounded";
  if (["scared", "angry", "sad", "ashamed", "anxious", "numb"].includes(m)) return "hard";
  if (["dissociated", "foggy", "out of body", "detached"].includes(m)) return "dissociation";
  if (["confused", "lost", "overwhelmed", "powerless"].includes(m)) return "identity";
  return "neutral";
};

const MapView = () => {
  const { memories } = useMemory();

  const emotionCounts = useMemo(() => {
    const counts = {};
    memories.forEach((m) => {
      const mood = m.mood?.toLowerCase();
      if (!mood) return;
      if (!counts[mood]) counts[mood] = 0;
      counts[mood]++;
    });

    return Object.entries(counts).map(([mood, count], idx) => {
      return {
        x: Math.random() * 100, // spread them out for now
        y: Math.random() * 100,
        z: count * 10,
        mood,
        count,
        color: moodColors[getMoodGroup(mood)] || "#a5b4fc", // default soft indigo
      };
    });
  }, [memories]);

  return (
    <div className="w-full h-[600px] p-6 bg-white shadow-md rounded-lg border border-rose-200">
      <h2 className="text-2xl font-semibold text-rose-600 mb-4">Emotional Map View</h2>
      {emotionCounts.length === 0 ? (
        <p className="text-center text-gray-500 italic">No emotional data to visualize yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="x" type="number" hide />
            <YAxis dataKey="y" type="number" hide />
            <ZAxis dataKey="z" range={[50, 200]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const { mood, count } = payload[0].payload;
                  return (
                    <div className="bg-white border border-rose-300 px-3 py-2 rounded shadow-md text-sm text-rose-600">
                      <strong>{mood}</strong>: {count} memory{count > 1 ? "ies" : "y"}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={emotionCounts} fill="#f43f5e">
              {emotionCounts.map((entry, index) => (
                <circle
                  key={`bubble-${index}`}
                  cx={entry.x}
                  cy={entry.y}
                  r={entry.z / 10}
                  fill={entry.color}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MapView;
