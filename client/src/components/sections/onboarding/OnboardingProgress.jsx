export default function OnboardingProgress({ currentStep, totalSteps, title }) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      {/* Step Info */}
      <div className="flex justify-between items-center text-lg text-[var(--color-accent)] font-medium mb-2">
        <span>{`Step ${currentStep + 1} of ${totalSteps}`}</span>
        <span>{title}</span>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full h-6 rounded-full overflow-hidden bg-[var(--color-card)] border border-[var(--color-accent-dark)] shadow-inner"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="h-full bg-[var(--color-accent-dark)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
