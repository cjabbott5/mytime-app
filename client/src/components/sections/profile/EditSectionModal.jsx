import { useState } from 'react';
import onboardingCategories from '@/data/onboardingCategories'; // Adjust path if needed

export default function EditSectionModal({ title, initialValues, onSave, sectionKey }) {
  const [selected, setSelected] = useState(initialValues || []);

  // Get prefill options from onboarding
  const category = onboardingCategories.find(cat =>
    cat.fields?.some(field => field.id === sectionKey)
  );
  const options = category?.fields?.find(f => f.id === sectionKey)?.options || [];

  const toggleTag = (tag) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag));
    } else if (selected.length < 3) {
      setSelected([...selected, tag]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">{`Edit ${title}`}</h2>

        <p className="text-sm text-gray-500 mb-3">Select up to 3</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {options.map((option, i) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={i}
                onClick={() => toggleTag(option)}
                className={`px-4 py-2 rounded-full text-sm shadow transition 
                  ${isSelected
                    ? 'bg-pink-600 text-white'
                    : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onSave(selected)}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm"
          >
            Save
          </button>
          <button
            onClick={() => onSave(initialValues)}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
