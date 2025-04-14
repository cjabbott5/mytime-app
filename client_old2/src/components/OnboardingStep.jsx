import React, { useState, useEffect } from 'react';

const OnboardingStep = ({
  step,
  onNext,
  onBack,
  isFirst,
  isLast,
  formData = {}
}) => {
  const [localValues, setLocalValues] = useState({});

  useEffect(() => {
    setLocalValues(formData[step.id] || {});
  }, [step.id]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setLocalValues(prev => ({
      ...prev,
      [field.id]: value
    }));
  };

  const handleMultiToggle = (fieldId, option) => {
    const current = localValues[fieldId] || [];
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];

    setLocalValues(prev => ({
      ...prev,
      [fieldId]: updated
    }));
  };

  const handleStandaloneToggle = (option) => {
    const current = localValues[step.id] || [];
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];

    setLocalValues({
      ...localValues,
      [step.id]: updated
    });
  };

  const handleSubmit = () => {
    onNext({ [step.id]: localValues });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">{step.title}</h2>
      <p className="text-gray-600 whitespace-pre-line">{step.description}</p>

      {/* 🧠 FORM-BASED FIELDS */}
      {step.type === 'form' && (
        <div className="space-y-6">
          {step.fields.map(field => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {/* 🧩 Universal Input Renderer */}
              {['text', 'number'].includes(field.type) && (
                <input
                  type={field.type}
                  value={localValues[field.id] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              )}

              {field.type === 'select' && (
                <select
                  value={localValues[field.id] || ''}
                  onChange={(e) => handleInputChange(e, field)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'multi' && (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {field.options.map((option, idx) => {
                    const selected = (localValues[field.id] || []).includes(option);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleMultiToggle(field.id, option)}
                        className={`px-4 py-2 rounded border text-sm transition ${
                          selected
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'border-rose-300 text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🔘 TOP-LEVEL MULTI */}
      {step.type === 'multi' && (
        <div className="grid grid-cols-2 gap-3">
          {step.options.map((option, idx) => {
            const selected = (localValues[step.id] || []).includes(option);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleStandaloneToggle(option)}
                className={`px-4 py-2 rounded border text-sm transition ${
                  selected
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-rose-300 text-rose-600 hover:bg-rose-50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {/* ✅ NAVIGATION */}
      <div className="flex justify-between pt-6">
        {!isFirst && (
          <button onClick={onBack} className="text-rose-600 hover:underline">
            Back
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
        >
          {isLast ? 'Review Summary' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep;
