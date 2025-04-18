import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper'; // ✅ add this
import loopLogo from '@/assets/loop-logo-large2.png';

export default function HeroSection() {
  return (
    <LayoutWrapper hideHeader> {/* ✅ Wrap the page in LayoutWrapper */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 text-center relative"
        style={{ backgroundImage: "url('/src/assets/wallpaper.jpg')" }}
      >
        {/* Top CTA */}
        <div className="absolute top-20">
          <Link to="/about">
          <button className="bg-white bg-opacity-90 text-loop-primary font-bold text-3xl px-12 py-6 rounded-full shadow-lg hover:bg-opacity-100 transition">
              LEARN ABOUT THE JOURNEY
            </button>
          </Link>
        </div>

        {/* 🌌 Massive Loop Logo */}
        <img
          src={loopLogo}
          alt="Loop Logo"
          className="w-[240vw] max-w-[840px] drop-shadow-xl mb-4"
        />

        {/* ✨ Tagline */}
        <p className="text-3xl sm:text-5xl font-bold text-loop-primary drop-shadow-md mt-0 mb-24">
          Trace the Loops. Find the Pattern.
        </p>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row gap-12">
          <Link to="/auth/login">
            <button className="bg-loop-primary text-white font-bold text-3xl  px-12 py-12 rounded-full transition hover:bg-white hover:text-loop-primary shadow-md hover:shadow-lg">
              LOG IN
            </button>
          </Link>
          <Link to="/auth/register">
            <button className="bg-loop-primary text-white font-bold text-3xl px-12 py-12 rounded-full transition hover:bg-white hover:text-loop-primary shadow-md hover:shadow-lg">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  );
}
