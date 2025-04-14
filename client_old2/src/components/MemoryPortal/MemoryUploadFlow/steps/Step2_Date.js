import React, { useState } from "react";

const Step2_Date = ({ data, onNext, onBack, updateData }) => {
  const [selectedDate, setSelectedDate] = useState(data.date || "");
  const [uncertain, setUncertain] = useState(false);

  const handleContinue = () => {
    const dateToSave = uncertain ? "unsure" : selectedDate;
    updateData({ date: dateToSave });
    onNext();
  };

  const handleChildhoodSelect = () => {
    updateData({ date: "childhood" });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        When did this memory happen?
      </h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        Exact dates are not required. Use your best guess, or choose an option below.
      </p>

      <div className="flex flex-col items-center gap-4">
        {!uncertain && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
        )}

        <button
          onClick={() => setUncertain(!uncertain)}
          className="text-sm text-pink-600 hover:underline transition"
        >
          {uncertain ? "Go back to selecting a date" : "I’m not sure of the exact date"}
        </button>

        <button
          onClick={handleChildhoodSelect}
          className="text-sm text-indigo-600 hover:underline transition"
        >
          This happened during childhood
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedDate && !uncertain}
          className="bg-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2_Date;
