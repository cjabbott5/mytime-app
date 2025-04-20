import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';
import { FaUserCircle, FaIdBadge, FaRoute } from 'react-icons/fa';
import React from 'react';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function WhoIAmLanding() {
  const { selectedTheme } = useTheme();
  const currentTheme = themeConfig[selectedTheme];

  return (
    <LayoutWrapper hideHeader>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        {/* 🌀 Logo */}
        <div className="flex justify-center mb-8">
          <img src={loopLogo} alt="Loop Logo" className="w-80 h-auto" />
        </div>

        {/* 📦 Wrapped Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg border border-card text-center">
          {/* 👤 Section Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[--color-text]">
            WHO I AM
          </h1>

          {/* 🌱 Subtitle */}
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-accent mb-4">
            Reflect Deeply · Discover Identity · Own Your Story
          </h2>

          {/* 🧠 Description */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl font-medium text-body mb-12">
            This space is here to help you explore who you are — beyond roles, labels,
            and expectations. In "Who I Am," you'll discover prompts, insights, and
            tools to reconnect with your identity on your own terms.
          </p>

          {/* 🧭 Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            <LandingLink
              to="/who-i-am/profile"
              title="PROFILE"
              icon={<FaUserCircle />}
              desc="View and update your core info, avatar, and preferences."
            />
            <LandingLink
              to="/who-i-am/identity"
              title="IDENTITY PROMPT"
              icon={<FaIdBadge />}
              desc="Thoughtful prompts to help you explore your personal identity."
            />
            <LandingLink
              to="/who-i-am/onboarding"
              title="ONBOARDING"
              icon={<FaRoute />}
              desc="Not sure where to begin? Start here for guidance and orientation."
            />
          </div>

          {/* ✨ Reflective Quote */}
          <p className="text-body mt-12 italic text-lg md:text-xl">
            “The privilege of a lifetime is to become who you truly are.”
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
        <div className="mb-5 text-accent">{React.cloneElement(icon, { className: "text-5xl text-accent" })}</div>
        <h3 className="text-accent font-extrabold text-3xl mb-3">{title}</h3>
        <p className="text-lg font-medium text-body">{desc}</p>
      </div>
    </Link>
  );
}
