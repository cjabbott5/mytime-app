import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { breathingConfigs } from '@/config/breathingConfigs';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function BreathingGuide() {
  const { type } = useParams();
  const navigate = useNavigate();
  const config = breathingConfigs[type];
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [scale, setScale] = useState(1);

  const totalCycles = 5;

  useEffect(() => {
    if (!config) return;

    const timeout = setTimeout(() => {
      const nextStep = (step + 1) % config.sequence.length;
      setStep(nextStep);

      // Only increment cycle when completing a full loop
      if (nextStep === 0) {
        setCycle((c) => c + 1);
      }

      // Scale animation cue
      const currentAction = config.sequence[nextStep];
      if (currentAction === 'Inhale') setScale(1.3);
      else if (currentAction === 'Exhale') setScale(1);
      else setScale(1.15);
    }, config.durations[step]);

    return () => clearTimeout(timeout);
  }, [step, config]);

  if (!config) {
    return (
      <div className="text-center text-red-600 py-20">
        Invalid breathing type: <strong>{type}</strong>
      </div>
    );
  }

  if (cycle > totalCycles) {
    return (
      <div className="text-center py-20 text-accent">
        <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Well done 💙</h1>
        <p className="mb-6">You’ve completed your {config.label} session.</p>
        <button
          onClick={() => navigate('/ground-me')}
          className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent-dark transition"
        >
          Back to Ground Me
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-loop-soft text-center py-16 px-6">
      {/* Logo */}
      <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-4" />

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-accent mb-2">{config.label}</h1>
      <p className="text-body mb-8">Follow the rhythm to calm your body and mind.</p>

      {/* Breathing Circle */}
      <div
        className="w-64 h-64 mx-auto mb-8 rounded-full bg-white/30 border-2 border-accent flex items-center justify-center text-2xl font-bold text-accent transition-all duration-700 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        {config.sequence[step]}
      </div>

      {/* Cycle Info */}
      <p className="text-sm text-accent mb-6">Cycle {cycle} of {totalCycles}</p>

      {/* Exit Early */}
      <button
        onClick={() => navigate('/ground-me')}
        className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent-dark transition"
      >
        Exit Early
      </button>
    </div>
  );
}
