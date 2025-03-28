import React from 'react';
import cloudBg from '../assets/cloud-bg.jpg';
import Header from './Header'; // Make sure you import this if you're not rendering it elsewhere

const affirmations = [
  "You are not alone.",
  "Your story matters.",
  "You are doing enough.",
  "You deserve peace.",
  "You are worthy of love.",
];

const Layout = ({ children }) => {
  const randomQuote = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cloud Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={cloudBg}
          alt="Cloud Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Affirmation Banner */}
      <div className="absolute top-0 w-full text-center py-3 bg-pink-100 bg-opacity-40 z-20">
        <p className="text-sm text-rose-600 font-semibold animate-fade-in-slow">
          {randomQuote}
        </p>
      </div>

      {/* Header */}
      <div className="z-50 relative">
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 md:p-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
