import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreathingSession } from '@/hooks/useBreathingSession';
import loopLogo from '@/assets/loop-logo-large2.png';

const affirmations = [
  "You are safe.",
  "You are grounded.",
  "This moment is yours.",
  "Feel the breath. Let go.",
  "Peace flows through you."
];

export default function MindfulBreathing() {
  const navigate = useNavigate();
  const { config, step, scale, cycle, isComplete } = useBreathingSession('mindful');

  if (!config) return <p className="text-red-500">Missing config</p>;

  if (isComplete) {
    return (
      <div className="text-center py-20 text-accent">
        <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">You're back 💙</h1>
        <p>Thanks for breathing mindfully.</p>
        <button onClick={() => navigate('/ground-me')} className="btn">Return</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loop-soft text-center py-16 px-4">
      <img src={loopLogo} alt="Logo" className="w-72 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-accent mb-2">{config.label}</h1>
      <p className="text-body mb-4">Focus on the present moment. Let your body lead.</p>

      <div
        className="w-64 h-64 mx-auto mb-6 rounded-full bg-white/20 border-4 border-accent flex items-center justify-center text-2xl text-accent font-semibold transition-all duration-700 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        {config.sequence[step]}
      </div>

      <p className="italic text-accent mb-4">
        {affirmations[(cycle + step) % affirmations.length]}
      </p>

      <p className="text-sm text-accent mb-4">Cycle {cycle} of 5</p>
      <button onClick={() => navigate('/ground-me')} className="btn">Exit</button>
    </div>
  );
}
