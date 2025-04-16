import React, { useState } from 'react';
import { FaSadTear, FaFrown, FaMeh, FaSmile, FaLaugh } from 'react-icons/fa';
import { useUserData } from '@/context/UserDataContext'; // ✅ Correct import
import { updateUserData as saveToFirebase } from '@/config/firebase'; // Optional rename for clarity

const MoodSelector = () => {
  const { userData, updateUserData } = useUserData(); // ✅ Correct hook usage
  const [selectedMood, setSelectedMood] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const moodIcons = [FaSadTear, FaFrown, FaMeh, FaSmile, FaLaugh];

  const handleMoodSelect = (rating) => {
    const updatedLog = userData.moodLog?.filter(entry => entry.date !== today) || [];
    updatedLog.push({ mood: rating, date: today });

    const updatedData = { ...userData, moodLog: updatedLog };
    updateUserData(updatedData);       // Local context update
    saveToFirebase(updatedData);       // Push to Firebase (optional but good)
    setSelectedMood(rating);
  };

  return (
    <div className="flex justify-around p-4">
      {moodIcons.map((Icon, i) => (
        <button
          key={i}
          onClick={() => handleMoodSelect(i + 1)}
          className={`text-3xl transition-colors duration-200 ${
            selectedMood === i + 1 ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
