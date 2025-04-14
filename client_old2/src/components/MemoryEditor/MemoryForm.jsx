import React, { useEffect, useState } from "react";
import { useMemory } from "../../context/MemoryContext";
import { FaCalendarAlt } from "react-icons/fa";
import MemoryCard from "../MemoryViews/MemoryCard"; // Assuming this shows a memory preview card

const initialForm = {
  title: "",
  date: "",
  image: "",
  tags: [],
  moods: [],
  content: "",
};

const moodOptions = [
  "joyful", "hopeful", "playful", "curious", "proud",
  "calm", "grateful", "present", "relieved",
  "scared", "angry", "sad", "ashamed", "anxious", "numb",
  "dissociated", "foggy", "out of body", "detached",
  "confused", "lost", "overwhelmed", "powerless"
];

const tagPresets = [
  "childhood", "teen", "adulthood", "school", "college", "career",
  "family", "friends", "relationship", "therapist", "caregivers",
  "trauma", "healing", "identity", "religion", "queer", "gender",
  "milestone", "loss", "abuse", "hospital", "conflict", "breakup",
  "joy", "love", "achievement", "safety", "euphoria",
  "insight", "boundaries", "recovery", "firsts", "transformation"
];

const colorMap = {
  joyful: "bg-yellow-200 text-yellow-800",
  sad: "bg-blue-200 text-blue-800",
  angry: "bg-red-200 text-red-800",
  hopeful: "bg-green-200 text-green-800",
  scared: "bg-indigo-200 text-indigo-800",
  calm: "bg-teal-200 text-teal-800",
  numb: "bg-gray-200 text-gray-800",
  default: "bg-purple-100 text-purple-800",
};

const MemoryForm = ({ memoryToEdit = null, onClose }) => {
  const { addMemory, updateMemory } = useMemory();
  const [formData, setFormData] = useState(initialForm);
  const [previewImg, setPreviewImg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (memoryToEdit) {
      setFormData(memoryToEdit);
      setPreviewImg(memoryToEdit.image);
    }
  }, [memoryToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleMoodsChange = (mood) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setUploadError("Upload failed: Image is too big. Please choose a file under 1MB.");
      return;
    }
    setUploadError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadError) return;
    if (memoryToEdit) {
      updateMemory(memoryToEdit.id, formData);
    } else {
      addMemory(formData);
    }
    onClose();
    setFormData(initialForm);
    setPreviewImg("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-rose-600">
        {memoryToEdit ? "Edit Memory" : "Add New Memory"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Memory title..."
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-200 rounded-md"
      />

      <div className="relative w-full">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 pr-10 border border-gray-200 rounded-md"
        />
        <FaCalendarAlt className="absolute right-3 top-3 text-pink-500 pointer-events-none" />
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadError && (
        <div className="text-sm text-red-500 mt-1 bg-red-100 px-3 py-2 rounded">
          {uploadError}
        </div>
      )}
      {previewImg && (
        <img
          src={previewImg}
          alt="preview"
          className="rounded-md mt-2 max-h-48 object-cover"
        />
      )}

      <div className="space-y-1">
        <div className="text-sm text-gray-600">Tags:</div>
        <div className="flex flex-wrap gap-2">
          {tagPresets.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagsChange(tag)}
              className={`px-2 py-1 rounded-full text-xs ${
                formData.tags.includes(tag)
                  ? colorMap[tag] || colorMap.default
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm text-gray-600">Moods:</div>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map((mood) => (
            <button
              type="button"
              key={mood}
              onClick={() => handleMoodsChange(mood)}
              className={`px-2 py-1 rounded-full text-xs ${
                formData.moods.includes(mood)
                  ? colorMap[mood] || colorMap.default
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="content"
        placeholder="Write more about this memory..."
        value={formData.content}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border border-gray-200 rounded-md"
      />

      <div className="flex justify-between items-center gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-pink-200 text-pink-800 rounded-md text-sm hover:bg-pink-300"
          >
            Preview Memory
          </button>
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 text-sm"
          >
            {memoryToEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Modal Preview */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <MemoryCard memory={{ ...formData, id: "preview" }} />
          </div>
        </div>
      )}
    </form>
  );
};

export default MemoryForm;
