import { motion } from "motion/react";
import { 
  Play, 
  Plus, 
  Info, 
  ChevronRight, 
  Search, 
  Bell, 
  User,
  Star,
  Calendar
} from "lucide-react";

interface LandingPageProps {
  onWatchNow: () => void;
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent px-8 py-6 h-20 transition-all">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <span className="text-3xl font-black text-brand tracking-tighter uppercase italic text-glow">
            CinemaZone 🏴‍☠️
          </span>
          <div className="hidden lg:flex items-center gap-8">
            {["Home", "Movies", "Series", "My List"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-semibold text-white/70 hover:text-white transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-8 text-white/70">
          <button className="hover:text-white transition-colors cursor-pointer"><Search size={22} /></button>
          <button className="hover:text-white transition-colors cursor-pointer relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand rounded-full glow-red" />
          </button>
          <div className="w-10 h-10 bg-brand/20 border border-brand/40 rounded-lg flex items-center justify-center text-brand font-black italic cursor-pointer">
            M
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onWatchNow }: { onWatchNow: () => void }) => {
  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
      {/* Cinematic Background Gradient & Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" 
          alt="Toaster Exclusive" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-10 bg-brand rounded-full glow-red" />
            <span className="text-brand font-black italic uppercase tracking-[4px] text-sm">CinemaZone Original Premiere</span>
          </div>

          <h1 className="text-8xl md:text-[140px] font-black tracking-tighter italic uppercase leading-[0.85] mb-8">
            Toaster <span className="text-brand text-glow text-6xl md:text-9xl ml-[-1rem]">(2026)</span>
          </h1>

          <p className="max-w-xl text-xl text-white/60 mb-12 leading-relaxed">
            In a city that never sleeps, one invention wakes up the truth. 
            The most anticipated sci-fi thriller of the decade is finally here. 
            Experience the revolution that starts in your kitchen.
          </p>

          <div className="flex flex-wrap gap-6">
            {/* The Critical Link linked to toaster.html via state transition */}
            <button 
              onClick={onWatchNow}
              className="group flex items-center gap-3 px-12 py-6 bg-brand text-white font-black rounded-2xl glow-red hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest no-underline"
            >
              <Play size={20} fill="white" className="group-hover:scale-110 transition-transform" />
              Watch Now
            </button>
            <button className="flex items-center gap-3 px-12 py-6 bg-white/5 border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest no-underline">
              <Plus size={20} />
              My List
            </button>
            <button className="flex items-center justify-center w-16 h-16 bg-white/5 border border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all">
              <Info size={24} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Meta Details */}
      <div className="absolute bottom-20 right-10 hidden xl:flex items-center gap-10">
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[4px] mb-2">Total Viewers</span>
            <span className="text-3xl font-black italic tracking-tighter">14,205,081</span>
         </div>
         <div className="w-px h-12 bg-white/10" />
         <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[4px] mb-2">IMDb Rating</span>
            <div className="flex items-center gap-2 text-brand">
               <Star size={20} fill="currentColor" />
               <span className="text-3xl font-black italic tracking-tighter">8.9</span>
            </div>
         </div>
      </div>
    </section>
  );
};

const MovieCard = ({ id, title, genre, year, rating }: any) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative aspect-[2/3] rounded-2xl overflow-hidden glass-card border border-white/5 cursor-pointer group"
    >
      <img 
        src={`https://picsum.photos/seed/movie${id}/800/1200`} 
        alt={title} 
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2 text-brand">
           <Star size={12} fill="currentColor" />
           <span className="text-[10px] font-black">{rating}</span>
           <span className="text-white/40 text-[10px] font-bold ml-auto">{year}</span>
        </div>
        <h4 className="text-lg font-black italic uppercase tracking-tighter mb-1 leading-none">{title}</h4>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{genre}</p>
      </div>

      <div className="absolute top-4 right-4 w-10 h-10 bg-brand rounded-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all flex items-center justify-center text-white glow-red">
         <Play size={18} fill="white" className="ml-0.5" />
      </div>
    </motion.div>
  );
};

const TrendingSection = () => {
  const trendingMovies = [
    { id: 101, title: "Echoes of Void", genre: "Sci-Fi / Thriller", year: "2025", rating: "8.4" },
    { id: 102, title: "Neon Samurai", genre: "Action / Cyber", year: "2026", rating: "9.1" },
    { id: 103, title: "The Last Protocol", genre: "Detective / Noir", year: "2025", rating: "7.8" },
    { id: 104, title: "Gravity Wells", genre: "Space / Drama", year: "2026", rating: "8.7" },
    { id: 105, title: "Midnight City", genre: "Crime / Action", year: "2025", rating: "8.2" },
    { id: 106, title: "Pulse Runner", genre: "Racing / Sci-Fi", year: "2026", rating: "8.5" },
  ];

  return (
    <section className="py-32 px-10 max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-1.5 h-10 bg-brand rounded-full glow-red" />
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-glow">Trending Now</h2>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[4px]">The most streamed content this week</p>
        </div>
        <button className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-white/40 hover:text-white transition-colors">
           Explore All <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
};

export const LandingPage = ({ onWatchNow }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-white">
      <Navbar />
      <Hero onWatchNow={onWatchNow} />
      <TrendingSection />
      
      {/* Footer Simulation */}
      <footer className="py-20 px-10 border-t border-white/5 text-center">
         <p className="text-white/10 text-[10px] font-bold uppercase tracking-[6px]">© 2026 CinemaZone Encryption Protocol</p>
      </footer>

      {/* Background Decorative Gradient */}
      <div className="fixed top-0 left-0 w-full h-[1000px] bg-brand/5 blur-[150px] -translate-y-1/2 pointer-events-none z-0" />
    </div>
  );
};
