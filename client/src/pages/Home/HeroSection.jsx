import { Link } from 'react-router-dom';
import loopLogo from '@/assets/loop-logo.png'; // ⬅️ make sure this is in your assets!

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 text-center relative"
      style={{ backgroundImage: "url('/src/assets/wallpaper.jpg')" }}
    >
      {/* Top CTA */}
      <div className="absolute top-10">
        <Link to="/about">
          <button className="bg-white bg-opacity-90 text-loop-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-opacity-100 transition">
            LEARN ABOUT THE JOURNEY
          </button>
        </Link>
      </div>

      {/* 🌌 Massive Loop Logo */}
      <img
        src={loopLogo}
        alt="Loop Logo"
        className="w-[60vw] max-w-[420px] drop-shadow-xl mb-4"
      />

      {/* ✨ Tagline */}
      <p className="text-2xl sm:text-3xl font-bold text-loop-primary drop-shadow-md">
        Reclaim Your Story.
      </p>

      {/* Auth Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <Link to="/auth/login">
          <button className="bg-loop-primary text-white font-bold px-8 py-4 rounded-full transition hover:bg-white hover:text-loop-primary shadow-md hover:shadow-lg">
            LOG IN
          </button>
        </Link>
        <Link to="/auth/register">
          <button className="bg-loop-primary text-white font-bold px-8 py-4 rounded-full transition hover:bg-white hover:text-loop-primary shadow-md hover:shadow-lg">
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
}
