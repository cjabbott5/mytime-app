import { useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import GoldenRetriever from "@/components/layout/GoldenRetriever";
import { useTheme } from "@/context/ThemeContext";
import themeConfig from "@/config/themeConfig";

export default function LayoutWrapper({ children, hideHeader = false }) {
  const { selectedTheme } = useTheme();
  const theme = themeConfig[selectedTheme];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${theme.bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />
      <div className="relative z-10">
        {!hideHeader && (
          <>
            <Header />
            <GoldenRetriever />
          </>
        )}
       <main className="w-full px-6">{children}</main>
      </div>
    </div>
  );
}

