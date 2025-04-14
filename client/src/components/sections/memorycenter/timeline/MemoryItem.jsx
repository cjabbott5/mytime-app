import React from 'react';

const MemoryItem = ({
  item,
  toneColors,
  onClick,
  onHoverStart,
  onHoverEnd,
  isHovered,
}) => {
  return (
    <div
      className="cursor-pointer px-2 py-1 rounded-full text-white text-xl relative"
      style={{ backgroundColor: toneColors[item.tone] || '#ccc' }}
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {item.icon}
      {isHovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs bg-white border p-2 rounded shadow w-max z-[999] text-gray-800 max-w-[240px] whitespace-normal">
          <div className="font-bold">{item.label || 'Untitled'}</div>
          <div className="italic text-sm mb-1">{item.tone}</div>
          <div className="text-xs">
            {item.description?.slice(0, 80) || 'No description'}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryItem;
