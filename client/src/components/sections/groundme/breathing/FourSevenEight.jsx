import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreathingSession } from '@/hooks/useBreathingSession';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function FourSevenEight() {
  const navigate = useNavigate();
  const { config, step, scale, cycle, isComplete } = useBreathingSession('fourSevenEight');

  if (!config) return <p className="text-red-500">Missing config</p>;

  if (isComplete) {
    return (
      <div className="text-center py-20 text-accent">
        <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Nice work 🧠</h1>
        <p>You completed the 4-7-8 breathing session.</p>
        <button onClick={() => navigate('/ground-me')} className="btn">Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loop-soft text-center py-16">
      <img src={loopLogo} alt="Logo" className="w-80 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-accent mb-2">{config.label}</h1>
      <p className="text-body mb-6">Breathe in for 4, hold for 7, exhale for 8.</p>

      <div
        className="w-64 h-64 mx-auto mb-6 rounded-full bg-white/30 border-4 border-accent flex items-center justify-center text-3xl font-semibold text-accent transition-all duration-700 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        {config.sequence[step]}
      </div>

      <p className="text-sm text-accent mb-4">Cycle {cycle} of 5</p>
      <button onClick={() => navigate('/ground-me')} className="btn">Exit</button>
    </div>
  );
}
