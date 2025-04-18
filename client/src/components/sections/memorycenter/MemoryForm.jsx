import React, { useEffect, useState } from "react";
import { useMemory } from "../../../context/MemoryContext";
import MemoryCard from "./MemoryCard";
import { Disclosure } from "@headlessui/react";

const initialForm = {
  title: "",
  timeframe: "",
  age: "",
  image: "",
  tags: [],
  moods: [],
  content: "",
};

const tagCategories = {
  "Life Stages": ["childhood", "teen", "adulthood", "school", "college", "career"],
  "People": ["mother",
    "father",
    "step-mother",
    "step-father",
    "other parent",
    "sibling",
    "brother",
    "sister",
    "partner",
    "friend",
    "therapist",
    "teacher",
    "caregiver",
    "grandparent",
    "uncle",
    "aunt",
    "cousin",
    "roommate",
    "boss",
    "coworker",
    "classmate",
    "stranger",
    "other family member"],
  "Themes": ["trauma", "healing", "identity", "religion", "queer", "gender"],
  "Events": [ "milestone",
    "loss",
    "death",
    "grief",
    "abuse",
    "neglect",
    "accident",
    "injury",
    "illness",
    "hospitalization",
    "diagnosis",
    "breakup",
    "divorce",
    "separation",
    "conflict",
    "argument",
    "violence",
    "move",
    "relocation",
    "transition",
    "first day",
    "last day",
    "job change",
    "school transfer",
    "graduation",
    "achievement",
    "award",
    "failure",
    "public speaking",
    "legal issue",
    "financial stress",
    "natural disaster",
    "holiday",
    "anniversary"],
  "Insights": ["insight", "boundaries", "recovery", "firsts", "transformation"],
};

const moodCategories = {
  "Happy / Energized": [
    "excited", "proud", "playful", "joyful", "hopeful", "confident", "content", "peaceful", "relieved"
  ],
  "Loved / Connected": [
    "grateful", "caring", "affectionate", "loving", "supported", "accepted", "valued", "trusting"
  ],
  "Sad / Grieving": [
    "lonely", "disappointed", "guilty", "depressed", "hurt", "discouraged", "rejected", "grieving"
  ],
  "Afraid / Vulnerable": [
    "scared", "worried", "insecure", "anxious", "nervous", "overwhelmed", "shy", "fragile", "tense"
  ],
  "Angry / Frustrated": [
    "angry", "frustrated", "annoyed", "irritated", "offended", "mad", "resentful", "hostile"
  ],
  "Disconnected / Dissociative": [
    "numb", "foggy", "detached", "out of body", "confused", "shut down", "powerless", "blank"
  ]
};

const colorMap = {
  "Life Stages": "bg-blue-100 text-blue-800",
  "People": "bg-green-100 text-green-800",
  "Themes": "bg-purple-100 text-purple-800",
  "Events": "bg-red-100 text-red-800",
  "Insights": "bg-yellow-100 text-yellow-800",
  "Happy / Energized": "bg-green-100 text-green-800",
  "Loved / Connected": "bg-pink-100 text-pink-800",
  "Sad / Grieving": "bg-blue-100 text-blue-800",
  "Afraid / Vulnerable": "bg-yellow-100 text-yellow-800",
  "Angry / Frustrated": "bg-red-100 text-red-800",
  "Disconnected / Dissociative": "bg-gray-100 text-gray-700",
};

