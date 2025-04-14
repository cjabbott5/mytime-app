import React from 'react';
import { Link } from 'react-router-dom';

const PostLoginLanding = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12"
      style={{ backgroundImage: "url('/assets/cityspace pink.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay */}
      <div className="relative max-w-4xl bg-white/90 rounded-xl shadow-xl p-10 md:p-14 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 mb-6 text-center">
          Welcome Back to MyTime!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          It's time to continue your journey. Here’s where you can rediscover, organize, and reclaim your story.
        </p>

        <div className="space-y-6 text-gray-800">
          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-semibold text-rose-600 mb-2">What’s New?</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Explore new memories and reflect on your journey</li>
              <li>Check out your interactive timeline</li>
              <li>Enjoy the updated Break Corner for more self-care options</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              to="/timeline"
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow text-center w-full md:w-auto transition-all duration-300"
            >
              Continue Your Journey
            </Link>

            <div className="text-sm text-gray-700 text-center md:text-right w-full md:w-auto">
              <p>
                Want to explore your profile?{' '}
                <Link to="/profile" className="text-rose-500 hover:underline font-medium">
                  Go to Profile
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoginLanding;
