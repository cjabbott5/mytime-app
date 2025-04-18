import { useUserData } from '@/context/UserDataContext';
import loopLogo from '@/assets/loop-logo-large2.png';

export default function OnboardingSummary({ onBack, onFinish }) {
  const { userData } = useUserData();

  const hiddenKeys = ['providerId', 'uid', 'avatar', 'createdAt', 'updatedAt', 'email'];

  const fieldOrder = [
    'name',
    'age',
    'pronouns',
    'gender_identity',
    'cultural_identity',
    'spirituality',
    'mental_health',
    'current_reflection',
    'top_goals',
    'common_moods',
    'traits',
    'support_system',
    'coping_tools',
    'safety',
    'lifestyle',
    'buddyGif'
  ];

  const flattenSafety = (obj = {}) =>
    Object.entries(obj)
      .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n');

  const renderValue = (value) => {
    if (!value) return <em className="text-gray-400">[N/A]</em>;
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : <em className="text-gray-400">[None selected]</em>;
    if (typeof value === 'object') return flattenSafety(value);
    return value.toString();
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8 px-6 py-12 bg-white/90 rounded-3xl shadow-xl backdrop-blur-sm border border-card text-body animate-fade-in">
      <div className="flex justify-center">
        <img src={loopLogo} alt="Loop logo" className="h-36 mb-4" />
      </div>

      <h2 className="text-3xl font-bold text-loop.dark text-center">Review Your Info</h2>
      <p className="text-loop.accent text-center max-w-2xl mx-auto">
        Here's what you've shared. You can go back to make changes or continue to start your journey.
      </p>

      <div className="bg-[var(--color-card)] p-6 rounded-xl max-h-[50vh] overflow-y-auto space-y-4 text-sm border border-[var(--color-accent)]">
        {userData && typeof userData === 'object' ? (
          fieldOrder
            .filter((key) => !hiddenKeys.includes(key) && userData[key])
            .map((key, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide">
                  {key.replace(/_/g, ' ')}
                </h4>
                <p className="text-loop.dark whitespace-pre-wrap">{renderValue(userData[key])}</p>
              </div>
            ))
        ) : (
          <p className="italic text-gray-500">No data found</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="text-sm text-[var(--color-accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full shadow-md text-lg font-semibold hover:bg-[var(--color-accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
}
