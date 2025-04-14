import React, { useState } from "react";
import { useMemory } from "../../../../context/MemoryContext";
import MapView from "../../../../components/sections/memorycenter/MapView";
import MemoryCard from "../../../../components/sections/memorycenter/MemoryCard";
import MemoryForm from "../../../../components/sections/memorycenter/MemoryForm";
import TimelineView from "../../../../components/sections/memorycenter/TimelineView";
import AgeTimelineBuilder from "../../../../components/sections/memorycenter/AgeTimelineBuilder"; // ✅ NEW

const MemoryCenter = () => {
  const { memories, deleteMemory } = useMemory();
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterEmotion, setFilterEmotion] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [activeView, setActiveView] = useState("card");

  const handleAddNew = () => {
    setEditingMemory(null);
    setShowForm(true);
  };

  const handleEdit = (memory) => {
    setEditingMemory(memory);
    setShowForm(true);
  };

  const filteredMemories = memories
    .filter((memory) => {
      const lowerTitle = memory.title?.toLowerCase() || "";
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
        return new Date(b.date) - new Date(a.date);
      }
    });

  if (!hasAgreed) {
    return (
      <div className="p-6 bg-rose-50 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-lg bg-white p-6 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-bold text-rose-600 mb-4">Welcome to My Memory Center</h1>
          <p className="text-gray-700 mb-4">
            Here, you can reflect on personal memories and emotions. Please note that some recollections could be intense or triggering.
          </p>
          <p className="text-gray-700 mb-4">
            We strongly recommend pairing these exercises with a trusted mental health professional or a supportive friend. If you feel overwhelmed at any point, consider taking a break or reaching out for help.
          </p>
          <p className="text-gray-700 mb-6">
            Before proceeding, please confirm that you understand and feel comfortable continuing:
          </p>
          <button onClick={() => setHasAgreed(true)} className="bg-rose-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-rose-600">
            I Understand, Let Me Begin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-rose-600">My Memory Center</h1>
        <button onClick={handleAddNew} className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">
          Add Memory
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className={`px-4 py-2 rounded-md ${activeView === "card" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`} onClick={() => setActiveView("card")}>Card View</button>
        <button className={`px-4 py-2 rounded-md ${activeView === "timeline" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`} onClick={() => setActiveView("timeline")}>Timeline View</button>
        <button className={`px-4 py-2 rounded-md ${activeView === "map" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`} onClick={() => setActiveView("map")}>Map View</button>
        <button className={`px-4 py-2 rounded-md ${activeView === "age" ? "bg-rose-600 text-white" : "bg-white border text-rose-600"}`} onClick={() => setActiveView("age")}>Age Timeline</button> {/* ✅ NEW */}
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

      {activeView === "card" && (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-2 md:space-y-0">
            <input type="text" placeholder="Search by title..." className="px-4 py-2 border border-gray-300 rounded-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <input type="text" placeholder="Filter by tag (e.g. #joy)" className="px-4 py-2 border border-gray-300 rounded-md" value={filterTag} onChange={(e) => setFilterTag(e.target.value)} />
            <input type="text" placeholder="Filter by emotion (e.g. joyful)" className="px-4 py-2 border border-gray-300 rounded-md" value={filterEmotion} onChange={(e) => setFilterEmotion(e.target.value)} />
            <select className="px-4 py-2 border border-gray-300 rounded-md" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
      )}

      {activeView === "timeline" && <TimelineView memories={memories} />}
      {activeView === "map" && <MapView />}
      {activeView === "age" && <AgeTimelineBuilder />} {/* ✅ NEW */}
    </div>
  );
};

export default MemoryCenter;
