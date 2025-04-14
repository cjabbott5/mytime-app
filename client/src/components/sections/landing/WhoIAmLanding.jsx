import { Link } from 'react-router-dom';
import cloudBg from '@/assets/cloud-bg.jpg';

export default function WhoIAmLanding() {
  return (
    <div
      className="min-h-screen px-6 py-12 text-center text-pink-600 bg-cover bg-center"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      {/* 🔥 SECTION TITLE at the TOP */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-6">
        WHO I AM
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg sm:text-xl font-bold tracking-wide text-pink-500 mb-2">
        Reflect Deeply · Discover Identity · Own Your Story
      </h2>

      {/* Description */}
      <p className="max-w-3xl mx-auto text-lg sm:text-xl font-medium text-pink-900 mb-12">
        This space is here to help you explore who you are—beyond roles, labels,
        and expectations. In "Who I Am," you'll discover prompts, insights, and
        tools to reconnect with your identity on your own terms.
      </p>

      {/* CLICKABLE Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <LandingLink
          to="/who-i-am/profile"
          title="PROFILE"
          desc="View and update your core info, avatar, and preferences."
        />
        <LandingLink
          to="/who-i-am/identity"
          title="IDENTITY PROMPT"
          desc="Thoughtful prompts to help you explore your personal identity."
        />
        <LandingLink
          to="/who-i-am/onboarding"
          title="ONBOARDING"
          desc="Not sure where to begin? Start here for guidance and orientation."
        />
      </div>
    </div>
  );
}

function LandingLink({ to, title, desc }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
        <h3 className="text-pink-600 font-extrabold text-md sm:text-lg mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-gray-800">
          {desc}
        </p>
      </div>
    </Link>
  );
}
