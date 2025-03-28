import React from "react";

const moodColors = {
  positive: "bg-yellow-100",
  grounded: "bg-green-100",
  hard: "bg-red-100",
  dissociation: "bg-purple-100",
  identity: "bg-blue-100",
};

const tagColors = {
  life: "bg-purple-100 text-purple-800",
  people: "bg-cyan-100 text-cyan-800",
  theme: "bg-pink-100 text-pink-800",
  event: "bg-orange-100 text-orange-800",
  good: "bg-yellow-100 text-yellow-800",
  growth: "bg-lime-100 text-lime-800",
};

const getMoodGroup = (mood) => {
  const m = mood?.toLowerCase();
  if (["joyful", "hopeful", "playful", "curious", "proud"].includes(m)) return "positive";
  if (["calm", "grateful", "relieved", "present"].includes(m)) return "grounded";
  if (["scared", "angry", "sad", "ashamed", "anxious", "numb"].includes(m)) return "hard";
  if (["dissociated", "foggy", "out of body", "detached"].includes(m)) return "dissociation";
  if (["confused", "lost", "overwhelmed", "powerless"].includes(m)) return "identity";
  return "";
};

const getTagTheme = (tag) => {
  const t = tag?.toLowerCase();
  if (["childhood", "teen", "adulthood", "school", "college", "career"].includes(t)) return "life";
  if (["family", "friends", "relationship", "therapist", "caregivers"].includes(t)) return "people";
  if (["trauma", "healing", "identity", "religion", "queer", "gender"].includes(t)) return "theme";
  if (["milestone", "loss", "abuse", "hospital", "conflict", "breakup"].includes(t)) return "event";
  if (["joy", "love", "achievement", "safety", "euphoria"].includes(t)) return "good";
  if (["insight", "boundaries", "recovery", "firsts", "transformation"].includes(t)) return "growth";
  return "life";
};

const MemoryCard = ({ memory, onEdit, onDelete }) => {
  const { title, date, image, tags = [], mood } = memory;
  const moodGroup = getMoodGroup(mood);
  const moodColor = moodColors[moodGroup] || "bg-gray-100";

  return (
    <div className={`rounded-lg shadow-md p-4 space-y-2 ${moodColor}`}>
      {image && (
        <img
          src={image}
          alt="memory"
          className="rounded-md w-full h-48 object-cover"
        />
      )}
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{new Date(date).toDateString()}</div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded-full text-xs ${tagColors[getTagTheme(tag)]}`}
          >
            #{tag}
          </span>
        ))}
        {mood && (
          <span className="ml-auto bg-white border px-2 py-1 rounded-full text-xs text-gray-700">
            {mood}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => onEdit(memory)}
          className="text-blue-500 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(memory.id)}
          className="text-red-400 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;