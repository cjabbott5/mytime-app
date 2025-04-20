import React, { useState } from 'react';
import goldenRetriever from '../../assets/golden-retriever.gif';
import ResizableGif from '../ui/ResizableGif';

export default function GoldenRetriever() {
  const [hearts, setHearts] = useState([]);

  // Create new hearts on click
  const dropHeart = () => {
    const id = Date.now();
    // Random left position between 5% and 95%
    const left = Math.random() * 90 + 5;
    setHearts(prev => [...prev, { id, left }]);

    // Remove each heart after 3s
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 3000);
  };

  return (
    <>
      {/* Floating hearts */}
      {hearts.map((heart) => (
  <div
    key={heart.id}
    className="absolute text-3xl text-white animate-float-down z-40 select-none drop-shadow-[0_0_2px_#1C3F66]"
    style={{ left: `${heart.left}%`, top: '80px' }}
  >
    ♥
  </div>
))}

      {/*
        The “fixed” container sets an initial position on the page.
        onClick -> dropHeart
        Inside this <div>, we render <ResizableGif> which uses Rnd to handle drag + resize.
      */}
      <div
        className="fixed top-12 left-4 z-30 cursor-pointer"
        onClick={dropHeart}
      >
        <ResizableGif gif={goldenRetriever} />
      </div>
    </>
  );
}
