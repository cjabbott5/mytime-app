import React, { useState } from "react";
import { useMemory } from "../context/MemoryContext";
import MemoryCard from "../components/MemoryViews/MemoryCard";
import MemoryForm from "../components/MemoryEditor/MemoryForm";
import TimelineView from "../components/MemoryViews/TimelineView";
import MapView from "../components/MemoryViews/MapView";
import WelcomeScreen from "../components/MemoryViews/WelcomeScreen"; // ✅ NEW

const MyMemoryCenter = () => {
  const { memories, deleteMemory } = useMemory();
  const [showForm, setShowForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterEmotion, setFilterEmotion] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const [activeView, setActiveView] = useState("card");

  // ✅ New: welcome screen flags per view
  const [showWelcome, setShowWelcome] = useState({
    card: true,
    timeline: true,
    map: true,
  });

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingMemory(null);
    setShowForm(true);
  };

  const filteredMemories = memories
    .filter((memory) => {
      const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase());
      const normalizedTags = memory.tags?.map((tag) => tag.toLowerCase()) || [];
      const inputTag = filterTag.replace("#", "").toLowerCase();
      const matchesTag = filterTag ? normalizedTags.includes(inputTag) : true;
      const matchesEmotion = filterEmotion
        ? memory.mood?.toLowerCase() === filterEmotion.toLowerCase()
        : true;

      return matchesSearch && matchesTag && matchesEmotion;
    })
    .sort((a, b) => {
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      else return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-rose-600">My Memory Center</h1>
        <button
          onClick={handleAddNew}
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
        >
          Add Memory
        </button>
      </div>

      {/* 🔀 VIEW SWITCHER TABS */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${activeView === "card" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`}
          onClick={() => setActiveView("card")}
        >
          Card View
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeView === "timeline" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`}
          onClick={() => setActiveView("timeline")}
        >
          Timeline View
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeView === "map" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`}
          onClick={() => setActiveView("map")}
        >
          Map View
        </button>
      </div>

      {showForm && (
        <MemoryForm
          memoryToEdit={editingMemory}
          onClose={() => {
            setEditingMemory(null);
            setShowForm(false);
          }}
        />
      )}

      {/* ✨ WelcomeScreen for each view */}

      {activeView === "card" && showWelcome.card ? (
        <WelcomeScreen
          title="Welcome to Card View"
          description="This view displays your memories as individual cards. Some may feel intense. Consider working with a therapist while using this feature."
          onContinue={() => setShowWelcome((prev) => ({ ...prev, card: false }))}
          onCancel={() => setActiveView("")}
        />
      ) : activeView === "card" ? (
        <>
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
      ) : null}

      {activeView === "timeline" && showWelcome.timeline ? (
        <WelcomeScreen
          title="Welcome to Timeline View"
          description="This chronological view may surface difficult memories. Please take care of yourself and proceed at your own pace."
          onContinue={() => setShowWelcome((prev) => ({ ...prev, timeline: false }))}
          onCancel={() => setActiveView("")}
        />
      ) : activeView === "timeline" ? (
        <TimelineView memories={memories} />
      ) : null}

      {activeView === "map" && showWelcome.map ? (
        <WelcomeScreen
          title="Welcome to Map View"
          description="This emotional map helps you visualize feelings across your memories. Please proceed gently and ground yourself as needed."
          onContinue={() => setShowWelcome((prev) => ({ ...prev, map: false }))}
          onCancel={() => setActiveView("")}
        />
      ) : activeView === "map" ? (
        <MapView />
      ) : null}
    </div>
  );
};

export default MyMemoryCenter;
