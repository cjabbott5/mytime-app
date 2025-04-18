import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function AboutJourney() {
  return (
    <LayoutWrapper hideHeader>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-body">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-lg max-w-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-accent mb-6">
            About the Journey
          </h1>
          <p className="text-lg leading-relaxed mb-4">
            <strong>Loop</strong> is a trauma-informed tool designed to help you explore your personal timeline,
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
              <button className="px-6 py-3 bg-accent text-white rounded-full hover:bg-theme transition">
                ← Back to Home
              </button>
            </Link>
            <Link to="/auth/login">
              <button className="px-6 py-3 bg-white text-accent border border-accent rounded-full hover:bg-card transition">
                Log In
              </button>
            </Link>
            <Link to="/auth/register">
              <button className="px-6 py-3 bg-white text-accent border border-accent rounded-full hover:bg-card transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
