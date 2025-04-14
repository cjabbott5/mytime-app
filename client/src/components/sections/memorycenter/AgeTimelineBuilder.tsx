import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  db,
  saveUserData,
  getUserData,
  getCurrentUserId,
} from '../../../config/firebase';
import ToneSelector from './timeline/ToneSelector';
import DraggableSidebar from './timeline/DraggableSidebar';
import AgeColumn from './timeline/AgeColumn';
import UnknownAgeZone from './timeline/UnknownAgeZone';
import MemoryModal from './timeline/MemoryModal';
import ExportButton from './timeline/ExportButton';
import { generateBlankTimeline } from '../../../data/timelineTemplate';
import MoodRibbon from '../../visualizations/MoodRibbon'; // ✅ Mood ribbon import

const toneColors = {
  Positive: '#7ed6a7',
  Neutral: '#cfcfcf',
  Negative: '#f18973',
};

const itemTypes = [
  { type: 'Memory', icon: '💭' },
  { type: 'Person', icon: '👤' },
  { type: 'Location', icon: '📍' },
];

const userId = 'test-user'; // Replace with auth ID if using authentication

// Life stages for age headers
const lifeStages = [
  { label: 'Childhood', start: 0, end: 12 },
  { label: 'Adolescence', start: 13, end: 17 },
  { label: 'Young Adulthood', start: 18, end: 24 },
  { label: 'Adulthood', start: 25, end: 99 },
];

const getStageForAge = (age: number): string => {
  const stage = lifeStages.find((s) => age >= s.start && age <= s.end);
  return stage ? stage.label : '';
};

const DEFAULT_COLUMN_WIDTH = 160;

const AgeTimelineBuilder: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<'Positive' | 'Neutral' | 'Negative'>('Neutral');
  const [timelineData, setTimelineData] = useState<any[]>(generateBlankTimeline());
  const [unknownItems, setUnknownItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTimelineData(data.timeline || generateBlankTimeline());
        setUnknownItems(data.unknown || []);
      }
    };

    fetchTimeline();
  }, []);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('tone', selectedTone);
  };

  const handleDrop = (e: React.DragEvent, age: number | 'unknown') => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const tone = e.dataTransfer.getData('tone') as 'Positive' | 'Neutral' | 'Negative';

    const newItem = {
      id: Date.now(),
      type,
      icon: itemTypes.find((i) => i.type === type)?.icon || '',
      label: '',
      description: '',
      tone,
      tags: [],
      personType: '',
    };

    const numericAge = age === 'unknown' ? 'unknown' : Number(age);

    if (numericAge === 'unknown') {
      setUnknownItems((prev) => [...prev, newItem]);
    } else {
      setTimelineData((prev) =>
        prev.map((entry) =>
          entry.age === numericAge
            ? { ...entry, items: [...entry.items, newItem] }
            : entry
        )
      );
    }

    setSelectedItem(newItem);
  };

  const handleSave = (updatedItem: any) => {
    const updateItems = (items: any[]) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item));

    setTimelineData((prev) =>
      prev.map((entry) => ({
        ...entry,
        items: updateItems(entry.items),
      }))
    );
    setUnknownItems((prev) => updateItems(prev));
    setSelectedItem(null);
  };

  const handleDelete = (itemId: number) => {
    setTimelineData((prev) =>
      prev.map((entry) => ({
        ...entry,
        items: entry.items.filter((item: any) => item.id !== itemId),
      }))
    );
    setUnknownItems((prev) => prev.filter((item: any) => item.id !== itemId));
    setSelectedItem(null);
  };

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    age: number
  ) => {
    const newWidth = ref.offsetWidth;
    setTimelineData((prev) =>
      prev.map((entry) =>
        entry.age === age ? { ...entry, width: newWidth } : entry
      )
    );
  };

  const handleExport = () => {
    const fullData = {
      timeline: timelineData,
      unknown: unknownItems,
    };
    console.log('🧠 Exported Timeline:', JSON.stringify(fullData, null, 2));
    alert('Timeline exported to console!');
  };

  const saveTimelineToFirebase = async () => {
    try {
      await setDoc(doc(db, 'users', userId), {
        timeline: timelineData,
        unknown: unknownItems,
      });
      alert('✅ Timeline saved to Firebase!');
    } catch (error) {
      console.error('Error saving timeline:', error);
      alert('❌ Failed to save.');
    }
  };

  return (
    <div className="p-6 space-y-10 min-h-screen bg-white pb-40">
      <div className="flex justify-between items-center">
        <ToneSelector
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          toneColors={toneColors}
        />
        <div className="flex gap-3">
          <ExportButton handleExport={handleExport} />
          <button
            onClick={saveTimelineToFirebase}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Save to Firebase
          </button>
        </div>
      </div>

      <DraggableSidebar
        itemTypes={itemTypes}
        selectedTone={selectedTone}
        handleDragStart={handleDragStart}
        toneColors={toneColors}
      />

      {/* 🧠 Mood Ribbon */}
      <MoodRibbon
        timelineData={timelineData}
        width={timelineData.length * DEFAULT_COLUMN_WIDTH}
        height={80}
      />

      {/* Timeline container */}
      <div
        className="overflow-x-auto border-t border-gray-200 pt-6 pb-4"
        style={{ overflowX: 'auto', width: '100%' }}
      >
        <div
          className="flex gap-4"
          style={{
            width: `${timelineData.length * DEFAULT_COLUMN_WIDTH}px`,
            minWidth: '100%',
          }}
        >
          {timelineData.map(({ age, items, width }, index) => {
            const showHeader =
              index === 0 ||
              getStageForAge(timelineData[index - 1].age) !== getStageForAge(age);

            return (
              <div
                key={age}
                className="flex flex-col items-center"
                style={{
                  minWidth: width || DEFAULT_COLUMN_WIDTH,
                  width: width || DEFAULT_COLUMN_WIDTH,
                  flexShrink: 0,
                }}
              >
                {showHeader && (
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {getStageForAge(age)}
                  </div>
                )}
                <AgeColumn
                  age={age}
                  items={items}
                  width={width || DEFAULT_COLUMN_WIDTH}
                  handleDrop={handleDrop}
                  handleResizeStop={handleResizeStop}
                  setSelectedItem={setSelectedItem}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  toneColors={toneColors}
                />
              </div>
            );
          })}
        </div>
      </div>

      <UnknownAgeZone
  unknownItems={unknownItems}
  handleDrop={handleDrop}
  setSelectedItem={setSelectedItem}
  setHoveredItem={setHoveredItem}
  hoveredItem={hoveredItem}
  toneColors={toneColors}
/>

      {selectedItem && (
        <MemoryModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          handleSave={handleSave}
          handleDelete={handleDelete}
          toneColors={toneColors}
        />
      )}
    </div>
  );
};

export default AgeTimelineBuilder;
