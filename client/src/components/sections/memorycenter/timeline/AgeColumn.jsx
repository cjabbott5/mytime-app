import React from 'react';
import { Rnd } from 'react-rnd';
import MemoryItem from './MemoryItem';

const getAgeLabel = (age) => {
  if (age <= 3) return 'Infancy';
  if (age <= 6) return 'Early Childhood';
  if (age <= 12) return 'Middle Childhood';
  if (age <= 17) return 'Teen Years';
  return 'Young Adulthood';
};

const AgeColumn = ({
  age,
  items,
  width,
  handleDrop,
  handleResizeStop,
  setSelectedItem,
  hoveredItem,
  setHoveredItem,
  toneColors,
}) => {
  return (
    <Rnd
      size={{ width, height: 'auto' }}
      enableResizing={{ right: true }}
      disableDragging
      onResizeStop={(e, dir, ref, delta, pos) =>
        handleResizeStop(e, dir, ref, delta, pos, age)
      }
      className="bg-rose-50 border border-rose-200 rounded-lg p-2"
    >
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, age)}
      >
        <div className="text-center text-xs text-gray-500 font-semibold mb-1">
          {getAgeLabel(age)}
        </div>
        <div className="text-center font-bold mb-2">Age {age}</div>
        <div className="flex flex-col items-center gap-2">
          {items.map((item) => (
            <MemoryItem
              key={item.id}
              item={item}
              toneColors={toneColors}
              onClick={() => setSelectedItem(item)}
              onHoverStart={() => setHoveredItem(item)}
              onHoverEnd={() => setHoveredItem(null)}
              isHovered={hoveredItem?.id === item.id}
            />
          ))}
        </div>
      </div>
    </Rnd>
  );
};

export default AgeColumn;
