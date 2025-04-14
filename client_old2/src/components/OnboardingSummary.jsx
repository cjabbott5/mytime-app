import React from 'react';
import { useUserData } from '../context/UserDataContext';

const OnboardingSummary = ({ onBack, onFinish }) => {
  const { userData } = useUserData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">Review Your Info</h2>
      <p className="text-gray-600">
        Here's what you've shared. You can go back to make any changes or begin your journey.
      </p>

      <div className="bg-gray-50 p-4 rounded-md space-y-4 text-left max-h-[50vh] overflow-y-auto">
        {userData && typeof userData === 'object' ? (
          Object.entries(userData).map(([stepId, value], idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-rose-500 uppercase">
                {stepId.replace(/_/g, ' ')}
              </h3>
              {typeof value === 'object' && !Array.isArray(value) ? (
                Object.entries(value).map(([key, val], i) => (
                  <p key={i} className="ml-2">
                    <span className="text-sm text-gray-500">{key.replace(/_/g, ' ')}:</span>{' '}
                    <span className="text-gray-800">
                      {val || <em className="text-gray-400">[Not Provided]</em>}
                    </span>
                  </p>
                ))
              ) : (
                <p className="text-gray-800">
                  {Array.isArray(value) ? value.join(', ') : value}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No data available.</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="text-rose-600 hover:underline">
          Back
        </button>
        <button
          onClick={() => {
            console.log('✅ Confirm button clicked');
            onFinish();
          }}
          className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default OnboardingSummary;
