// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12"
      style={{ backgroundImage: "url('/src/assets/cloud-bg.jpg')" }}
    >
      <div className="max-w-4xl bg-white/90 rounded-xl shadow-xl p-10 md:p-14 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 mb-6 text-center">
          Welcome to MyTime
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          A safe space to gently rediscover, organize, and reclaim your life’s story.
        </p>

        <div className="space-y-6 text-gray-800">
          <div>
            <h2 className="text-2xl font-semibold text-rose-600 mb-2">What is MyTime?</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Guided onboarding to explore your life experiences</li>
              <li>Interactive timeline to organize fragmented memories</li>
              <li>Private, secure, and trauma-informed design</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-rose-600 mb-2">What to Expect</h2>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li>Answer gentle questions to guide memory recall</li>
              <li>Tag memories by emotion, theme, or event</li>
              <li>Explore and revisit your story on your terms</li>
              <li>Pause anytime using the calming Break Corner</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-rose-600 mb-2">Key Features</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <span className="font-semibold text-rose-500">Trauma-Informed Design:</span>{' '}
                Built for those healing from CPTSD, memory loss, and trauma
              </li>
              <li>
                <span className="font-semibold text-rose-500">Privacy-Focused:</span> Your data stays yours — always
              </li>
              <li>
                <span className="font-semibold text-rose-500">Gentle & Personalized:</span> Move through your story at your own pace
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            MyTime is here to support reflection and healing, but is not a substitute for professional mental health care.
          </p>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            to="/register"
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow text-center w-full md:w-auto"
          >
            Begin Your Journey
          </Link>

          <div className="text-sm text-gray-700 text-center md:text-right w-full md:w-auto">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-rose-500 hover:underline font-medium">
                Log in
              </Link>
            </p>
            <p>
              New here?{' '}
              <Link to="/register" className="text-rose-500 hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
