import React from "react";

const Step1_Environment = ({ data, onUpdate, onNext }) => {
  const handleChange = (e) => {
    onUpdate({ ...data, homeType: e.target.value });
  };

  const handleTextChange = (e) => {
    onUpdate({ ...data, favoriteRoom: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-rose-600">What was your home like growing up?</h2>
        <p className="text-gray-600 mt-1">Choose the type that best matches your childhood environment.</p>
        <div className="mt-4 space-y-2">
          {["House", "Apartment", "Trailer", "Homeless", "Unstable / Moved often"].map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name="homeType"
                value={option}
                checked={data?.homeType === option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium text-rose-600 mb-2">
          Was there a specific room, corner, or object that felt safe or special?
        </label>
        <textarea
          rows="4"
          className="w-full border border-rose-200 rounded-md p-2"
          value={data?.favoriteRoom || ""}
          onChange={handleTextChange}
          placeholder="e.g., My grandma’s rocking chair near the window..."
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1_Environment;
