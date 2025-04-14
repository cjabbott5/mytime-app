import { Link } from 'react-router-dom';

export default function OrganizationLanding() {
  return (
    <div className="min-h-screen px-6 py-12 text-center bg-pink-50 text-pink-800">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-4">
        Memory Organization
      </h1>

      <h2 className="text-lg sm:text-xl font-bold tracking-wide text-pink-500 mb-6">
        Reflect back. See the big picture. Organize with care.
      </h2>

      <p className="max-w-3xl mx-auto text-base sm:text-lg mb-12 text-pink-900">
        You’ve started collecting your memories—now you can explore them in ways that help you find patterns, insights, and meaning.
        View your entries all together, browse by theme, or step back to see your story unfold on a timeline.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <OrgLink
          to="/where-ive-been/memory-organization/memory-center"
          title="📂 Memory Center"
          desc="View all of your saved reflections in one place. Filter by mood, tag, or date."
        />
        <OrgLink
          to="/where-ive-been/memory-organization/timeline"
          title="📈 Timeline View"
          desc="See your memories laid out over time to identify life stages, patterns, or gaps."
        />
      </div>

      <p className="text-sm text-pink-700 mt-12 italic">
        You’re doing something powerful—looking back and making sense of your story.
      </p>
    </div>
  );
}

function OrgLink({ to, title, desc }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
        <h3 className="text-pink-600 font-extrabold text-md sm:text-lg mb-2">{title}</h3>
        <p className="text-sm sm:text-base font-medium text-gray-800">{desc}</p>
      </div>
    </Link>
  );
}
