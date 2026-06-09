import { useState, useEffect } from "react";
import { Play, Pause, Music, Moon, Sparkles, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { useLocation } from "wouter";

const MOODS = ["Dreaming...", "Traveling...", "Reading...", "Practicing Magic..."];

export const FloatingWidgets = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [xp, setXp] = useState(0);
  const [location] = useLocation();
  const [currentMood, setCurrentMood] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moodInt = setInterval(() => setCurrentMood(m => (m + 1) % MOODS.length), 10000);
    return () => clearInterval(moodInt);
  }, []);

  useEffect(() => {
    // Add XP on route change
    setXp(prev => Math.min(prev + 10, 100));
  }, [location]);

  const getPageMoodLabel = () => {
    if (location === "/") return "Witch's Waltz — Vol.III";
    if (location.startsWith("/journey")) return "The Traveler's Tale";
    if (location.startsWith("/gallery")) return "Memories in Amber";
    if (location.startsWith("/grimoire")) return "Spells & Secrets";
    if (location.startsWith("/lore")) return "Pages of History";
    return "Magical Ambience";
  };

  return (
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 pointer-events-auto transition-transform duration-500 ${collapsed ? 'translate-x-60' : 'translate-x-0'}`}>
      
      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-12 glass-panel rounded-l-xl flex items-center justify-center hover:bg-white/10 border-r-0"
      >
        {collapsed ? <ChevronLeft className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
      </button>

      {/* Mood Status Widget */}
      <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-3 w-48 shadow-lg hover:border-white/20 transition-colors cursor-default">
        <Moon className="w-4 h-4 text-secondary animate-pulse" />
        <div className="flex flex-col">
          <span className="text-xs text-white/90 font-medium">{MOODS[currentMood]}</span>
          <span className="text-[10px] text-white/50">{time}</span>
        </div>
      </div>

      {/* Music Player Widget */}
      <div className="glass-panel rounded-2xl p-4 w-48 shadow-lg group hover:border-white/20 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-wider">Now Playing</span>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            data-testid="button-play-pause"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white translate-x-[1px]" />}
          </button>
        </div>
        <div className="mb-2">
          <p className="text-sm font-serif text-white truncate">{getPageMoodLabel()}</p>
          <p className="text-[10px] text-white/50 truncate">Magical Journey OST</p>
        </div>
        {/* Fake Progress */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-primary/80 rounded-full ${isPlaying ? 'w-2/3 transition-all duration-[30000ms] ease-linear' : 'w-1/3'}`}></div>
        </div>
      </div>

      {/* Witch Level Widget */}
      <div className="glass-panel rounded-2xl p-4 w-48 shadow-lg relative overflow-hidden group hover:border-white/20 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
            <Star className="w-3 h-3 text-secondary" />
            Bond Lv.
          </span>
          <span className="text-xs text-secondary font-mono">{xp}%</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-1000 relative" style={{ width: `${xp}%` }}>
            {xp === 100 && <div className="absolute inset-0 shimmer-bg opacity-50" />}
          </div>
        </div>
        {xp === 100 && (
          <p className="text-[10px] text-primary mt-2 text-center font-bold tracking-widest uppercase animate-pulse">
            ✦ True Companion!
          </p>
        )}
      </div>

      {/* Dream Notes Widget */}
      <div className="glass-panel rounded-2xl p-4 w-48 shadow-lg relative overflow-hidden group hover:border-white/20 transition-colors">
        <Sparkles className="w-3 h-3 text-accent absolute top-3 right-3 opacity-50" />
        <h4 className="text-xs font-bold text-white/90 uppercase tracking-wider mb-2 flex items-center gap-2">
          Dream Notes
        </h4>
        <p className="text-xs font-serif italic text-white/70 leading-relaxed">
          "A beautiful day to fly across the sky, leaving stardust in my wake."
        </p>
      </div>

    </div>
  );
};
