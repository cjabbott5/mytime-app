import { useUserData } from '@/context/UserDataContext';

export default function OnboardingSummary({ onBack, onFinish }) {
  const { userData } = useUserData();

  const hiddenKeys = ['providerId', 'uid', 'avatar', 'createdAt', 'updatedAt', 'email'];

  // Desired field order
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

  // Helper: flatten safety object
  const flattenSafety = (obj = {}) =>
    Object.entries(obj).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');

  const renderValue = (value) => {
    if (!value) return <em className="text-gray-400">[N/A]</em>;
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : <em className="text-gray-400">[None selected]</em>;
    if (typeof value === 'object') return flattenSafety(value);
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-rose-600">Review Your Info</h2>
      <p className="text-gray-600">
        Here's what you've shared. You can go back to make changes or begin your journey.
      </p>

      <div className="bg-gray-50 p-4 rounded-md max-h-[50vh] overflow-y-auto space-y-4 text-sm">
        {userData && typeof userData === 'object' ? (
          fieldOrder
            .filter((key) => !hiddenKeys.includes(key) && userData[key])
            .map((key, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-rose-500 uppercase">
                  {key.replace(/_/g, ' ')}
                </h4>
                <p className="text-gray-900 whitespace-pre-wrap">{renderValue(userData[key])}</p>
              </div>
            ))
        ) : (
          <p className="italic text-gray-500">No data found</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="text-sm text-rose-600 hover:underline">
          ← Back
        </button>
        <button
          onClick={onFinish}
          className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
}
