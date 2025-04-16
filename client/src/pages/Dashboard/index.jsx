import { Link } from 'react-router-dom';
import loopLogo from '@/assets/loop-logo.png';
import {
  FaUserCircle,
  FaRegCalendarAlt,
  FaCommentDots,
  FaCompass,
  FaStethoscope,
} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/cloud-bg.jpg')",
      }}
    >
      {/* 🌌 Orbit Ring */}
      <div className="relative w-[48rem] h-[48rem] sm:w-[56rem] sm:h-[56rem] flex items-center justify-center">

        {/* ☀️ Scaled Center Logo */}
        <div className="absolute w-[24rem] h-[24rem] bg-white/90 rounded-full flex items-center justify-center shadow-2xl z-10">
          <img
            src={loopLogo}
            alt="Loop Logo"
            className="w-[14rem] sm:w-[16rem] drop-shadow-xl"
          />
        </div>

        {/* 🌟 Rotated Orbit Nodes */}
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
  );
}

// Polar positioning with border + light blue bg
function OrbitNode({ icon, label, path, angleDeg }) {
  const radius = 25; // scale down slightly from 32
  const angleRad = (angleDeg * Math.PI) / 180;

  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);

  return (
    <Link to={path}>
      <div
  className="absolute w-60 h-60 sm:w-64 sm:h-64 bg-loop-secondary/40 rounded-full shadow-xl flex flex-col items-center justify-center text-center p-6 hover:scale-105 transition-all border-[4px] border-loop-primary"
  style={{
    left: `calc(50% + ${x}rem - 8rem)`,
    top: `calc(50% + ${y}rem - 8rem)`,
  }}
>
        <div className="text-loop-primary mb-4">{icon}</div>
        <p className="text-lg sm:text-xl font-bold text-loop-primary tracking-wide">
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
    icon: <FaUserCircle size={80} />,
  },
  {
    label: 'Memory Center',
    path: '/where-ive-been/memory-organization/memory-center',
    icon: <FaRegCalendarAlt size={80} />,
  },
  {
    label: 'Reflection Space',
    path: '/where-ive-been/memory-collection/guided',
    icon: <FaCommentDots size={80} />,
  },
  {
    label: 'Provider Loop',
    path: '/who-i-am/provider',
    icon: <FaStethoscope size={80} />,
  },
  {
    label: 'Vision & Planning',
    path: '/where-im-going/dream-prompt',
    icon: <FaCompass size={80} />,
  },
];
