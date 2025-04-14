import React from "react";

const Placeholder = ({ text = "Not answered" }) => (
  <span className="text-gray-400 italic">{text}</span>
);

const YoungAdultProfileBuilder = ({ responses = {} }) => {
  const env = responses?.environment || {};
  const id = responses?.identity || {};
  const sensory = responses?.sensory || {};
  const emotional = responses?.emotional?.memory;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-rose-600 mb-1">
        Your Young Adult Profile
      </h2>
      <p className="text-gray-500 italic mb-6">
        Built from your memory journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Environment */}
        <div className="border border-rose-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-rose-500 mb-2">Environment</h3>
          <p>
            <strong>Home/College Setting:</strong> {env?.home || <Placeholder />}
          </p>
          <p>
            <strong>Big Change:</strong> {env?.milestone || <Placeholder />}
          </p>
        </div>

        {/* Identity */}
        <div className="border border-rose-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-rose-500 mb-2">Identity</h3>
          <p>
            <strong>Who you were becoming:</strong>{" "}
            {id?.self || <Placeholder />}
          </p>
          <p>
            <strong>Struggles or shifts:</strong>{" "}
            {id?.struggles || <Placeholder />}
          </p>
        </div>

        {/* Sensory / People */}
        <div className="border border-rose-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-rose-500 mb-2">
            Sensory & Connection
          </h3>
          <p>
            <strong>Closest person:</strong>{" "}
            {sensory?.person || <Placeholder />}
          </p>
          <p>
            <strong>Music / memory triggers:</strong>{" "}
            {sensory?.triggers || <Placeholder />}
          </p>
        </div>

        {/* Emotional memory */}
        <div className="border border-rose-200 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-rose-500 mb-2">Emotional Memory</h3>
          <div className="bg-rose-50 px-4 py-3 rounded">
            <em>
              {emotional ? `"${emotional}"` : <Placeholder text="Not captured" />}
            </em>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6 italic">
        You can always revisit and add more later.
      </p>
    </div>
  );
};

export default YoungAdultProfileBuilder;
