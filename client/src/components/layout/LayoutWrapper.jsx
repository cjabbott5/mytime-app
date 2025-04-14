import { useLocation } from 'react-router-dom';
import Header from "./Header";
import GoldenRetriever from "./GoldenRetriever";

export default function LayoutWrapper({ children }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/about';


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2b4c8] to-[#fe7191] relative overflow-hidden">
      {/* Show header and golden retriever on all pages except landing */}
      {!isLandingPage && (
        <>
          <Header />
          <GoldenRetriever />
        </>
      )}

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
