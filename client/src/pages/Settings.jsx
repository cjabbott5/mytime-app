import { useEffect, useState } from 'react';

const themes = {
  purple: '#7c3aed',
  blue: '#2563eb',
  yellow: '#facc15',
  green: '#10b981'
};

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Dynamically apply theme color
    document.documentElement.style.setProperty('--color-theme', themes[selectedTheme]);
  }, [selectedTheme]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-theme mb-6">⚙️ Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <p className="text-gray-700">Customize your preferences below.</p>

        {/* 🔤 Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-theme rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-theme"
            placeholder="Enter your display name"
          />
        </div>

        {/* 🎨 Theme Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Theme Color
          </label>
          <div className="flex space-x-4">
            {Object.entries(themes).map(([key, value]) => (
              <button
                key={key}
                className={`w-10 h-10 rounded-full border-4 ${
                  selectedTheme === key ? 'border-theme' : 'border-transparent'
                }`}
                onClick={() => setSelectedTheme(key)}
                style={{ backgroundColor: value }}
                title={key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
