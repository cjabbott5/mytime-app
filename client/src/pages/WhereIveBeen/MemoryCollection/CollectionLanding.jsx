import { Link } from 'react-router-dom';
import cloudBg from '@/assets/cloud-bg.jpg';

export default function CollectionLanding() {
  return (
    <div
      className="min-h-screen px-6 py-12 text-center text-pink-800 bg-cover bg-center"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-4">
        Memory Collection
      </h1>

      <h2 className="text-lg sm:text-xl font-bold tracking-wide text-pink-100 mb-6">
        Begin reflecting in whatever way feels safe for you.
      </h2>

      <p className="max-w-3xl mx-auto text-base sm:text-lg mb-12 text-pink-50 font-medium">
        This space is designed to help you gently recall and express memories,
        whether you want to go deep or just get started. Choose a path that fits how you're feeling today.
        You’re always in control.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <CollectionLink
          to="/where-ive-been/memory-collection/exploration"
          title="Freeform Exploration"
          desc="Step-by-step journaling with space to reflect on what happened, how you felt, and how you responded."
        />
        <CollectionLink
          to="/where-ive-been/memory-collection/guided"
          title="Guided Exploration"
          desc="Quick, gentle questions to spark reflection and make it easier to begin when you’re not sure where to start."
        />
      </div>

      <p className="text-sm text-pink-200 mt-12 italic">
        You can always come back and try the other path later.
      </p>
    </div>
  );
}

function CollectionLink({ to, title, desc }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
        <h3 className="text-pink-600 font-extrabold text-md sm:text-lg mb-2">{title}</h3>
        <p className="text-sm sm:text-base font-medium text-gray-800">{desc}</p>
      </div>
    </Link>
  );
}
