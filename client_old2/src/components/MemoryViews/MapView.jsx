import React, { useMemo } from "react";
import { useMemory } from "../../context/MemoryContext";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ZAxis,
} from "recharts";

const moodColors = {
  positive: "#facc15", // yellow
  grounded: "#4ade80", // green
  hard: "#f87171", // red
  dissociation: "#c084fc", // purple
  identity: "#60a5fa", // blue
  neutral: "#a5b4fc", // soft indigo (fallback)
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

  const { emotionCounts, groupCounts, total } = useMemo(() => {
    const counts = {};
    const groups = {
      positive: 0,
      grounded: 0,
      hard: 0,
      dissociation: 0,
      identity: 0,
      neutral: 0,
    };

    memories.forEach((m) => {
      const mood = m.mood?.toLowerCase();
      if (!mood) return;

      const group = getMoodGroup(mood);
      groups[group] += 1;

      if (!counts[mood]) counts[mood] = 0;
      counts[mood]++;
    });

    const bubbles = Object.entries(counts).map(([mood, count], idx) => {
      const group = getMoodGroup(mood);
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.max(30, count * 15), // ensure minimum size
        mood,
        count,
        color: moodColors[group] || moodColors.neutral,
      };
    });

    const total = memories.length;

    return {
      emotionCounts: bubbles,
      groupCounts: groups,
      total,
    };
  }, [memories]);

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg border border-rose-200">
      <h2 className="text-2xl font-semibold text-rose-600 mb-2">Emotional Map View</h2>

      {/* 🧠 Stats Summary */}
      <div className="mb-4 text-sm text-rose-700">
        <p><strong>Total Memories:</strong> {total}</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {Object.entries(groupCounts).map(([group, count]) => (
            count > 0 && (
              <div key={group} className="flex items-center gap-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: moodColors[group] }}
                />
                {group.charAt(0).toUpperCase() + group.slice(1)}: {count}
              </div>
            )
          ))}
        </div>
      </div>

      {/* 📍 Emotional Bubble Chart */}
      {emotionCounts.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No emotional data to visualize yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 40, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="x" type="number" hide />
            <YAxis dataKey="y" type="number" hide />
            <ZAxis dataKey="z" range={[30, 200]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
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
            <Scatter data={emotionCounts}>
              {emotionCounts.map((entry, index) => (
                <circle
                  key={`bubble-${index}`}
                  cx={entry.x}
                  cy={entry.y}
                  r={entry.z / 10}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={1}
                  style={{ transition: "all 0.3s ease" }}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      )}

      {/* 🗺️ Color Legend */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-500">
        <h4 className="font-semibold text-rose-600 mb-2">Emotion Categories</h4>
        <div className="flex flex-wrap gap-4">
          {Object.entries(moodColors).map(([group, color]) => (
            <div key={group} className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{group}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
