import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

import elainaBread from "@localassets/elaina_bread.png";
import elainaPout from "@localassets/elaina_pout.png";
import elainaSleepy from "@localassets/elaina_sleepy.png";
import elainaSurprised from "@localassets/elaina_surprised.png";
import elainaSmile from "@localassets/elaina_smile.png";
import elainaKimono from "@localassets/elaina_kimono.png";
import elainaCrepe from "@localassets/elaina_crepe.png";
import elainaGlasses from "@localassets/elaina_glasses.png";
import elainaLean from "@localassets/elaina_lean.png";

const moods = [
  {
    img: elainaBread, name: "Eating Mode", emoji: "🍞",
    filter: "Eating",
    gradient: "from-amber-900/30 to-pink-900/20",
    glowColor: "#FFB7C5",
    description: "When bread > everything else",
    tag: "Priorities straight ✓",
    quote: "Ehehe~ bread is the greatest magic of all!",
    reaction: "Nom nom nom~"
  },
  {
    img: elainaPout, name: "Grumpy Mode", emoji: "😤",
    filter: "Grumpy",
    gradient: "from-purple-900/30 to-indigo-900/20",
    glowColor: "#C9B8FF",
    description: "Do NOT disturb the silver witch",
    tag: "Danger Level: MAX",
    quote: "I said no. Final answer. Do not make me repeat myself.",
    reaction: "RAWR! >:("
  },
  {
    img: elainaSleepy, name: "Sleepy Mode", emoji: "😴",
    filter: "Sleepy",
    gradient: "from-blue-900/30 to-purple-900/20",
    glowColor: "#7DE8FF",
    description: "Too many spells, not enough naps",
    tag: "Please do not wake",
    quote: "Five more minutes... the road can wait...",
    reaction: "zzZzz..."
  },
  {
    img: elainaSurprised, name: "Surprised Mode", emoji: "😲",
    filter: "Rare",
    gradient: "from-cyan-900/30 to-teal-900/20",
    glowColor: "#7DE8FF",
    description: "When reality exceeds expectations",
    tag: "This was NOT in the map",
    quote: "W-wait... that wasn't supposed to happen!",
    reaction: "!!! (?_?)"
  },
  {
    img: elainaSmile, name: "Happy Mode", emoji: "✨",
    filter: "Happy",
    gradient: "from-yellow-900/30 to-amber-900/20",
    glowColor: "#FFE5A0",
    description: "The witch is in a very good mood today",
    tag: "Approach with joy",
    quote: "Ahh~ today is a wonderful day to travel!",
    reaction: "✨ Shining! ✨"
  },
  {
    img: elainaKimono, name: "Festival Mode", emoji: "🎋",
    filter: "Rare",
    gradient: "from-red-900/30 to-rose-900/20",
    glowColor: "#FFB7C5",
    description: "A rare seasonal appearance",
    tag: "Limited Edition ✦",
    quote: "The new year holds countless adventures~ Happy New Year!",
    reaction: "So elegant~! 🌸"
  },
  {
    img: elainaCrepe, name: "Foodie Mode", emoji: "🍓",
    filter: "Eating",
    gradient: "from-rose-900/30 to-pink-900/20",
    glowColor: "#FFB7C5",
    description: "Strawberry crepe connoisseur",
    tag: "10/10 would recommend",
    quote: "This crepe... it's speaking to my soul! Mmm~",
    reaction: "SO YUMMY!!! 🍓"
  },
  {
    img: elainaGlasses, name: "Scholar Mode", emoji: "📚",
    filter: "Rare",
    gradient: "from-orange-900/30 to-amber-900/20",
    glowColor: "#FFD580",
    description: "Studying ancient witch knowledge",
    tag: "Do not interrupt",
    quote: "Knowledge is the greatest treasure one can carry...",
    reaction: "Very intellectual!"
  },
  {
    img: elainaLean, name: "Sweet Mode", emoji: "💕",
    filter: "Happy",
    gradient: "from-pink-900/30 to-lavender-900/20",
    glowColor: "#C9B8FF",
    description: "When Elaina is in her softest form",
    tag: "Maximum Cuteness",
    quote: "Ehehe~ did you want to travel together? Just for a little while~",
    reaction: "Heart melted 💕"
  },
];

const FILTERS = ["All Moods", "Eating", "Grumpy", "Sleepy", "Happy", "Rare"];

const PERSONALITY_TEST_OPTIONS = [
  { label: "Adventurous", mood: "Rare", img: elainaSurprised },
  { label: "Cozy", mood: "Sleepy", img: elainaSleepy },
  { label: "Determined", mood: "Eating", img: elainaBread },
  { label: "Mysterious", mood: "Scholar", img: elainaGlasses },
];

