import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import loopLogo from '@/assets/loop-logo-large.png';
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
        {/* 🌌 Orbit Container */}
        <div className="relative w-[42rem] h-[42rem] sm:w-[54rem] sm:h-[54rem] flex items-center justify-center">
          
          {/* ☀️ Center Logo */}
          <div className="absolute w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] bg-white/90 rounded-full shadow-2xl flex items-center justify-center z-10 border-2 border-card">
            <img
              src={loopLogo}
              alt="Loop Logo"
              className="w-[12rem] sm:w-[14rem] drop-shadow-xl"
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
            />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}

function OrbitNode({ icon, label, path, angleDeg }) {
  const radius = 24;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);

  return (
    <Link to={path}>
      <div
        className="absolute w-52 h-52 sm:w-56 sm:h-56 bg-white/70 backdrop-blur-xl rounded-full shadow-lg flex flex-col items-center justify-center text-center p-5 border-2 border-accent transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
        style={{
          left: `calc(50% + ${x}rem - 7rem)`,
          top: `calc(50% + ${y}rem - 7rem)`,
        }}
      >
        <div className="text-accent mb-3 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <p className="text-base sm:text-lg font-semibold text-accent group-hover:text-theme tracking-tight">
          {label}
        </p>
      </div>
    </Link>
  );
}

const orbitNodes = [
  {
    label: 'My Center',
    path: '/who-i-am/profile',
    icon: <FaUserCircle size={60} />,
  },
  {
    label: 'Memory Center',
    path: '/where-ive-been/memory-organization/memory-center',
    icon: <FaRegCalendarAlt size={60} />,
  },
  {
    label: 'Reflection Space',
    path: '/where-iveen/memory-collection/guided',
    icon: <FaCommentDots size={60} />,
  },
  {
    label: 'Provider Loop',
    path: '/who-i-am/provider',
    icon: <FaStethoscope size={60} />,
  },
  {
    label: 'Vision & Planning',
    path: '/where-im-going/dream-prompt',
    icon: <FaCompass size={60} />,
  },
];
