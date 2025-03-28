import React from "react";

const SectionCard = ({ title, children }) => (
  <div className="bg-white/80 rounded-lg shadow-md p-4 space-y-2 border border-rose-200">
    <h3 className="text-md font-semibold text-rose-600">{title}</h3>
    {children}
  </div>
);

const Placeholder = ({ text = "Not answered" }) => (
  <span className="italic text-gray-400">{text}</span>
);

const ChildhoodProfileBuilder = ({ responses }) => {
  if (!responses) return null;

  const { environment, identity, sensory, emotional } = responses;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-rose-600">Your Childhood Profile</h2>
        <p className="text-gray-600 italic">Built from your memory journey.</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🏠 Environment */}
        <SectionCard title="Environment">
          <p><strong>Home Type:</strong> {environment?.homeType || <Placeholder />}</p>
          <p><strong>Safe Space:</strong> {environment?.favoriteRoom || <Placeholder />}</p>
        </SectionCard>

        {/* 🧍 Identity */}
        <SectionCard title="Identity">
          <p><strong>You described yourself as:</strong> {identity?.selfWords || <Placeholder />}</p>
          <p><strong>Others described you as:</strong> {identity?.othersWords || <Placeholder />}</p>
        </SectionCard>

        {/* 🧠 Sensory + Connection */}
        <SectionCard title="Sensory & Connection">
          <p><strong>Closest person:</strong> {sensory?.closePerson || <Placeholder />}</p>
          <p><strong>Sensory anchors:</strong> {sensory?.sensoryAnchor || <Placeholder />}</p>
        </SectionCard>

        {/* 💭 Emotional Memory */}
        <SectionCard title="Emotional Memory">
          {emotional?.coreMemory ? (
            <blockquote className="italic text-gray-700 bg-rose-50 border-l-4 border-rose-300 pl-4 py-2 rounded">
              “{emotional.coreMemory}”
            </blockquote>
          ) : (
            <Placeholder text="You weren't ready to add this yet (and that’s totally okay)." />
          )}
        </SectionCard>
      </div>

      {/* Footer note */}
      <p className="text-center text-sm text-gray-400 italic">
        You can always revisit and grow this profile later.
      </p>
    </div>
  );
};

export default ChildhoodProfileBuilder;
