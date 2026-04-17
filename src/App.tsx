import { useState, useEffect } from "react";
import { LandingPage } from "./LandingPage";
import { ToasterMoviePage } from "./MoviePage";

export default function App() {
  const [view, setView] = useState<'landing' | 'movie'>('landing');

  // Initial routing based on pathname
  useEffect(() => {
    // Handle both /toaster.html and standard / path
    if (window.location.pathname.includes('toaster.html')) {
      setView('movie');
    }
  }, []);

  const handleWatchNow = () => {
    // We update the view state and the URL for a premium SPA experience
    setView('movie');
    window.history.pushState({}, '', '/toaster.html');
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('landing');
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-white overflow-x-hidden">
      {view === 'landing' ? (
        <LandingPage onWatchNow={handleWatchNow} />
      ) : (
        <ToasterMoviePage onViewLanding={handleGoHome} />
      )}
      
      {/* Global Background Glow Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}
