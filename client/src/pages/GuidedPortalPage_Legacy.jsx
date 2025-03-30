// src/pages/GuidedPortalPage.jsx
import React from 'react';
import MemoryPortalHome from '../components/MemoryPortal/MemoryPortalHome';
import cloudBackground from '../assets/cloud-bg.jpg'; // ✅ Import image

const GuidedPortalPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${cloudBackground})` }}
    >
      <div className="backdrop-blur-sm min-h-screen flex items-center justify-center px-4">
        <MemoryPortalHome />
      </div>
    </div>
  );
};

export default GuidedPortalPage;
