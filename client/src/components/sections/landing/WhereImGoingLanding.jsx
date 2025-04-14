import { Link } from 'react-router-dom';
import cloudBg from '@/assets/cloud-bg.jpg';

export default function WhereImGoingLanding() {
  return (
      <div
        className="min-h-screen px-6 py-12 text-center text-pink-600 bg-cover bg-center"
        style={{ backgroundImage: `url(${cloudBg})` }}
      >
        {/* Section Title at the Top */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-6">
          WHERE I’M GOING
        </h1>

        <h2 className="text-lg sm:text-xl font-bold tracking-wide text-pink-500 mb-2">
          Dream Boldly · Set Intentions · Envision the Future
        </h2>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl font-medium text-pink-900 mb-12">
          This section is your space to look forward—without judgment or limitation. Whether you’re envisioning big dreams or small next steps, "Where I’m Going" helps you imagine your future in ways that align with your values and truth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <LandingLink
            to="/where-im-going/dream-prompt"
            title="DREAM PROMPT"
            desc="Explore open-ended prompts about your hopes and dreams."
          />
          <LandingLink
            to="/where-im-going/goal-vision-board"
            title="GOAL / VISION BOARD"
            desc="Visualize your future path through goals, themes, or images."
          />
          <LandingLink
            to="/where-im-going"
            title="COMING SOON"
            desc="More tools to help you build a future story you’re proud of."
          />
        </div>
      </div>
  );
}

function LandingLink({ to, title, desc }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
        <h3 className="text-pink-600 font-extrabold text-md sm:text-lg mb-3">{title}</h3>
        <p className="text-sm sm:text-base font-medium text-gray-800">{desc}</p>
      </div>
    </Link>
  );
}
