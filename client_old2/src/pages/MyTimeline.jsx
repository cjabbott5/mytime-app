import React, { useState, useMemo } from "react";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/MemoryViews/MemoryCard";
import FilterBar from "../components/MemoryEditor/FilterBar";
import { motion } from "framer-motion";

const affirmations = [
  "You're doing beautifully.",
  "Healing isn't linear. Keep going. 🌱",
  "Every memory matters.",
  "It's okay to pause. You're safe here.",
  "Breathe in. Breathe out. You're held. 🕊️"
];

const MyTimeline = () => {
  const { memories } = useMemory();

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
    <div className="bg-rose-50 min-h-screen px-4 sm:px-8 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-rose-600 mb-8 text-center"
      >
        My Memory Timeline
      </motion.h1>

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
                    className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-rose-300 relative"
                  >
                    <MemoryCard memory={memory} viewMode="timeline" />
                  </motion.div>
                ))}
              </div>

              {/* ✨ Micro-affirmation after each year */}
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

export default MyTimeline;
