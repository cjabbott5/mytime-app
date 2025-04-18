import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBreathingSession } from '@/hooks/useBreathingSession';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function BoxBreathing() {
  const navigate = useNavigate();
  const { config, step, scale, cycle, isComplete } = useBreathingSession('box');

  if (!config) return <p className="text-red-500">Missing config</p>;

  if (isComplete) {
    return (
      <div className="text-center py-20 text-accent">
        <img src={loopLogo} alt="Loop Logo" className="w-80 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Done ✅</h1>
        <p>That was your Box Breathing cycle.</p>
        <button onClick={() => navigate('/ground-me')} className="btn">Back</button>
      </div>
    );
  }

  // STEP VISUALS: Trace square edge by step
  const edgeMap = ['top', 'right', 'bottom', 'left'];
  const activeEdge = edgeMap[step];

  return (
    <div className="min-h-screen bg-loop-soft text-center py-16">
      <img src={loopLogo} alt="Logo" className="w-80 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-accent mb-2">{config.label}</h1>
      <p className="text-body mb-6">Visualize tracing a square as you breathe</p>

      <div className="relative w-64 h-64 mx-auto border-4 border-accent mb-8">
        {/* Box trace animation */}
        {edgeMap.map((edge, i) => (
          <div
            key={edge}
            className={`absolute bg-accent transition-all duration-700 ${
              edge === activeEdge ? 'opacity-100' : 'opacity-20'
            }`}
            style={{
              ...(edge === 'top' && { top: 0, left: 0, right: 0, height: 4 }),
              ...(edge === 'right' && { top: 0, right: 0, bottom: 0, width: 4 }),
              ...(edge === 'bottom' && { bottom: 0, left: 0, right: 0, height: 4 }),
              ...(edge === 'left' && { top: 0, left: 0, bottom: 0, width: 4 }),
            }}
          />
        ))}
      </div>

      <p className="text-accent text-lg mb-4">{config.sequence[step]}</p>
      <p className="text-sm text-accent mb-4">Cycle {cycle} of 5</p>

      <button onClick={() => navigate('/ground-me')} className="btn">Exit</button>
    </div>
  );
}
