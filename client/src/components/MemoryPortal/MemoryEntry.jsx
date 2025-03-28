import React from 'react';

const tagsList = ["childhood", "school", "friends", "joy", "firsts"];
const moods = ["joyful", "sad", "grateful", "angry", "hopeful", "foggy"];

const MemoryEntry = ({ memoryDraft, setMemoryDraft, onNext }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMemoryDraft(prev => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const toggleTag = (tag) => {
    setMemoryDraft(prev => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-pink-700">
        Describe a memory you'd like to add
      </h2>

      <input
        type="text"
        placeholder="Give this memory a title…"
        value={memoryDraft.title}
        onChange={(e) =>
          setMemoryDraft((prev) => ({ ...prev, title: e.target.value }))
        }
        className="w-full p-3 rounded border border-gray-300"
      />

      <textarea
        placeholder="Describe the memory in your own words…"
        value={memoryDraft.description}
        onChange={(e) =>
          setMemoryDraft((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full min-h-[180px] p-3 rounded border border-gray-300"
      />

      <div>
        <label className="block text-sm mb-1">Upload image (optional):</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Select Mood</label>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() =>
                setMemoryDraft((prev) => ({ ...prev, mood: m }))
              }
              className={`px-3 py-1 rounded-full text-sm ${
                memoryDraft.mood === m
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                memoryDraft.tags.includes(tag)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onNext} className="text-sm text-gray-500 underline">
          Skip for now
        </button>
        <button
          onClick={onNext}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default MemoryEntry;
