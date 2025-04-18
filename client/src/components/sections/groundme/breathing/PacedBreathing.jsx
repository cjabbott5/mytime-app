import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreathingSession } from '@/hooks/useBreathingSession';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function PacedBreathing() {
  const navigate = useNavigate();
  const { config, step, scale, cycle, isComplete } = useBreathingSession('paced');

  if (!config) return <p className="text-red-500">Missing config</p>;

  if (isComplete) {
    return (
      <div className="text-center py-20 text-accent">
        <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Session Complete 💫</h1>
        <p>You completed a paced breathing cycle.</p>
        <button onClick={() => navigate('/ground-me')} className="btn">Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loop-soft text-center py-16 px-4">
      <img src={loopLogo} alt="Logo" className="w-72 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-accent mb-2">{config.label}</h1>
      <p className="text-body mb-4">Breathe to the rhythm. Keep your pace steady.</p>

      {/* Paced rhythm bar */}
      <div className="relative w-full max-w-lg h-6 mx-auto bg-white/30 rounded overflow-hidden mb-8">
        <div
          className="absolute top-0 left-0 h-full bg-accent transition-all duration-700 ease-in-out"
          style={{ width: `${(step + 1) / config.sequence.length * 100}%` }}
        />
      </div>

      <p className="text-xl text-accent mb-4">{config.sequence[step]}</p>
      <p className="text-sm text-accent mb-4">Cycle {cycle} of 5</p>
      <button onClick={() => navigate('/ground-me')} className="btn">Exit</button>
    </div>
  );
}
