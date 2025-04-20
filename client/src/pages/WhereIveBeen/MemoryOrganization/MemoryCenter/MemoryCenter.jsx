import React, { useState } from "react";
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useMemory } from "@/context/MemoryContext";
import MapView from "@/components/sections/memorycenter/MapView";
import MemoryCard from "@/components/sections/memorycenter/MemoryCard";
import MemoryForm from "@/components/sections/memorycenter/MemoryForm";
import TimelineView from "@/components/sections/memorycenter/TimelineView";
import AgeTimelineBuilder from "@/components/sections/memorycenter/AgeTimelineBuilder";
import loopLogoLarge from '@/assets/loop-logo-large2.png';

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
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });

  if (!hasAgreed) {
    return (
      <LayoutWrapper hideHeader>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-body">
        <div className="max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center space-y-6 transform scale-[1.8] transition-transform duration-500 ease-in-out">
        <img src={loopLogoLarge} className="mx-auto w-44 sm:w-56 opacity-90" />
            <h1 className="text-2xl font-bold text-accent-dark">Welcome to My Memory Center</h1>
            <p>
              Here, you can reflect on personal memories and emotions. Please note that some recollections could be intense or triggering.
            </p>
            <p>
              We strongly recommend pairing these exercises with a trusted mental health professional or a supportive friend.
            </p>
            <p>
              Before proceeding, please confirm that you understand and feel comfortable continuing:
            </p>
            <button
              onClick={() => setHasAgreed(true)}
              className="bg-accent-dark text-white px-6 py-2 rounded-md font-semibold hover:bg-theme transition"
            >
              I Understand, Let Me Begin
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper hideHeader>
      <div className="transform scale-[1.1] origin-top px-6 sm:px-12 min-h-screen text-body">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-10">
            <h1 className="text-2xl font-semibold text-accent-dark">My Memory Center</h1>
            <p className="text-lg text-loop-dark mt-2">
  Reflect, revisit, and reclaim the moments that shaped you.
</p>
<p className="text-sm text-accent-dark mt-1 italic">
  This space is yours. Move gently.
</p>
            <button
              onClick={handleAddNew}
              className="bg-accent-dark text-white px-4 py-2 rounded-md hover:bg-theme"
            >
              Add Memory
            </button>
          </div>
  
          {/* View Switcher */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {["card", "timeline", "map", "age"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 rounded-md ${
                  activeView === view
                    ? "bg-accent-dark text-white"
                    : "bg-white border text-accent-dark"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </button>
            ))}
          </div>
  
          {/* Memory Form */}
          {showForm && (
            <MemoryForm
              memoryToEdit={editingMemory}
              onClose={() => {
                setEditingMemory(null);
                setShowForm(false);
              }}
            />
          )}
  
          {/* Memory View */}
          {activeView === "card" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-2 md:space-y-0">
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="px-4 py-2 border border-card rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Filter by tag (e.g. #joy)"
                  className="px-4 py-2 border border-card rounded-md"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Filter by emotion (e.g. joyful)"
                  className="px-4 py-2 border border-card rounded-md"
                  value={filterEmotion}
                  onChange={(e) => setFilterEmotion(e.target.value)}
                />
                <select
                  className="px-4 py-2 border border-card rounded-md"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          {activeView === "age" && <AgeTimelineBuilder />}
        </div>
      </div>
    </LayoutWrapper>
  );  
};

export default MemoryCenter;
