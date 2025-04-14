import React from 'react';
import MemoryItem from './MemoryItem';

type Tone = 'Positive' | 'Neutral' | 'Negative';

type MemoryItemType = {
  id: number;
  type: string;
  icon: string;
  label: string;
  description: string;
  tone: Tone;
  tags: string[];
  personType: string;
};

type UnknownAgeZoneProps = {
  unknownItems: MemoryItemType[];
  handleDrop: (e: React.DragEvent, age: 'unknown') => void;
  setSelectedItem: (item: MemoryItemType) => void;
  setHoveredItem: (item: MemoryItemType | null) => void;
  toneColors: Record<Tone, string>;
  hoveredItem: MemoryItemType | null;
};

const UnknownAgeZone: React.FC<UnknownAgeZoneProps> = ({
  unknownItems,
  handleDrop,
  setSelectedItem,
  setHoveredItem,
  toneColors,
  hoveredItem,
}) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, 'unknown')}
      className="fixed bottom-0 left-0 w-full p-4 border-t-2 border-dashed border-rose-300 bg-rose-50 z-40"
    >
      <h3 className="text-center font-semibold text-rose-700 mb-2 text-lg">
        Unknown Age
      </h3>
      <div className="flex gap-3 justify-center flex-wrap">
        {unknownItems.map((item) => (
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
  );
};

export default UnknownAgeZone;
