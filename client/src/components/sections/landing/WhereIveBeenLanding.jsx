import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';
import { FaPenFancy, FaFolderOpen } from 'react-icons/fa';
import React from 'react';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function WhereIveBeenLanding() {
  const { selectedTheme } = useTheme();
  const currentTheme = themeConfig[selectedTheme];

  return (
    <LayoutWrapper hideHeader>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={loopLogo} alt="Loop Logo" className="w-80 h-auto" />
        </div>

        {/* Content Box */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg border border-card text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[--color-text]">
            WHERE I’VE BEEN
          </h1>

          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-accent mb-4">
            Explore Your Past · Reflect Safely · Honor Your Story
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium text-body mb-12">
            This space is here to help you look back—gently and with care. Whether your memories are vivid or scattered,
            difficult or joyful, they all hold meaning. You can explore them in whatever way feels right for you—starting
            with reflection, or organizing what you’ve already shared.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <LandingLink
              to="/where-ive-been/memory-collection"
              title="MEMORY COLLECTION"
              icon={<FaPenFancy />}
              desc="Start reflecting through open journaling or guided prompts. Choose your pace, your path, your story."
            />
            <LandingLink
              to="/where-ive-been/memory-organization"
              title="MEMORY ORGANIZATION"
              icon={<FaFolderOpen />}
              desc="View, tag, and organize your saved memories. Filter by mood, theme, or explore your visual timeline."
            />
          </div>

          <p className="text-body mt-12 italic text-lg md:text-xl">
            “The past is not a burden, but a stepping stone.”
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
}

function LandingLink({ to, title, desc, icon }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-10 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer min-h-[260px] flex flex-col items-center text-center">
        <div className="mb-5 text-accent">{React.cloneElement(icon, { size: 48 })}</div>
        <h3 className="text-accent font-extrabold text-3xl mb-3">{title}</h3>
        <p className="text-lg font-medium text-body">{desc}</p>
      </div>
    </Link>
  );
}