export default function Moments() {
  const { playChime, playSparkle } = useAudio();
  const [activeFilter, setActiveFilter] = useState("All Moods");
  const [testResult, setTestResult] = useState<{ label: string, mood: string, img: string } | null>(null);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setClickedCardIndex(index);
    playChime();
    setTimeout(() => setClickedCardIndex(null), 2500);
  };

  const handleTestChoice = (option: any) => {
    playSparkle();
    setTestResult(option);
  };

  return (
    <div className="min-h-[100dvh] pt-24 pb-32 px-6 relative overflow-hidden bg-[#0B0B1A]">
      {/* Background Petals */}
      {Array.from({ length: 20 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;
        const size = 10 + Math.random() * 15;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-pink-300/30 pointer-events-none"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: `${size}px`,
              height: `${size}px`,
              animation: `petal-fall ${duration}s ${delay}s linear infinite`,
            }}
          />
        );
      })}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-pink-300 mb-4 inline-block relative drop-shadow-[0_0_15px_rgba(249,168,212,0.5)]"
          >
            <span className="absolute -left-8 -top-8 animate-[spin_4s_linear_infinite] text-4xl">✨</span>
            Elaina's Moments
            <span className="absolute -right-8 -bottom-4 animate-[spin_5s_linear_infinite_reverse] text-4xl">✨</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-sans italic text-white/80"
          >
            Every face tells a story~
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                data-testid={`filter-${f.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-[0_0_20px_rgba(244,114,182,0.6)] scale-110"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {moods.map((mood, idx) => {
              const isVisible = activeFilter === "All Moods" || activeFilter === mood.filter;
              const isClicked = clickedCardIndex === idx;

              return (
                <motion.div
                  key={mood.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isVisible ? 1 : 0.3,
                    scale: isVisible ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`relative cursor-pointer group w-full h-[420px]`}
                  onClick={() => isVisible && handleCardClick(idx)}
                  data-testid={`card-${mood.name.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                >
                  <div 
                    className={`absolute inset-0 rounded-3xl glass-panel bg-gradient-to-b ${mood.gradient} border-2 border-white/10 overflow-hidden transition-all duration-500`}
                    style={{
                      boxShadow: `0 0 0 ${mood.glowColor}00`,
                    }}
                  >
                    {/* Hover Glow using CSS variable trick or inline style on group hover could work, but we'll use a class/style approach */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 40px ${mood.glowColor}40` }} />
                    
                    {/* Top Content */}
                    <div className="p-6 relative z-20">
                      <div className="text-4xl mb-2 group-hover:scale-125 transition-transform origin-left">{mood.emoji}</div>
                      <h3 className="text-2xl font-bold text-white font-serif">{mood.name}</h3>
                      <p className="text-sm italic text-white/70 mt-1">{mood.description}</p>
                    </div>

                    {/* Image Area */}
                    <div className="absolute bottom-0 w-full flex justify-center z-10 transition-transform duration-300 group-hover:scale-[1.08] group-hover:-translate-y-4">
                      <img src={mood.img} alt={mood.name} className="h-[220px] object-contain drop-shadow-2xl" />
                    </div>

                    {/* Reaction Tag (Bottom) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full z-20 border border-white/20 whitespace-nowrap">
                      <span className="text-xs font-bold text-white/90">{mood.tag}</span>
                    </div>

                    {/* Hover Reaction Float */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-500 z-30 pointer-events-none">
                      <span className="text-lg font-bold drop-shadow-lg" style={{ color: mood.glowColor }}>{mood.reaction}</span>
                    </div>

                    {/* Click Confetti & Speech */}
                    <AnimatePresence>
                      {isClicked && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[120%] bg-white rounded-2xl p-3 z-50 shadow-xl border border-pink-200"
                        >
                          <p className="text-sm font-bold text-slate-800 text-center">{mood.quote}</p>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-pink-200" />
                          
                          {/* Confetti Particles */}
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 1, x: 0, y: 0 }}
                              animate={{ 
                                opacity: 0, 
                                x: (Math.random() - 0.5) * 150, 
                                y: (Math.random() - 0.5) * 150 - 50 
                              }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="absolute left-1/2 top-1/2 text-xl pointer-events-none"
                            >
                              {['✨', '🌸', '💖', '⭐'][Math.floor(Math.random() * 4)]}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Card Shake Animation triggered via class conditionally */}
                  <style>{`
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      25% { transform: translateX(-5px) rotate(-2deg); }
                      75% { transform: translateX(5px) rotate(2deg); }
                    }
                  `}</style>
                  <div className={`absolute inset-0 ${isClicked ? 'animate-[shake_0.4s_ease-in-out]' : ''} pointer-events-none`} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Witch Personality Test */}
        <div className="mt-32 p-10 glass-panel rounded-3xl relative overflow-hidden border-pink-400/30">
          <div className="absolute -right-20 -top-20 opacity-10 text-[200px]">🔮</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-12 glow-text">Which Elaina are you today?</h2>
          
          {!testResult ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {PERSONALITY_TEST_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleTestChoice(opt)}
                  data-testid={`test-choice-${opt.label.toLowerCase()}`}
                  className="p-6 rounded-2xl glass-panel border border-white/20 hover:border-pink-400 hover:bg-pink-900/20 transition-all text-xl font-serif text-white hover:scale-105 active:scale-95"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h3 className="text-3xl font-serif text-pink-300 mb-6">You are: {testResult.mood} Elaina!</h3>
              <div className="w-64 h-64 mx-auto bg-white/5 rounded-full border-4 border-pink-400/50 p-4 mb-8 shadow-[0_0_30px_rgba(244,114,182,0.3)]">
                <img src={testResult.img} alt={testResult.mood} className="w-full h-full object-contain" />
              </div>
              <button 
                onClick={() => setTestResult(null)}
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/30"
              >
                Take again
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes petal-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
