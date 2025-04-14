import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{ backgroundImage: "url('/src/assets/PinkCity.jpg')" }}
    >
      {/* Top CTA */}
      <div className="absolute top-10">
        <Link to="/about"> {/* 🔁 UPDATED path */}
          <button className="bg-white bg-opacity-80 text-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-opacity-100 transition">
            LEARN ABOUT THE JOURNEY
          </button>
        </Link>
      </div>

      {/* Hero Content */}
      <h1 className="text-[10vw] font-extrabold text-primary drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] tracking-wider">
        MY TIME
      </h1>

      <p className="text-2xl text-white drop-shadow-2xl mt-1">
        Reclaim Your Story.
      </p>

      {/* Auth Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <Link to="/auth/login">
          <button className="bg-white text-primary font-bold px-8 py-4 rounded-full transition hover:bg-primary hover:text-white shadow-md hover:shadow-lg">
            LOG IN
          </button>
        </Link>
        <Link to="/auth/register">
          <button className="bg-white text-primary font-bold px-8 py-4 rounded-full transition hover:bg-primary hover:text-white shadow-md hover:shadow-lg">
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
}
