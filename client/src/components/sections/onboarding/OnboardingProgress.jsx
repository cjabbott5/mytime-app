export default function OnboardingProgress({ currentStep, totalSteps, title }) {
    const percentage = ((currentStep + 1) / totalSteps) * 100;
  
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>{`Step ${currentStep + 1} of ${totalSteps}`}</span>
          <span className="font-medium">{title}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-rose-500 h-2 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
  