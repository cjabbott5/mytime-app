import React from 'react';
import CalmCorner from './CalmCorner';

const StepLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 relative overflow-hidden">
      {/* Background image if you want */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/src/assets/cloud-bg.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-3xl w-full bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-10 animate-fade-in transition-all duration-500 ease-out">
        {/* Calm Corner */}
        <div className="absolute top-4 right-4">
          <CalmCorner />
        </div>

        {/* Step Content */}
        {children}
      </div>
    </div>
  );
};

export default StepLayout;
