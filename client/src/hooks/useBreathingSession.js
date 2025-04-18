import { useEffect, useState } from 'react';
import { breathingConfigs } from '@/config/breathingConfigs';

export function useBreathingSession(type, totalCycles = 5) {
  const config = breathingConfigs[type];
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [scale, setScale] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!config || isComplete) return;

    const timeout = setTimeout(() => {
      const nextStep = (step + 1) % config.sequence.length;
      setStep(nextStep);

      if (nextStep === 0) {
        setCycle(c => {
          if (c + 1 > totalCycles) {
            setIsComplete(true);
            return c;
          }
          return c + 1;
        });
      }

      const currentAction = config.sequence[nextStep];
      if (currentAction === 'Inhale') setScale(1.3);
      else if (currentAction === 'Exhale') setScale(1);
      else setScale(1.15);
    }, config.durations[step]);

    return () => clearTimeout(timeout);
  }, [step, config, cycle, isComplete]);

  return { config, step, scale, cycle, isComplete };
}
