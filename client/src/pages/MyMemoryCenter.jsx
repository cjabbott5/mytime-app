import React, { useState } from "react";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/MemoryViews/MemoryCard";
import MemoryForm from "../components/MemoryEditor/MemoryForm";
import TimelineView from "../components/MemoryViews/TimelineView";
import MapView from "../components/MemoryViews/MapView";

const MyMemoryCenter = () => {
  const { memories, deleteMemory } = useMemory();

  // === STATE ===
  const [hasAgreed, setHasAgreed] = useState(false);     // For the initial disclaimer
  const [showForm, setShowForm] = useState(false);       // Show/hide the Add/Edit Memory form
  const [editingMemory, setEditingMemory] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterEmotion, setFilterEmotion] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Which main view the user is on: "card", "timeline", or "map"
  const [activeView, setActiveView] = useState("card");

  // === HANDLERS ===
  const handleAddNew = () => {
    setEditingMemory(null);
    setShowForm(true);
  };

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setShowForm(true);
  };

  // === FILTER & SORT LOGIC ===
  const filteredMemories = memories
    .filter((memory) => {
      const lowerTitle = memory.title.toLowerCase();
      const matchesSearch = lowerTitle.includes(searchTerm.toLowerCase());

      const normalizedTags = memory.tags?.map((tag) => tag.toLowerCase()) || [];
      const inputTag = filterTag.replace("#", "").toLowerCase();
      const matchesTag = filterTag ? normalizedTags.includes(inputTag) : true;

      const matchesEmotion = filterEmotion
        ? memory.mood?.toLowerCase() === filterEmotion.toLowerCase()
        : true;

      return matchesSearch && matchesTag && matchesEmotion;
    })
    .sort((a, b) => {
      if (sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        // Default: newest first
        return new Date(b.date) - new Date(a.date);
      }
    });

  // === 1) DISCLAIMER / INTRO SCREEN ===
  if (!hasAgreed) {
    return (
      <div className="p-6 bg-rose-50 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-lg bg-white p-6 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-bold text-rose-600 mb-4">
            Welcome to My Memory Center
          </h1>
          <p className="text-gray-700 mb-4">
            Here, you can reflect on personal memories and emotions. 
            Please note that some recollections could be intense or triggering.
          </p>
          <p className="text-gray-700 mb-4">
            We strongly recommend pairing these exercises with a trusted
            mental health professional or a supportive friend. If you feel
            overwhelmed at any point, consider taking a break or
            reaching out for help.
          </p>
          <p className="text-gray-700 mb-6">
            Before proceeding, please confirm that you understand and feel
            comfortable continuing:
          </p>
          <button
            onClick={() => setHasAgreed(true)}
            className="bg-rose-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-rose-600"
          >
            I Understand, Let Me Begin
          </button>
        </div>
      </div>
    );
  }

  // === 2) MAIN MEMORY CENTER (AFTER user agrees) ===
  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      {/* Header / Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-rose-600">My Memory Center</h1>
        <button
          onClick={handleAddNew}
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
        >
          Add Memory
        </button>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeView === "card"
              ? "bg-rose-600 text-white"
              : "bg-white border text-rose-600"
          }`}
          onClick={() => setActiveView("card")}
        >
          Card View
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeView === "timeline"
              ? "bg-rose-600 text-white"
              : "bg-white border text-rose-600"
          }`}
          onClick={() => setActiveView("timeline")}
        >
          Timeline View
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeView === "map"
              ? "bg-rose-600 text-white"
              : "bg-white border text-rose-600"
          }`}
          onClick={() => setActiveView("map")}
        >
          Map View
        </button>
      </div>

      {/* Add/Edit Memory Form */}
      {showForm && (
        <MemoryForm
          memoryToEdit={editingMemory}
          onClose={() => {
            setEditingMemory(null);
            setShowForm(false);
          }}
        />
      )}

      {/* === CARD VIEW === */}
      {activeView === "card" && (
        <>
          {/* FILTER CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Search by title..."
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by tag (e.g. #joy)"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by emotion (e.g. joyful)"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={filterEmotion}
              onChange={(e) => setFilterEmotion(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>

          {/* CARD GRID */}
          {filteredMemories.length === 0 ? (
            <p className="text-gray-500 italic">
              No memories match your current filters. Try clearing or changing the filters above.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onEdit={handleEdit}
                  onDelete={deleteMemory}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* === TIMELINE VIEW === */}
      {activeView === "timeline" && (
        <TimelineView memories={memories} />
      )}

      {/* === MAP VIEW === */}
      {activeView === "map" && (
        <MapView />
      )}
    </div>
  );
};

export default MyMemoryCenter;
