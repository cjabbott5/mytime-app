import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Who I Am',
    links: [
      { label: 'Profile', path: '/who-i-am/profile' },
      { label: 'Onboarding', path: '/who-i-am/onboarding' },
    ],
  },
  {
    title: 'Where I’ve Been',
    links: [
      { label: 'Memory Center', path: '/where-ive-been/memory-organization/memory-center' },
      { label: 'Reflection Prompts', path: '/where-ive-been/memory-collection/guided' },
    ],
  },
  {
    title: 'Where I’m Going',
    links: [
      { label: 'Dream Prompt', path: '/where-im-going/dream-prompt' },
      { label: 'Vision Board', path: '/where-im-going/goal-vision-board' },
    ],
  },
];

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ backgroundImage: "url('/src/assets/PinkCity.jpg')" }}
    >
      <h1 className="text-[10vw] font-extrabold text-white drop-shadow tracking-wider mb-4">
        MY TIME
      </h1>
      <p className="text-3xl font-medium text-pink-700 mb-16">
        Choose where to begin
      </p>

      <div className="flex flex-wrap justify-center gap-12">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white bg-opacity-90 rounded-3xl p-8 shadow-xl w-80"
          >
            <h2 className="text-2xl font-bold text-pink-700 mb-6">
              {section.title}
            </h2>
            <div className="flex flex-col items-center gap-6">
              {section.links.map((link) => (
                <Link to={link.path} key={link.path}>
                  <button className="w-60 h-16 rounded-xl bg-pink-100 hover:bg-white text-pink-800 font-semibold text-lg shadow transition-all duration-200">
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
