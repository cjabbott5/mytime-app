import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';
import { FaRegLightbulb, FaMap, FaEllipsisH } from 'react-icons/fa';
import React from 'react';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function WhereImGoingLanding() {
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
            WHERE I’M GOING
          </h1>

          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-accent mb-4">
            Dream Boldly · Set Intentions · Envision the Future
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium text-body mb-12">
            This section is your space to look forward—without judgment or limitation. Whether you’re envisioning big dreams or small next steps, "Where I’m Going" helps you imagine your future in ways that align with your values and truth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <LandingLink
              to="/where-im-going/dream-prompt"
              title="DREAM PROMPT"
              icon={<FaRegLightbulb />}
              desc="Explore open-ended prompts about your hopes and dreams."
            />
            <LandingLink
              to="/where-im-going/goal-vision-board"
              title="GOAL / VISION BOARD"
              icon={<FaMap />}
              desc="Visualize your future path through goals, themes, or images."
            />
            <LandingLink
              to="/where-im-going"
              title="COMING SOON"
              icon={<FaEllipsisH />}
              desc="More tools to help you build a future story you’re proud of."
            />
          </div>

          <p className="text-body mt-12 italic text-lg md:text-xl">
            “The future belongs to those who believe in the beauty of their dreams.”
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
}

function LandingLink({ to, title, desc, icon }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-10 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer h-full flex flex-col justify-between items-center text-center min-h-[320px]">
        <div className="mb-5 text-accent">{React.cloneElement(icon, { size: 48 })}</div>
        <h3 className="text-accent font-extrabold text-3xl mb-3">{title}</h3>
        <p className="text-lg font-medium text-body">{desc}</p>
      </div>
    </Link>
  );
}
