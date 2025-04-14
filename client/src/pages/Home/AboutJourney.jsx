import { Link } from 'react-router-dom';

export default function AboutJourney() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 text-center text-gray-800"
      style={{ backgroundImage: "url('/src/assets/cloud-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-lg max-w-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">
          About the Journey
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          <strong>MyTime</strong> is a trauma-informed tool designed to help you explore your personal timeline,
          organize scattered memories, and gently process life experiences.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          You'll build your story across three areas:{" "}
          <strong>Who I Am</strong>, <strong>Where I've Been</strong>, and{" "}
          <strong>Where I'm Going</strong>.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          The journey is yours to move through at your own pace — with tools designed
          to support emotional reflection, memory integration, and growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <Link to="/">
            <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
              ← Back to Home
            </button>
          </Link>
          <Link to="/auth/login">
            <button className="px-6 py-3 bg-white text-pink-600 border border-pink-600 rounded-full hover:bg-pink-100 transition">
              Log In
            </button>
          </Link>
          <Link to="/auth/register">
            <button className="px-6 py-3 bg-white text-pink-600 border border-pink-600 rounded-full hover:bg-pink-100 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