const MemoryForm = ({ memoryToEdit = null, onClose }) => {
  const { addMemory, updateMemory } = useMemory();
  const [formData, setFormData] = useState(initialForm);
  const [previewImg, setPreviewImg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (memoryToEdit) {
      const fallbackTags = Array.isArray(memoryToEdit.tags) ? memoryToEdit.tags : [];
      const fallbackMoods = Array.isArray(memoryToEdit.moods) ? memoryToEdit.moods : [];
      setFormData({ ...initialForm, ...memoryToEdit, tags: fallbackTags, moods: fallbackMoods });
      setPreviewImg(memoryToEdit.image);
    }
  }, [memoryToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (tag) => {
    const tags = formData.tags || [];
    setFormData((prev) => ({
      ...prev,
      tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    }));
  };

  const handleMoodsChange = (mood) => {
    const moods = formData.moods || [];
    setFormData((prev) => ({
      ...prev,
      moods: moods.includes(mood) ? moods.filter((m) => m !== mood) : [...moods, mood],
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
  
    const birthYear = 1998; // Replace with user birthYear if available
    let finalYear = parseInt(formData.year);
    let finalAge = parseInt(formData.age);
  
    if (isNaN(finalYear) && !isNaN(finalAge)) {
      finalYear = birthYear + finalAge;
    }
    if (isNaN(finalAge) && !isNaN(finalYear)) {
      finalAge = finalYear - birthYear;
    }
  
    const processedForm = {
      ...formData,
      ...(Number.isInteger(finalYear) && { year: finalYear }),
      ...(Number.isInteger(finalAge) && { age: finalAge }),
    };
  
    console.log("📝 Final form data:", processedForm);
    console.log("➕ Adding new memory...");
  
    if (memoryToEdit) {
      updateMemory(memoryToEdit.id, processedForm);
    } else {
      addMemory(processedForm);
    }
  
    onClose();
    setFormData(initialForm);
    setPreviewImg("");
  };  
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto">
      <p className="text-sm text-gray-700 italic bg-gray-50 rounded-md p-3 mb-4">
        Everything here is optional. Do what you can, when you can.
        If anything feels too intense, the Ground Me button is always available.
        This is your space, at your pace.
      </p>

      <h2 className="text-lg font-semibold text-loop-dark">
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

<div className="space-y-1">
  <label className="text-sm font-medium text-loop-dark block">
    Approximate Timeframe (optional)
  </label>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <input
      type="number"
      name="year"
      placeholder="Year (e.g., 2006)"
      value={formData.year || ""}
      onChange={handleChange}
      className="w-full p-2 border border-gray-200 rounded-md"
    />
    <input
      type="number"
      name="age"
      placeholder="Age (e.g., 11)"
      value={formData.age || ""}
      onChange={handleChange}
      className="w-full p-2 border border-gray-200 rounded-md"
    />
  </div>
  <p className="text-sm text-gray-500">
    You can share either age or year — whichever is easier for you. We'll use your birth year to help map it.
  </p>
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
       {/* Tags grouped by category */}
       <div className="space-y-3">
        <h3 className="text-base font-semibold text-loop-dark">Tags</h3>
        {Object.entries(tagCategories).map(([category, tags]) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="border rounded-md p-3 bg-gray-50">
                <Disclosure.Button className="font-medium text-loop-dark">
                  {category} {open ? "−" : "+"}
                </Disclosure.Button>
                <Disclosure.Panel className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const selected = formData.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagsChange(tag)}
                        className={`px-4 py-2 text-sm rounded-full border transition ${
                          selected
                            ? `ring-2 ring-loop-dark ${colorMap[category]}`
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Moods grouped by category */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-loop-dark">Moods</h3>
        {Object.entries(moodCategories).map(([category, moods]) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="border rounded-md p-3 bg-gray-50">
                <Disclosure.Button className="font-medium text-loop-dark">
                  {category} {open ? "−" : "+"}
                </Disclosure.Button>
                <Disclosure.Panel className="mt-3 flex flex-wrap gap-2">
                  {moods.map((mood) => {
                    const selected = formData.moods.includes(mood);
                    return (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => handleMoodsChange(mood)}
                        className={`px-4 py-2 text-sm rounded-full border transition ${
                          selected
                            ? `ring-2 ring-blue-400 ${colorMap[category]}`
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {mood}
                      </button>
                    );
                  })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Memory content */}
      <textarea
        name="content"
        placeholder="Write more about this memory..."
        value={formData.content}
        onChange={handleChange}
        rows="5"
        className="w-full p-3 border border-gray-300 rounded-md text-base"
      />

      {/* Buttons */}
      <div className="flex justify-between items-center pt-4">
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
            className="px-4 py-2 bg-gray-100 text-loop-dark rounded-md text-sm hover:bg-gray-200"
          >
            Preview Memory
          </button>
          <button
            type="submit"
            className="bg-loop-accent text-white px-4 py-2 rounded-md hover:bg-loop-accent-dark text-sm"
          >
            {memoryToEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Preview overlay */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
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

