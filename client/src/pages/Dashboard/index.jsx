import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import loopLogo from '@/assets/loop-logo-large.png';
import infinityLoop from '@/assets/InfinityLoop-Large.png';
import {
  FaUserCircle,
  FaRegCalendarAlt,
  FaCommentDots,
  FaCompass,
  FaStethoscope,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <LayoutWrapper hideHeader>
     <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8">
      {/* ♾️ Infinity Background */}
      <img
        src={infinityLoop}
        alt="Infinity Loop"
        className="absolute w-[1400px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 z-0"
      />

      {/* 🔍 Zoomed Content */}
      <div className="transform scale-[1.90] origin-center transition-transform duration-300">
       
      </div>
     {/* 🔵 Connection Ring (properly scaled) */}
<svg
  className="absolute z-0 pointer-events-none"
  width="850"
  height="850"
  viewBox="0 0 1000 1000"
  style={{
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  }}
>
  <circle
    cx="500"
    cy="500"
    r="410" // adjusted to sit just outside the orbit nodes
    stroke="var(--color-theme)"
    strokeWidth="1.5"
    fill="none"
  />
</svg>


        {/* 🌌 Orbit Container */}
        <div className="relative w-[42rem] h-[42rem] sm:w-[54rem] sm:h-[54rem] flex items-center justify-center z-10">
          {/* ☀️ Center Logo */}
          <div className="absolute w-[32rem] h-[32rem] sm:w-[32rem] sm:h-[32rem] flex items-center justify-center">
            <img
              src={loopLogo}
              alt="Loop Logo"
              className="w-[22rem] sm:w-[24rem] drop-shadow-xl"
            />
          </div>

          {/* 🌟 Orbit Nodes */}
          {orbitNodes.map((node, i) => (
            <OrbitNode
              key={node.label}
              icon={node.icon}
              label={node.label}
              path={node.path}
              angleDeg={-90 + i * (360 / orbitNodes.length)}
              description={node.description}
            />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}

function OrbitNode({ icon, label, path, angleDeg, description }) {
  const radius = 24;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);

  return (
    <Link to={path}>
      <div
        className="absolute w-52 h-52 sm:w-56 sm:h-56 bg-white/50 backdrop-blur-xl rounded-full shadow-lg flex flex-col items-center justify-center text-center p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        style={{
          left: `calc(50% + ${x}rem - 7rem)`,
          top: `calc(50% + ${y}rem - 7rem)`,
        }}
      >
        <div className="text-accent-dark mb-3 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <p className="text-base sm:text-lg font-semibold text-accent-dark group-hover:text-theme tracking-tight">
          {label}
        </p>
        <p className="text-sm text-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 max-w-[10rem]">
          {description}
        </p>
      </div>
    </Link>
  );
}

const orbitNodes = [
  {
    label: 'My Center',
    path: '/who-i-am/profile',
    icon: <FaUserCircle size={80} />,
    description: 'Update your info, identity, and preferences.',
  },
  {
    label: 'Memory Center',
    path: '/where-ive-been/memory-organization/memory-center',
    icon: <FaRegCalendarAlt size={80} />,
    description: 'View and organize saved memories.',
  },
  {
    label: 'Reflection Space',
    path: '/where-ive-been/memory-collection/guided',
    icon: <FaCommentDots size={80} />,
    description: 'Gently explore your past through prompts.',
  },
  {
    label: 'Provider Loop',
    path: '/who-i-am/provider',
    icon: <FaStethoscope size={80} />,
    description: 'Collaborate with your therapist or provider.',
  },
  {
    label: 'Vision & Planning',
    path: '/where-im-going/dream-prompt',
    icon: <FaCompass size={80} />,
    description: 'Dream big and set future goals.',
  },
];
