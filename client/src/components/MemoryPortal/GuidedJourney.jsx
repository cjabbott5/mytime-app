import React, { useState } from "react";
import Step1_Environment from "./Childhood/Step1_Environment";
import Step2_Identity from "./Childhood/Step2_Identity";
import Step3_Sensory from "./Childhood/Step3_Sensory";
import Step4_EmotionalRecall from "./Childhood/Step4_EmotionalRecall";

const steps = [
  { id: "environment", component: Step1_Environment },
  { id: "identity", component: Step2_Identity },
  { id: "sensory", component: Step3_Sensory },
  { id: "emotional", component: Step4_EmotionalRecall },
];

const GuidedJourney = ({ stage = "childhood", onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState({ childhood: {} });

  const StepComponent = steps[stepIndex].component;
  const stepId = steps[stepIndex].id;

  const handleUpdate = (newData) => {
    setResponses((prev) => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [stepId]: newData,
      },
    }));
  };

  const handleNext = () => {
    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
    } else {
      onComplete && onComplete(responses[stage]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg border border-rose-200">
      <StepComponent
        data={responses[stage]?.[stepId] || {}}
        onUpdate={handleUpdate}
        onNext={handleNext}
      />
    </div>
  );
};

export default GuidedJourney;
