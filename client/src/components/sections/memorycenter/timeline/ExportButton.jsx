import React from 'react';

const ExportButton = ({ handleExport }) => {
  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 text-white px-4 py-2 rounded shadow"
    >
      Export Timeline
    </button>
  );
};

export default ExportButton;
