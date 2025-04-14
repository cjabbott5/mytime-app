import { Link } from 'react-router-dom';
import cloudBg from '@/assets/cloud-bg.jpg';

export default function WhereIveBeenLanding() {
  return (
    <div
      className="min-h-screen px-6 py-12 text-center text-pink-600 bg-cover bg-center"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      {/* Section Title at the Top */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-6">
        WHERE I’VE BEEN
      </h1>

      <h2 className="text-lg sm:text-xl font-bold tracking-wide text-pink-500 mb-2">
        Explore Your Past · Reflect Safely · Honor Your Story
      </h2>

      <p className="max-w-3xl mx-auto text-lg sm:text-xl font-medium text-pink-900 mb-12">
        This space is here to help you look back—gently and with care. Whether your memories are vivid or scattered, 
        difficult or joyful, they all hold meaning. You can explore them in whatever way feels right for you—starting with reflection, or organizing what you’ve already shared.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <LandingLink
          to="/where-ive-been/memory-collection"
          title="📝 MEMORY COLLECTION"
          desc="Start reflecting through open journaling or guided prompts. Choose your pace, your path, your story."
        />
        <LandingLink
          to="/where-ive-been/memory-organization"
          title="🗂 MEMORY ORGANIZATION"
          desc="View, tag, and organize your saved memories. Filter by mood, theme, or explore your visual timeline."
        />
      </div>

      {/* SUPPORTIVE FOOTER COPY */}
      <p className="text-sm text-pink-700 mt-12 italic">
        You’re in control. Start anywhere, pause anytime, and return when you're ready.
      </p>
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
