import React from "react";
import classNames from "classnames";

const moodColors = {
  positive: "ring-yellow-300",
  grounded: "ring-green-300",
  hard: "ring-red-300",
  dissociation: "ring-purple-300",
  identity: "ring-blue-300",
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

const MemoryCard = ({ memory, onEdit, onDelete, viewMode = "default" }) => {
  const { title, date, year, image, tags = [], mood } = memory;

  const moodGroup = getMoodGroup(mood);
  const moodRing = moodColors[moodGroup] || "ring-gray-200";

  // 🧠 Safe fallback for date display
  let displayDate = "No date available";
  if (date && !isNaN(new Date(date))) {
    displayDate = new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (year) {
    displayDate = `Year: ${year}`;
  }

  return (
    <div
      className={classNames(
        "rounded-xl shadow-md p-5 space-y-3 bg-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg",
        "ring-2",
        moodRing
      )}
    >
      {image && (
        <img
          src={image}
          alt="memory"
          className="rounded-md w-full h-52 object-cover border border-rose-100"
        />
      )}

      <div className="text-xl font-semibold text-loop-primary">{title}</div>
      <div className="text-sm text-loop-dark/70">{displayDate}</div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded-full text-xs font-medium ${tagColors[getTagTheme(tag)]}`}
          >
            #{tag}
          </span>
        ))}
        {mood && (
          <span
            className="ml-auto px-2 py-1 rounded-full text-xs text-loop-dark bg-white border border-gray-300"
            title={`Mood: ${mood}`}
          >
            {mood}
          </span>
        )}
      </div>

      {viewMode !== "timeline" && (onEdit || onDelete) && (
  <div className="flex justify-end gap-4 pt-2">
    {onEdit && (
      <button
        onClick={() => onEdit(memory)}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        Edit
      </button>
    )}
    {onDelete && (
      <button
        onClick={() => onDelete(memory.id)}
        className="text-red-500 text-sm font-medium hover:underline"
      >
        Delete
      </button>
    )}
  </div>
)}
    </div>
  );
};

export default MemoryCard;
