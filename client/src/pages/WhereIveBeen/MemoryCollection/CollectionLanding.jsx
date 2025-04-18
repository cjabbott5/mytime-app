import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';

export default function CollectionLanding() {
  const { selectedTheme } = useTheme();
  const theme = themeConfig[selectedTheme];

  return (
    <LayoutWrapper hideHeader>
      <div className="px-6 py-12 text-center text-accent">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-4">
          Memory Collection
        </h1>

        <h2 className="text-lg sm:text-xl font-bold tracking-wide text-accent mb-6">
          Begin reflecting in whatever way feels safe for you.
        </h2>

        <p className="max-w-3xl mx-auto text-base sm:text-lg mb-12 text-body font-medium">
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

        <p className="text-sm text-body mt-12 italic">
          You can always come back and try the other path later.
        </p>
      </div>
    </LayoutWrapper>
  );
}

function CollectionLink({ to, title, desc }) {
  return (
    <Link to={to}>
      <div className="bg-white/90 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
        <h3 className="text-accent font-extrabold text-md sm:text-lg mb-2">{title}</h3>
        <p className="text-sm sm:text-base font-medium text-body">{desc}</p>
      </div>
    </Link>
  );
}
