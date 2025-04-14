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

const TeenProfileBuilder = ({ responses }) => {
  if (!responses) return null;

  const { environment, identity, sensory, emotional } = responses;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-rose-600">Your Teen Profile</h2>
        <p className="text-gray-600 italic">Built from your memory journey.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Environment">
          <p><strong>Home Life:</strong> {environment?.homeLife || <Placeholder />}</p>
          <p><strong>School Experience:</strong> {environment?.schoolExperience || <Placeholder />}</p>
          <p><strong>Freedom:</strong> {environment?.freedom || <Placeholder />}</p>
        </SectionCard>

        <SectionCard title="Identity">
          <p><strong>You described yourself as:</strong> {identity?.selfDescription || <Placeholder />}</p>
          <p><strong>Others saw you as:</strong> {identity?.othersView || <Placeholder />}</p>
          <p><strong>Shifts or challenges:</strong> {identity?.identityShift || <Placeholder />}</p>
        </SectionCard>

        <SectionCard title="Sensory & Connection">
          <p><strong>Closest person:</strong> {sensory?.closePerson || <Placeholder />}</p>
          <p><strong>Anchors:</strong> {sensory?.sensoryAnchor || <Placeholder />}</p>
          <p><strong>Comforts:</strong> {sensory?.comforts || <Placeholder />}</p>
        </SectionCard>

        <SectionCard title="Emotional Memory">
          {emotional?.coreMemory ? (
            <>
              <blockquote className="italic text-gray-700 bg-rose-50 border-l-4 border-rose-300 pl-4 py-2 rounded">
                “{emotional.coreMemory}”
              </blockquote>
              <p className="text-sm text-gray-500 italic">
                Tone: {emotional.emotionTone || "Not specified"}
              </p>
            </>
          ) : (
            <Placeholder text="You weren’t ready to share this yet." />
          )}
        </SectionCard>
      </div>

      <p className="text-center text-sm text-gray-400 italic mt-4">
        You can always revisit and reflect more later.
      </p>
    </div>
  );
};

export default TeenProfileBuilder;
