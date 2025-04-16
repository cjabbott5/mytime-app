import { useState, useEffect } from 'react';
import { checkAuthState, saveUserData } from '../../../config/firebase';
import onboardingFieldMap from '@/utils/mapOnboardingToProfile';

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
          field.type === 'multi'
            ? Array.isArray(value) ? value : []
            : value ?? '';
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

  const handleMultiToggle = (fieldId, option) => {
    const current = localValues[fieldId] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    handleChange(fieldId, updated);
  };

  const handleSubmit = async () => {
    const flatData = Object.entries(localValues).reduce((acc, [id, val]) => {
      acc[getMappedKey(id)] = val;
      return acc;
    }, {});

    if (Object.keys(flatData).length === 0) return;

    try {
      const user = await checkAuthState();
      if (user?.uid) {
        await saveUserData(user.uid, flatData);
      }
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

      case 'multi':
        return (
          <div className="grid grid-cols-2 gap-3 mt-2">
            {field.options.map((opt, idx) => {
              const selected = Array.isArray(value) && value.includes(opt);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleMultiToggle(field.id, opt)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${
                    selected
                      ? 'bg-loop.dark text-white border-loop.dark'
                      : 'bg-loop.secondary text-loop.dark border-loop.accent hover:bg-loop.highlight'
                  }`}
                  aria-pressed={selected}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        );

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
                  className={`rounded-lg border p-2 w-full flex flex-col items-center transition-all shadow-sm ${
                    selected
                      ? 'border-loop.accent ring-2 ring-loop.accent'
                      : 'border-gray-300 hover:border-loop.highlight'
                  }`}
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-loop.dark">{step.title}</h2>
      {step.description && (
        <p className="text-loop.accent whitespace-pre-line">{step.description}</p>
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
      {step.fields || step.type === 'sliderGroup' ? (
        <div className="flex justify-between pt-6">
          {!isFirst && (
            <button onClick={onBack} className="text-sm text-loop.accent hover:underline">
              ← Back
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="bg-loop.accent text-white px-6 py-2 rounded hover:bg-loop.dark"
          >
            {isLast ? 'Review Summary' : 'Next'}
          </button>
        </div>
      ) : (
        <div className="flex justify-end pt-6">
          <button
            onClick={() => onNext({})}
            className="bg-loop.accent text-white px-6 py-2 rounded hover:bg-loop.dark"
          >
            {isLast ? 'Review Summary' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}
