import React from 'react';

const ReflectionStep = ({ memoryDraft, setMemoryDraft, onNext, onBack }) => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-pink-700">Reflection</h2>

      <p className="text-gray-600">What do you want to remember about this?</p>

      <textarea
        value={memoryDraft.reflection}
        onChange={(e) =>
          setMemoryDraft((prev) => ({ ...prev, reflection: e.target.value }))
        }
        className="w-full min-h-[140px] p-3 rounded border border-gray-300"
        placeholder="Write your reflection..."
      />

      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          checked={memoryDraft.isPrivate}
          onChange={(e) =>
            setMemoryDraft((prev) => ({
              ...prev,
              isPrivate: e.target.checked,
            }))
          }
        />
        <span>Mark this memory as private</span>
      </label>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="text-sm text-gray-500 underline">
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReflectionStep;
