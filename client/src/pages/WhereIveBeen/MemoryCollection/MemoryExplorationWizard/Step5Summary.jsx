import React, { useState } from 'react';

const Step5Summary = ({ responses, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');

  const handleSaveClick = () => {
    const memory = {
      title,
      description,
      age,
      ...responses,
      createdAt: new Date().toISOString()
    };
    onSave(memory);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Step 5: Finalize Your Memory</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Memory Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., That Night I Was Ignored"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Age or Age Range</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 8-10"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Memory Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Optional notes or a description of the memory."
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Your Selections</h3>
          <div className="space-y-2">
            {Object.entries(responses).map(([key, values]) => (
              <div key={key}>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {values.map((val, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleSaveClick}
            className="px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700"
          >
            Save to My Memory Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;
