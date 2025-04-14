import { useState } from 'react';
import FreeformWizard from './FreeformWizard';

export default function FreeformReflection() {
  const [started, setStarted] = useState(false);

  if (started) return <FreeformWizard />;

  return (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center text-center text-pink-800 bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">Freeform Exploration</h1>

      <p className="max-w-2xl text-base sm:text-lg mb-6 text-pink-900">
        In this journaling flow, you’ll walk through open-ended questions to explore a memory deeply and safely.
        This is your story, told your way.
      </p>

      <p className="max-w-xl text-sm text-pink-600 italic mb-10">
        You can skip questions, take breaks, and come back later. Nothing is saved until you say so.
      </p>

      <button
        onClick={() => setStarted(true)}
        className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition"
      >
        Begin Freeform Reflection
      </button>
    </div>
  );
}
