import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Download, 
  Search, 
  Menu, 
  ChevronRight, 
  Calendar, 
  Star, 
  Plus,
  Info,
  ExternalLink,
  ShieldCheck,
  Zap,
  Loader2,
  Clock,
  AlertCircle,
  RefreshCcw,
  ChevronLeft
} from "lucide-react";

// --- Components ---

const Navbar = ({ onViewLanding }: { onViewLanding: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-8 py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onViewLanding}>
          <span className="text-2xl font-black text-brand tracking-tighter flex items-center gap-1 uppercase text-glow">
            CinemaZone <span className="text-2xl">🏴‍☠️</span>
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          <button onClick={onViewLanding} className="text-xs font-bold uppercase tracking-[2px] text-white/40 hover:text-white transition-colors">Home</button>
          <a href="#" className="text-xs font-bold uppercase tracking-[2px] text-white/40 hover:text-white transition-colors">Movies</a>
          <a href="#" className="text-xs font-bold uppercase tracking-[2px] text-white/40 hover:text-white transition-colors">Series</a>
          <a href="#" className="text-xs font-bold uppercase tracking-[2px] text-white/40 hover:text-white transition-colors">Premium</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 bg-brand text-white text-[12px] font-black rounded-lg uppercase tracking-wider glow-red hover:glow-red-hover transition-all cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

const MovieHeader = () => {
  return (
    <section className="relative pt-40 pb-20 px-10 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-[1fr,400px] gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[2px] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Genre: Action / Sci-Fi
            </span>
            <div className="flex items-center gap-1 text-sm font-bold text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span>8.9</span>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-[100px] font-black mb-6 tracking-tighter leading-none italic uppercase">
            Toaster <span className="text-brand text-glow text-5xl md:text-8xl">(2026)</span>
          </h1>
          
          <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
            In a future where ordinary household appliances hold the key to an global digital network, 
            a renegade tech-thief discovers a prototype &apos;Toaster&apos; that doesn&apos;t just brown bread—it 
            burns through the fabric of reality itself. One bite is all it takes to trigger the end of the world.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#watch" className="flex items-center gap-2 px-10 py-5 bg-brand text-white font-black rounded-xl glow-red hover:glow-red-hover transition-all uppercase tracking-widest text-sm cursor-pointer no-underline">
              <Play size={20} fill="white" />
              Watch Now
            </a>
            <a href="#download" className="flex items-center gap-2 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm no-underline">
              <Download size={20} />
              Get Links
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative aspect-[2/3] rounded-3xl overflow-hidden glass-card shadow-[0_40px_80px_rgba(0,0,0,0.7)] group">
             <img 
               src="https://picsum.photos/seed/cybertoaster/800/1200" 
               alt="Toaster Movie Poster" 
               className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
             <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
             
             <div className="absolute bottom-10 left-10 right-10 flex items-center justify-center">
                <div className="text-center">
                   <div className="text-[10px] font-bold tracking-[4px] uppercase text-brand mb-2 italic">A CinemaZone Original</div>
                   <h2 className="text-3xl font-black italic uppercase tracking-tighter">Toaster</h2>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    setIsLoading(false);
  };

  const retryPlayer = () => {
    setHasError(false);
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !hasError && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.1, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, hasError]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsLoading(true);
      loadingTimeoutRef.current = setTimeout(() => {
        if (isLoading) setHasError(true);
      }, 10000);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="watch" className="py-24 px-10 bg-black/20" onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-1.5 h-12 bg-brand rounded-full glow-red" />
           <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-glow">Watch Online</h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[3px]">Ultra High-Definition 4K Streaming</p>
           </div>
        </div>

        <div 
          ref={playerContainerRef}
          className="w-full glass-card rounded-[2rem] overflow-hidden border border-white/5 shadow-2x-strong relative aspect-video group bg-black"
        >
          {!hasError && (
            <iframe 
              src={`https://movie.4meplayer.live/#zv5lr${isPlaying ? '&autoplay=1' : ''}`} 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allowFullScreen 
              allow="autoplay; encrypted-media"
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
              title="Toaster 2026 Movie Player"
              className={`transition-opacity duration-1000 ${isPlaying && !isLoading ? 'opacity-100' : 'opacity-40'}`}
              onError={handleError}
              onLoad={handleLoad}
            />
          )}

          <AnimatePresence>
            {hasError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-10 text-center"
              >
                <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6 border border-brand/20">
                  <AlertCircle size={40} className="text-brand" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-widest text-white mb-4">Playback Error</h3>
                <p className="text-white/50 text-sm max-w-md mb-8 leading-relaxed">
                  We encountered an issue while connecting to the streaming server. This can happen due to high traffic or regional restrictions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={retryPlayer}
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                  >
                    <RefreshCcw size={16} />
                    Retry Player
                  </button>
                  <a 
                    href="https://movie.4meplayer.live/#zv5lr&dl=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-brand text-white font-black rounded-xl glow-red hover:glow-red-hover transition-all uppercase tracking-widest text-[10px] no-underline"
                  >
                    <ExternalLink size={16} />
                    Watch Directly
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && !hasError && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                <Loader2 size={48} className="text-brand animate-spin mb-4" />
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[4px] animate-pulse">Initializing Stream...</span>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isPlaying && !hasError && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
              >
                <img 
                  src="https://picsum.photos/seed/cybertoaster/1920/1080?blur=4" 
                  alt="Movie Poster" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <button 
                  onClick={togglePlay}
                  className="relative z-30 w-24 h-24 bg-brand rounded-full flex items-center justify-center glow-red hover:scale-110 active:scale-95 transition-all text-white"
                >
                  <Play size={40} fill="white" className="ml-2" />
                </button>
                <div className="mt-6 text-center z-30">
                  <h3 className="text-xl font-black italic uppercase tracking-widest text-white mb-2">Toaster (2026)</h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-[4px]">Ready to Stream in 4K</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-8 left-8 flex items-center gap-3 z-30 pointer-events-none">
             <div className="px-4 py-1.5 bg-red-600 rounded-md text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)]">4K UHD</div>
             <div className="px-4 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest text-white/80">DOLBY ATMOS</div>
          </div>

          <AnimatePresence>
            {showControls && !hasError && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-0 bottom-0 z-40 p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent"
              >
                <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-6 cursor-pointer overflow-hidden group/bar">
                  <div 
                    className="absolute top-0 left-0 h-full bg-brand glow-red transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -ml-2 w-4 h-4 bg-white rounded-full border-2 border-brand -translate-y-1/2 shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity"
                    style={{ left: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-brand transition-colors transform active:scale-90 cursor-pointer">
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    
                    <div className="flex items-center gap-3 group/vol">
                       <button onClick={() => setIsMuted(!isMuted)} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                       </button>
                       <div className="w-0 group-hover/vol:w-20 overflow-hidden transition-all duration-300 h-1 bg-white/10 rounded-full cursor-pointer relative">
                          <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${volume}%` }} />
                       </div>
                    </div>

                    <div className="text-[10px] font-bold font-mono text-white/40 tracking-wider">
                      01:24:05 / 02:35:00
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-white/40">
                     <button className="hover:text-white transition-colors cursor-pointer"><Settings size={20} /></button>
                     <button 
                        onClick={toggleFullscreen}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                       {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                     </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 px-6 py-4 bg-brand/5 border border-brand/10 rounded-2xl backdrop-blur-md"
          >
            <span className="text-xl">⚠️</span>
            <p className="text-[11px] font-black uppercase tracking-[2px] text-white/50 leading-loose">
              Note: If you are facing playback issues or the video is not loading,{" "}
              <a 
                href="https://movie.4meplayer.live/#zv5lr&dl=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand hover:text-white transition-all underline underline-offset-4 decoration-brand/30 hover:decoration-white/50 decoration-2"
              >
                [Click Here to Watch/Download Directly]
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DownloadSystem = () => {
  const [state, setState] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [countdown, setCountdown] = useState(15);

  const startGenerating = () => {
    setState('generating');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === 'generating' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (state === 'generating' && countdown === 0) {
      setState('ready');
    }
    return () => clearInterval(timer);
  }, [state, countdown]);

  return (
    <section id="download" className="py-32 px-10 max-w-7xl mx-auto">
      <div className="glass-card rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center border border-white/5">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-brand/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[2px] text-white/60 italic">Secure Multi-Server System</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic uppercase leading-[0.9]">
            Download <span className="text-brand">Links</span>
          </h2>

          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-white/40 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
                  Access high-speed mirrors for offline viewing. Our system selects the fastest server for your region.
                </p>
                <button 
                  onClick={startGenerating}
                  className="group relative px-12 py-6 bg-brand text-white font-black rounded-2xl glow-red hover:glow-red-hover transition-all text-sm uppercase tracking-widest cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap size={20} fill="white" className="group-hover:scale-125 transition-transform" />
                    Get Download Links (High Speed)
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </button>
              </motion.div>
            )}

            {state === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-10"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <Loader2 size={64} className="text-brand animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black italic">{countdown}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white italic uppercase tracking-widest animate-pulse">
                      Generating Secure Links...
                    </p>
                    <p className="text-white/30 text-[10px] font-medium uppercase tracking-[3px]">Encryption Protocol: AED-256</p>
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <a 
                    href="https://movie.4meplayer.live/#zv5lr&dl=1"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 max-w-xs px-8 py-6 bg-cyan-500 text-black font-black rounded-2xl transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-3 no-underline shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  >
                    <Download size={18} />
                    Download 1080p (Fast)
                  </a>
                  <a 
                    href="https://movie.4meplayer.live/#zv5lr&dl=1"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 max-w-xs px-8 py-6 bg-white/10 border border-white/20 text-white font-black rounded-2xl transition-all hover:bg-white/20 hover:scale-105 active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-3 no-underline"
                  >
                    <Download size={18} />
                    Download 720p (Normal)
                  </a>
                </div>
                <p className="text-white/20 text-[9px] font-bold uppercase tracking-[4px] mt-4">Links expire in 2 hours</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <span className="text-xl font-black text-brand tracking-tighter uppercase mb-4 block text-glow italic">
            CinemaZone <span className="text-xl">🏴‍☠️</span>
          </span>
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-[2px] leading-relaxed">
            The world&apos;s most advanced decentralized streaming network. 
            Experience high-fidelity entertainment without surveillance.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white/50 mb-2">Platform</h4>
          {["Network Status", "Mirror List", "Security Audit", "API Access"].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-brand transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white/50 mb-2">Legal</h4>
          {["Privacy Policy", "DMCA Compliance", "Terms of Use"].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-brand transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-20 text-center text-[10px] font-bold uppercase tracking-[4px] text-white/10">
        © 2026 CinemaZone Encryption. Built for Toaster (2026).
      </div>
    </footer>
  );
};

export const ToasterMoviePage = ({ onViewLanding }: { onViewLanding: () => void }) => {
  return (
    <div className="min-h-screen selection:bg-brand selection:text-white pt-20">
      <Navbar onViewLanding={onViewLanding} />
      <main>
        <MovieHeader />
        <VideoPlayer />
        <DownloadSystem />
        
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-30 shadow-[0_0_20px_var(--color-brand)] z-[60]" />
      </main>
      <Footer />
    </div>
  );
};
