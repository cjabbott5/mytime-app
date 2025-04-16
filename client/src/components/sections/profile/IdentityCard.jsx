import React from "react";
import { useUserData } from "@/context/UserDataContext";

export default function IdentityCard() {
  const { userData } = useUserData();

  if (!userData) return null;

  // Fix the field mapping
  const {
    traits = [],
    common_moods = [],
    currentReflection = "You are healing. You are whole. You are not alone.",
  } = userData;

  return (
    <div className="max-w-xl mx-auto mt-2 rounded-2xl shadow-xl bg-white border-2 border-mauve-500 p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-mauve-700 mb-1">Core Traits</h3>
        {traits.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {traits.map((trait, i) => (
              <span
                key={i}
                className="bg-mauve-100 text-mauve-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-pink-500 italic">
            You haven’t added any traits yet.
          </p>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold text-mauve-700 mb-1">Common Moods</h3>
        {common_moods.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {common_moods.map((mood, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
              >
                {mood}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-pink-500 italic">
            No mood data yet. Log your emotional weather!
          </p>
        )}
      </div>

      <div className="bg-pink-100 rounded-xl p-4 text-center text-pink-800 font-semibold italic">
        “{currentReflection}”
      </div>
    </div>
  );
}
