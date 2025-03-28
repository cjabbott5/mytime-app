// src/components/MemoryPortal/MemoryEntry.jsx
import React, { useState } from 'react';
import { useMemory } from '../../context/MemoryContext';

const MemoryEntry = () => {
  const { setCurrentStep, addMemory } = useMemory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    const newMemory = {
      title,
      description,
      date: new Date().toISOString(),
      mood: '', // optionally add mood tags later
      tags: [],
    };

    if (image) {
      // For now, just log image — add Firebase upload later
      console.log('Image file selected:', image);
    }

    addMemory(newMemory); // Save to Firebase
    setCurrentStep(3);    // Move to reflection
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-pink-700">
        Describe a memory you'd like to add
      </h2>

      <input
        type="text"
        placeholder="Give this memory a title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded border border-gray-300"
      />

      <textarea
        placeholder="Describe the memory in your own words…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full min-h-[180px] p-3 rounded border border-gray-300"
      />

      <div>
        <label className="block text-sm mb-1">Upload an image (optional):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          className="text-sm text-gray-500 underline"
          onClick={() => setCurrentStep(3)}
        >
          Skip for now
        </button>
        <button
          onClick={handleSave}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default MemoryEntry;
