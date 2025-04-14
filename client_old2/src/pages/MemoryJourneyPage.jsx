import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import this
import JourneyOverview from "../components/MemoryPortal/Journey/JourneyOverview";

const MemoryJourneyPage = () => {
  const navigate = useNavigate(); // 👈 hook it
  const [progress, setProgress] = useState({
    therapistLinked: false,
    chapters: {
      safeMoments: { completed: false },
      rupture: { completed: false },
      joy: { completed: false },
      firsts: { completed: false },
      identity: { completed: false },
      resistance: { completed: false },
      integration: { completed: false },
    },
  });

  const handleChapterClick = (chapter) => {
    if (chapter.requiresProvider && !progress.therapistLinked) {
      alert('This chapter is locked. Please connect with a provider to unlock.');
    } else {
      navigate(`/chapter/${chapter.id}`); // 👈 navigate on click
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 py-10 px-4">
      <JourneyOverview progress={progress} onChapterClick={handleChapterClick} />
    </div>
  );
};

export default MemoryJourneyPage;
