import React, { useEffect, useState } from "react";
import { useMemory } from "../../context/MemoryContext";
import { format } from "date-fns";

const initialForm = {
  title: "",
  date: "",
  image: "",
  tags: [],
  mood: "",
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

const MemoryForm = ({ memoryToEdit = null, onClose }) => {
  const { addMemory, updateMemory } = useMemory();
  const [formData, setFormData] = useState(initialForm);
  const [previewImg, setPreviewImg] = useState("");

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Memory title..."
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-200 rounded-md"
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-200 rounded-md"
      />

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {previewImg && (
        <img
          src={previewImg}
          alt="preview"
          className="rounded-md mt-2 max-h-48 object-cover"
        />
      )}

      {/* Tags */}
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
                  ? "bg-purple-300 text-white"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Selector */}
      <div>
        <label className="text-sm text-gray-600 block mb-1">Mood:</label>
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded-md"
        >
          <option value="">Select mood...</option>
          {moodOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <textarea
        name="content"
        placeholder="Write more about this memory..."
        value={formData.content}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border border-gray-200 rounded-md"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 text-sm"
        >
          {memoryToEdit ? "Update Memory" : "Add Memory"}
        </button>
      </div>
    </form>
  );
};

export default MemoryForm;
