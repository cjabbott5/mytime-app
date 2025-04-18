import { useState, useEffect } from 'react';
import { checkAuthState, saveUserData } from '../../../config/firebase';
import onboardingFieldMap from '@/utils/mapOnboardingToProfile';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function OnboardingStep({
  step,
  onNext,
  onBack,
  isFirst,
  isLast,
  formData = {},
  updateUserData,
}) {
  const [localValues, setLocalValues] = useState({});

  const getMappedKey = (id) => onboardingFieldMap[id] || id;

  useEffect(() => {
    if (!step || (!step.fields && step.type !== 'sliderGroup')) return;

    const initialValues = {};
    if (step.fields) {
      step.fields.forEach((field) => {
        const key = getMappedKey(field.id);
        const value = formData[key];

        initialValues[field.id] =
          field.type === 'multi' ? (Array.isArray(value) ? value : []) : value ?? '';
      });
    }
    setLocalValues(initialValues);
  }, [step.id, formData]);

  const sync = (updatedValues) => {
    setLocalValues(updatedValues);
    const mapped = Object.entries(updatedValues).reduce((acc, [id, value]) => {
      acc[getMappedKey(id)] = value;
      return acc;
    }, {});
    updateUserData({ ...formData, ...mapped });
  };

  const handleChange = (fieldId, value) => {
    sync({ ...localValues, [fieldId]: value });
  };

  const handleMultiToggle = (fieldId, option, maxSelections = 3) => {
    const current = localValues[fieldId] || [];
    const isSelected = current.includes(option);
    const updated = isSelected
      ? current.filter((o) => o !== option)
      : current.length < maxSelections
        ? [...current, option]
        : current;
    handleChange(fieldId, updated);
  };

  const handleSubmit = async () => {
    const flatData = Object.entries(localValues).reduce((acc, [id, val]) => {
      acc[getMappedKey(id)] = val;
      return acc;
    }, {});
    if (Object.keys(flatData).length === 0 && step.type !== 'welcome') return;

    try {
      const user = await checkAuthState();
      if (user?.uid) await saveUserData(user.uid, flatData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
    onNext(flatData);
  };

  const renderField = (field) => {
    const value = localValues[field.id];
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full border border-loop.accent rounded px-3 py-2 text-loop.dark bg-white shadow-sm"
            aria-label={field.label}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full border border-loop.accent rounded px-3 py-2 text-loop.dark bg-white shadow-sm"
            aria-label={field.label}
          >
            <option value="">Select</option>
            {field.options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'multi': {
        const selectedValues = Array.isArray(value) ? value : [];
        const maxSelections = field.max ?? step.maxSelections ?? 3;

        return (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {field.options.map((opt, idx) => {
                const selected = selectedValues.includes(opt);
                const isDisabled = !selected && selectedValues.length >= maxSelections;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleMultiToggle(field.id, opt, maxSelections)}
                    disabled={isDisabled}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all shadow-sm text-center whitespace-nowrap
                      ${selected ? 'bg-[var(--color-accent-dark)] text-white border-[var(--color-accent-dark)]'
                      : `bg-[var(--color-card)] text-[var(--color-accent)] border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}`}
                    aria-pressed={selected}
                    aria-disabled={isDisabled}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-2">You can select up to {maxSelections}.</p>
          </div>
        );
      }

      case 'imageSelect':
        return (
          <div className="grid grid-cols-2 gap-4">
            {field.options.map((opt, idx) => {
              const selected = value === opt.value;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChange(field.id, opt.value)}
                  className={`rounded-lg border p-2 w-full flex flex-col items-center transition-all shadow-sm
                    ${selected ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)] bg-[var(--color-card)]'
                    : 'border-[var(--color-card)] hover:border-[var(--color-accent)]'}`}
                  aria-pressed={selected}
                >
                  <img src={opt.image} alt={opt.label} className="w-20 h-20 object-contain mb-2" />
                  <span className="text-sm text-loop.dark">{opt.label}</span>
                </button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 w-full mx-auto">
      {/* Logo above the box */}
      <div className="flex justify-center">
        <img src={loopLogo} alt="Loop logo" className="h-60 mt-4" />
      </div>

      {/* Onboarding content container */}
      <div className="w-full max-w-[1600px] min-h-[50vh] px-20 py-12 mx-auto bg-white/90 rounded-3xl shadow-xl backdrop-blur-sm border border-card text-body animate-fade-in space-y-8">
        <h2 className="text-3xl font-bold text-loop.dark text-center">{step.title.replace('MyTime', 'Loop')}</h2>
        {step.description && (
          <p className="text-loop.accent text-center whitespace-pre-line text-lg max-w-3xl mx-auto">
            {step.description.replace('MyTime', 'Loop')}
          </p>
        )}

        {step.type === 'form' && (
          <div className="space-y-6">
            {step.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-loop.dark mb-1">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}

        {step.type === 'sliderGroup' && (
          <div className="space-y-6">
            {step.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-loop.dark mb-1">
                  {field.label}
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={localValues[field.id] ?? 50}
                  onChange={(e) => handleChange(field.id, Number(e.target.value))}
                  className="w-full"
                  aria-valuenow={localValues[field.id] ?? 50}
                />
                <div className="text-xs text-loop.accent mt-1">
                  Strength: {localValues[field.id] ?? 50}%
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        {(step.fields || step.type === 'sliderGroup') || step.type === 'welcome' ? (
  <div className="flex justify-between pt-6">
    {!isFirst ? (
      <button
        onClick={onBack}
        className="text-sm text-[var(--color-accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
      >
        ← Back
      </button>
    ) : <span />} {/* preserve layout space */}

    <button
      onClick={handleSubmit}
      className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full shadow-md text-lg font-semibold hover:bg-[var(--color-accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
    >
      {isLast ? 'Review Summary' : 'Next'}
    </button>
  </div>
) : null}
      </div>
    </div>
  );
}
