import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

const presetColors = [
  // Reds & Pinks
  "#F43F5E", "#FB7185", "#F472B6", "#EC4899", "#DB2777", "#BE185D",
  // Oranges & Yellows
  "#F97316", "#FBBF24", "#FACC15", "#FDE68A", "#EAB308",
  // Greens
  "#4ADE80", "#22C55E", "#16A34A", "#166534",
  // Blues
  "#3B82F6", "#2563EB", "#1D4ED8", "#1E3A8A", "#0EA5E9", "#0369A1",
  // Purples
  "#8B5CF6", "#A855F7", "#9333EA", "#6B21A8",
  // Neutrals
  "#F1F5F9", "#E5E7EB", "#9CA3AF", "#6B7280", "#374151", "#111827"
];

export default function CustomThemeBuilder() {
  const { customTheme, setCustomTheme, setSelectedTheme } = useTheme();

  const [primary, setPrimary] = useState(customTheme?.colors["--color-theme"] || "#93C5FD");
  const [accent, setAccent] = useState(customTheme?.colors["--color-accent"] || "#1D4ED8");
  const [text, setText] = useState(customTheme?.colors["--color-text"] || "#1E40AF");

  const [bgType, setBgType] = useState("solid");
  const [bgColor, setBgColor] = useState(primary);
  const [gradientStart, setGradientStart] = useState("#E0E0E0");
  const [gradientEnd, setGradientEnd] = useState("#FFFFFF");

  const getBackgroundImage = () => {
    return bgType === "gradient"
      ? `linear-gradient(to bottom right, ${gradientStart}, ${gradientEnd})`
      : primary; // Now using primary for solid bg
  };

  const handleApply = () => {
    const newTheme = {
      name: "Custom Theme",
      bgImage: getBackgroundImage(),
      isCustom: true,
      colors: {
        "--color-theme": primary,
        "--color-accent": accent,
        "--color-accent-dark": accent,
        "--color-text": text,
      },
    };

    setCustomTheme(newTheme);
    setSelectedTheme("custom");
  };

  const renderSwatches = (setFn) => (
    <div className="flex flex-wrap gap-2 mt-1">
      {presetColors.map((c) => (
        <button
          key={c}
          className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition"
          style={{ backgroundColor: c }}
          onClick={() => setFn(c)}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-10 space-y-4 p-6 bg-white/90 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-accent">🎨 Build Your Own Theme</h3>

      <div>
        <label className="block text-sm font-medium text-body mb-1">Background Style</label>
        <div className="flex gap-4">
          <button
            className={`px-4 py-1 rounded-full border ${bgType === "solid" ? "bg-accent text-white" : "bg-gray-100"}`}
            onClick={() => setBgType("solid")}
          >
            Solid
          </button>
          <button
            className={`px-4 py-1 rounded-full border ${bgType === "gradient" ? "bg-accent text-white" : "bg-gray-100"}`}
            onClick={() => setBgType("gradient")}
          >
            Gradient
          </button>
        </div>
      </div>

      {bgType === "solid" ? (
        <div>
          <label className="block text-sm font-medium text-body mb-1">Primary (Background) Color</label>
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            className="w-full h-10 rounded"
          />
          {renderSwatches(setPrimary)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-body mb-1">Gradient Start</label>
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => setGradientStart(e.target.value)}
              className="w-full h-10 rounded"
            />
            {renderSwatches(setGradientStart)}
          </div>
          <div>
            <label className="block text-sm font-medium text-body mb-1">Gradient End</label>
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => setGradientEnd(e.target.value)}
              className="w-full h-10 rounded"
            />
            {renderSwatches(setGradientEnd)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-body mb-1">Accent Color</label>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-full h-10 rounded"
          />
          {renderSwatches(setAccent)}
        </div>
        <div>
          <label className="block text-sm font-medium text-body mb-1">Text Color</label>
          <input
            type="color"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-10 rounded"
          />
          {renderSwatches(setText)}
        </div>
      </div>

      <div
        className="mt-6 p-6 rounded-xl shadow border"
        style={{
          backgroundColor: primary,
          color: text,
          borderColor: accent,
        }}
      >
        <p className="text-lg font-bold">Live Preview</p>
        <p style={{ color: accent }}>This is your accent color in action.</p>
      </div>

      <button
        onClick={handleApply}
        className="mt-4 px-6 py-2 rounded-full shadow transition-all"
        style={{ backgroundColor: accent, color: "white" }}
      >
        Apply Custom Theme
      </button>
    </div>
  );
}
