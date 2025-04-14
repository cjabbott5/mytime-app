import React, { useState, useRef } from 'react';
import cloudBg from '../assets/cloud-bg.jpg';
import goldenRetriever from '../assets/golden-retriever.gif';
import Header from './Header';
import Draggable from 'react-draggable';

const affirmations = [
  "You are not alone.",
  "Your story matters.",
  "You are doing enough.",
  "You deserve peace.",
  "You are worthy of love.",
];

const Layout = ({ children }) => {
  const randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
  const [hearts, setHearts] = useState([]);
  const nodeRef = useRef(null); // ✅ Use this instead of findDOMNode

  const dropHeart = () => {
    const id = Date.now();
    const left = Math.random() * 90 + 5;
    setHearts(prev => [...prev, { id, left }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cloud Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src={cloudBg}
          alt="Cloud Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-500 text-3xl animate-float-down z-40 select-none"
          style={{ left: `${heart.left}%`, top: '80px' }}
        >
          ❤️
        </div>
      ))}

      {/* ✅ Draggable Sunny with safe ref */}
      <Draggable nodeRef={nodeRef} bounds="parent">
        <div
          ref={nodeRef}
          className="fixed top-12 left-4 z-30 cursor-pointer"
          onClick={dropHeart}
        >
          <img
            src={goldenRetriever}
            alt="golden retriever floating"
            className="w-28 opacity-90 rounded-md shadow-lg pointer-events-auto"
            draggable={false}
          />
        </div>
      </Draggable>

      {/* Floating Affirmation Banner */}
      <div className="absolute top-0 w-full text-center py-3 bg-pink-100 bg-opacity-40 z-30">
        <p className="text-sm text-rose-600 font-semibold animate-fade-in-slow">
          {randomQuote}
        </p>
      </div>

      {/* Header */}
      <div className="z-40 relative">
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative z-20 w-full max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 md:p-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
