// components/MemoryViews/TimelineView.jsx
import React, { useMemo, useState } from "react";
import MemoryCard from "./MemoryCard";
import FilterBar from "../MemoryEditor/FilterBar";
import { motion } from "framer-motion";

const affirmations = [
  "You're doing beautifully.",
  "Healing isn't linear. Keep going. 🌱",
  "Every memory matters.",
  "It's okay to pause. You're safe here.",
  "Breathe in. Breathe out. You're held. 🕊️"
];

const TimelineView = ({ memories }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const allMoods = useMemo(() => {
    const set = new Set();
    memories.forEach((m) => m.mood && set.add(m.mood));
    return Array.from(set);
  }, [memories]);

  const allTags = useMemo(() => {
    const set = new Set();
    memories.forEach((m) => m.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [memories]);

  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      const moodMatch =
        selectedMoods.length === 0 || selectedMoods.includes(m.mood);
      const tagMatch =
        selectedTags.length === 0 ||
        m.tags?.some((tag) => selectedTags.includes(tag));
      return moodMatch && tagMatch;
    });
  }, [memories, selectedMoods, selectedTags]);

  const groupedByYear = useMemo(() => {
    const sorted = [...filteredMemories].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sorted.reduce((acc, memory) => {
      const year = new Date(memory.date).getFullYear();
      acc[year] = acc[year] || [];
      acc[year].push(memory);
      return acc;
    }, {});
  }, [filteredMemories]);

  const toggleMood = (mood) =>
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );

  const toggleTag = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const clearFilters = () => {
    setSelectedMoods([]);
    setSelectedTags([]);
  };

  return (
    <div className="py-6">
      <FilterBar
        availableMoods={allMoods}
        availableTags={allTags}
        selectedMoods={selectedMoods}
        selectedTags={selectedTags}
        onMoodToggle={toggleMood}
        onTagToggle={toggleTag}
        onClearFilters={clearFilters}
      />

      {filteredMemories.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-10">
          No memories match your filters 🕊️
        </p>
      ) : (
        <div className="space-y-20 mt-10">
          {Object.entries(groupedByYear).map(([year, yearMemories], index) => (
            <div key={year} className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-semibold text-rose-500 mb-6 border-b border-rose-300 pb-2"
              >
                {year}
              </motion.h2>

              <div className="flex flex-col gap-10">
                {yearMemories.map((memory, idx) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <MemoryCard memory={memory} viewMode="timeline" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10 text-center italic text-rose-400"
              >
                {affirmations[index % affirmations.length]}
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineView;
