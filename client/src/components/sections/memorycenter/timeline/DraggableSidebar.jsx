import React from 'react';

const DraggableSidebar = ({ itemTypes, selectedTone, handleDragStart, toneColors }) => {
  return (
    <div className="flex gap-4 mb-6">
      {itemTypes.map(({ type, icon }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => handleDragStart(e, type)}
          className="cursor-grab w-16 h-16 rounded-full text-2xl flex items-center justify-center shadow hover:scale-105 transition"
          title={type}
          style={{ backgroundColor: toneColors[selectedTone] }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default DraggableSidebar;
