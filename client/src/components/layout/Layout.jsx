import React, { useState, useRef } from 'react';
import cloudBg from '../../assets/cloud-bg.jpg';
import goldenRetriever from '../../assets/golden-retriever.gif';
import Header from './Header';
import Draggable from 'react-draggable';
import ResizableGif from '../ResizableGif'; // 👈 import your resizable component

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
  const nodeRef = useRef(null);

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
      {/* ☁️ Cloud Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src={cloudBg}
          alt="Cloud Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ❤️ Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-500 text-3xl animate-float-down z-40 select-none"
          style={{ left: `${heart.left}%`, top: '80px' }}
        >
          ❤️
        </div>
      ))}

      {/* 🐶 Draggable + Resizable Golden Retriever */}
      <Draggable nodeRef={nodeRef} bounds="parent">
        <div
          ref={nodeRef}
          className="fixed top-12 left-4 z-30 cursor-pointer"
          onClick={dropHeart}
        >
          <ResizableGif gif={goldenRetriever} />
        </div>
      </Draggable>

      {/* 🌱 Ground Me Button */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <a
          href="/ground-me"
          className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 px-5 rounded-full shadow-md transition-all"
        >
          Ground Me
        </a>
      </div>

      {/* ✨ Floating Affirmation Banner */}
      <div className="absolute top-0 w-full text-center py-3 bg-pink-100 bg-opacity-40 z-30">
        <p className="text-sm text-rose-600 font-semibold animate-fade-in-slow">
          {randomQuote}
        </p>
      </div>

      {/* 🧠 Header */}
      <div className="z-40 relative">
        <Header />
      </div>

      {/* 📄 Main Content */}
      <main className="relative z-20 w-full max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 md:p-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
