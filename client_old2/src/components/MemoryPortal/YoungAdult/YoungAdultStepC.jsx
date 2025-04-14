import React from 'react';

const YoungAdultStepC = ({ data, setData, onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">[Young Adult] Environment</h2>
      <p className="text-gray-600">This is a placeholder. You can customize this step later.</p>
      <button onClick={onNext} className="mt-4 px-4 py-2 bg-rose-500 text-white rounded">Next</button>
    </div>
  );
};

export default YoungAdultStepC;
