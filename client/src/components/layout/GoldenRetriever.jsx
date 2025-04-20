import React, { useState, useEffect } from 'react';
import goldenRetriever from '../../assets/golden-retriever.gif';
import ResizableGif from '../ui/ResizableGif';
import Modal from '../ui/Modal'; // Reusable component for assistant UI

export default function GoldenRetriever() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');

  // Load stored name 
  useEffect(() => {
    const savedName = localStorage.getItem('goldenName');
    setName(savedName || "Sunny"); // default fallback
  }, []);
  

  return (
    <>
      {/* Golden Retriever Avatar */}
      <div
        className="fixed top-12 left-4 z-30 cursor-pointer"
        onClick={() => setShowModal(true)}
        title={`Click ${name} to open your assistant`}
      >
        <ResizableGif gif={goldenRetriever} />
      </div>

      {/* Assistant Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={`Hi, I'm ${name}!`}>
          <p className="mb-4">How can I support you right now?</p>
          <div className="space-y-2">
            <button
              className="w-full p-2 bg-pink-200 rounded"
              onClick={() => alert("Opening grounding tools...")}
            >
              🌿 Ground Me
            </button>
            <button
              className="w-full p-2 bg-blue-200 rounded"
              onClick={() => alert("Starting reflection...")}
            >
              🪞 Gentle Reflection
            </button>
            <button
              className="w-full p-2 bg-yellow-100 rounded"
              onClick={() => alert("Launching journaling...")}
            >
              📓 Start Journaling
            </button>
            <button
              className="w-full p-2 bg-gray-100 rounded"
              onClick={() => setShowModal(false)}
            >
              ❌ Not now
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
