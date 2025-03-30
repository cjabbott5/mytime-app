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

const AdultProfileBuilder = ({ responses }) => {
  if (!responses) return null;

  const { environment, identity, sensory, emotional } = responses;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-rose-600">Your Adult Profile</h2>
        <p className="text-gray-600 italic">Built from your current reflections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Environment & Roles">
          <p><strong>Living Situation:</strong> {environment?.livingSituation || <Placeholder />}</p>
          <p><strong>Roles & Responsibilities:</strong> {environment?.roles || <Placeholder />}</p>
          <p><strong>What 'Home' Means:</strong> {environment?.definitionOfHome || <Placeholder />}</p>
        </SectionCard>

        <SectionCard title="Identity">
          <p><strong>Current Self:</strong> {identity?.currentSelf || <Placeholder />}</p>
          <p><strong>Change Since Youth:</strong> {identity?.changeFromPast || <Placeholder />}</p>
          <p><strong>Still Exploring:</strong> {identity?.stillExploring || <Placeholder />}</p>
        </SectionCard>

        <SectionCard title="Connection & Sensory">
          <p><strong>Closest Person:</strong> {sensory?.closePerson || <Placeholder />}</p>
          <p><strong>Grounding Things:</strong> {sensory?.groundingThings || <Placeholder />}</p>
          <p><strong>Sensory Anchor:</strong> {sensory?.sensoryAnchor || <Placeholder />}</p>
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
            <Placeholder text="You haven’t recorded one yet." />
          )}
        </SectionCard>
      </div>

      <p className="text-center text-sm text-gray-400 italic mt-4">
        You can return to reflect and expand this anytime.
      </p>
    </div>
  );
};

export default AdultProfileBuilder;
