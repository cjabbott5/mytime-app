import React, { useState } from 'react';
import { useUserData } from '@/context/UserDataContext'; // ✅ Correct import
import { updateUserData as saveToFirebase } from '@/config/firebase'; // Optional alias for clarity

const SleepEditor = () => {
  const { userData, updateUserData } = useUserData(); // ✅ Correct usage
  const [hours, setHours] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSave = () => {
    const updatedLog = userData.sleepLog?.filter(entry => entry.day !== today) || [];
    updatedLog.push({ day: today, hours: parseFloat(hours) });

    const updatedData = { ...userData, sleepLog: updatedLog };
    updateUserData(updatedData);   // local context update
    saveToFirebase(updatedData);   // Firebase sync (optional)
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      <label className="text-sm font-medium">Hours Slept Today</label>
      <input
        type="number"
        step="0.1"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleSave}
        className="bg-pink-500 text-white rounded px-3 py-1 hover:bg-pink-600"
      >
        Save
      </button>
    </div>
  );
};

export default SleepEditor;
