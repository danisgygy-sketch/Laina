import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

const SPELLS = [
  { name: "Silver Wind", type: "Wind Magic", rank: "✦✦✦✦✦ · S-Rank", desc: "A powerful gust of silver wind that can cut through steel and carry the caster for miles.", time: "Instant" },
  { name: "Crystal Mirror Shield", type: "Barrier Magic", rank: "✦✦✦✦✧ · A-Rank", desc: "Summons a reflective barrier of crystallized mana that repels magical attacks.", time: "1 Second" },
  { name: "Stardust Trail", type: "Movement Magic", rank: "✦✦✦✦✦ · S-Rank", desc: "Leaves a trail of stardust that allows the caster to blink between points instantaneously.", time: "Instant" },
  { name: "Memory Bloom", type: "Memory Magic", rank: "✦✦✦✧✧ · B-Rank", desc: "Extracts and displays a visual projection of a specific memory from an object or person.", time: "5 Seconds" },
  { name: "Moonweave Thread", type: "Binding Magic", rank: "✦✦✦✦✧ · A-Rank", desc: "Weaves threads of moonlight to bind targets with unbreakable, glowing strings.", time: "2 Seconds" },
  { name: "Dream Fragment", type: "Illusion Magic", rank: "✦✦✦✦✦ · S-Rank", desc: "Creates a hyper-realistic illusion derived from the target's deepest desires or fears.", time: "3 Seconds" }
];

export default function Grimoire() {
  const { playSparkle, playMagicCircle } = useAudio();
  const [isCasting, setIsCasting] = useState(false);

  const handleCast = () => {
    if (isCasting) return;
    setIsCasting(true);
    playMagicCircle();
    setTimeout(() => setIsCasting(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-32 px-6 relative overflow-hidden perspective-1000"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header & Magic Circle */}
        <div className="flex flex-col items-center mb-20 relative">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20"
            style={{ 
              background: 'radial-gradient(circle, hsl(var(--primary)/0.4) 0%, transparent 70%)',
              filter: isCasting ? 'blur(10px) brightness(1.5)' : 'blur(20px)',
              transform: isCasting ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
              transition: 'all 0.5s ease-out'
            }}
          />
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white glow-text mb-12 relative z-10">
            Elaina's Grimoire
          </h1>

          <div 
            className="relative w-64 h-64 cursor-pointer group"
            onClick={handleCast}
            onMouseEnter={playSparkle}
            data-testid="interactive-magic-circle"
          >
            {/* SVG Magic Circle */}
            <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-[0_0_15px_hsl(var(--primary))] ${isCasting ? 'animate-pulse' : 'animate-[spin_20s_linear_infinite]'}`}>
              <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="10 5" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" />
              <circle cx="100" cy="100" r="75" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
              <polygon points="100,15 174,142 26,142" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
              <polygon points="100,185 26,58 174,58" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
              {/* Runes (abstract shapes) */}
              <circle cx="100" cy="25" r="4" fill="hsl(var(--primary))" />
              <circle cx="165" cy="65" r="4" fill="hsl(var(--primary))" />
              <circle cx="165" cy="135" r="4" fill="hsl(var(--primary))" />
              <circle cx="100" cy="175" r="4" fill="hsl(var(--primary))" />
              <circle cx="35" cy="135" r="4" fill="hsl(var(--primary))" />
              <circle cx="35" cy="65" r="4" fill="hsl(var(--primary))" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 8" />
              <text x="100" y="105" fontFamily="serif" fontSize="16" fill="hsl(var(--primary))" textAnchor="middle" letterSpacing="2">MAGIC</text>
            </svg>
            
            {isCasting && (
              <motion.div 
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full border-4 border-primary"
              />
            )}
          </div>
          <p className="mt-6 text-sm text-primary uppercase tracking-widest font-bold animate-pulse">Click to Cast</p>
        </div>

        {/* Spells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SPELLS.map((spell, idx) => (
            <div key={spell.name} className="relative h-64 w-full perspective-1000 group">
              <div 
                className="w-full h-full relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180"
                onMouseEnter={playSparkle}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center border-primary/20 group-hover:border-primary/50 transition-colors">
                  <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-4">
                    <span className="text-2xl">✧</span>
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">{spell.name}</h3>
                  <p className="text-primary text-sm tracking-widest">{spell.rank}</p>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 backface-hidden glass-panel rounded-2xl p-6 flex flex-col rotate-y-180 border-secondary/30 bg-black/40">
                  <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2">
                    <span className="text-xs uppercase text-secondary font-bold">{spell.type}</span>
                    <span className="text-xs text-white/50">{spell.time}</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed font-serif italic mt-2">
                    "{spell.desc}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-serif text-white mb-8 text-center glow-text">Witch's Attributes</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-bold text-white/80 uppercase">Magic Power</span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"><div className="absolute inset-0 shimmer-bg opacity-50"></div></motion.div>
              </div>
              <span className="w-12 text-right text-sm text-primary font-mono">98</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-bold text-white/80 uppercase">Speed</span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full bg-gradient-to-r from-secondary/50 to-secondary rounded-full" />
              </div>
              <span className="w-12 text-right text-sm text-secondary font-mono">95</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-bold text-white/80 uppercase">Intelligence</span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 1.5, delay: 0.6 }} className="h-full bg-gradient-to-r from-accent/50 to-accent rounded-full" />
              </div>
              <span className="w-12 text-right text-sm text-accent font-mono">92</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-bold text-white/80 uppercase">Beauty</span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden shadow-[0_0_10px_hsl(var(--primary))]">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2, delay: 0.8 }} className="h-full bg-gradient-to-r from-primary via-white to-secondary rounded-full shimmer-bg" />
              </div>
              <span className="w-12 text-right text-lg text-white glow-text font-bold font-serif">∞</span>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
