import { useState } from 'react';
import themeConfig from '@/config/themeConfig';
import { useTheme } from '@/context/ThemeContext';

export default function Settings() {
  const [displayName, setDisplayName] = useState('');
  const { selectedTheme, setSelectedTheme } = useTheme();
  const currentTheme = themeConfig[selectedTheme];

  // 🧠 Handle both gradients & URLs
  const backgroundImage = currentTheme.bgImage?.startsWith('linear')
    ? currentTheme.bgImage
    : `url(${currentTheme.bgImage})`;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-accent mb-6">⚙️ Settings</h2>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md space-y-6">
          <p className="text-body">Customize your preferences below.</p>

          {/* Display Name Input */}
          <div>
            <label className="block text-sm font-medium text-body mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-theme rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your display name"
            />
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-sm font-medium text-body mb-2">
              Choose a Theme
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(themeConfig).map(([key, theme]) => {
                const previewBg = theme.bgImage?.startsWith('linear')
                  ? theme.bgImage
                  : `url(${theme.bgImage})`;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTheme(key)}
                    className={`rounded-lg overflow-hidden shadow-md border-4 transition-all ${
                      selectedTheme === key ? 'border-accent scale-105' : 'border-transparent'
                    }`}
                  >
                    <div
                      className="h-24 w-full bg-cover bg-center"
                      style={{ backgroundImage: previewBg }}
                    />
                    <div className="text-center p-2 text-sm text-body bg-white font-medium">
                      {theme.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
