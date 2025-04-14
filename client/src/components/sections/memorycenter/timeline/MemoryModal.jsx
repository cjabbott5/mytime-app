import React from 'react';

const MemoryModal = ({
  selectedItem,
  setSelectedItem,
  handleSave,
  handleDelete,
  toneColors,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit {selectedItem.type}</h2>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full mb-4 border p-2 rounded"
          value={selectedItem.label}
          onChange={(e) =>
            setSelectedItem({ ...selectedItem, label: e.target.value })
          }
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          className="w-full mb-4 border p-2 rounded"
          rows="3"
          value={selectedItem.description}
          onChange={(e) =>
            setSelectedItem({ ...selectedItem, description: e.target.value })
          }
        />

        {selectedItem.type === 'Person' && (
          <>
            <label className="block mb-2 font-medium">Person Type</label>
            <select
              className="w-full mb-4 border p-2 rounded"
              value={selectedItem.personType || ''}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, personType: e.target.value })
              }
            >
              <option value="">Select</option>
              {[
                'Family',
                'Friend',
                'Teacher',
                'Therapist',
                'Coach',
                'Stranger',
                'Partner',
                'Classmate',
              ].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </>
        )}

        <label className="block mb-2 font-medium">Tone</label>
        <div className="flex gap-2 mb-4">
          {Object.entries(toneColors).map(([tone, color]) => (
            <button
              key={tone}
              className={`px-3 py-1 rounded-full text-white ${
                selectedItem.tone === tone ? 'ring-2 ring-black' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() =>
                setSelectedItem({ ...selectedItem, tone })
              }
            >
              {tone}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            className="bg-rose-500 text-white px-4 py-2 rounded"
            onClick={() => handleSave(selectedItem)}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setSelectedItem(null)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDelete(selectedItem.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;
