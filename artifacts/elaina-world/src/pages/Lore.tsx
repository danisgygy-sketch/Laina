import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { X, Star } from "lucide-react";

import imgFlowerCrown from "@assets/edited-photo_(5)_1781016102147.png";
import imgAlternate from "@assets/Adobe_Express_-_file_1781016102419.png";
import elainaKimono from "@localassets/elaina_kimono.png";

export default function Lore() {
  const { playSparkle, playChime } = useAudio();
  const [showPoster, setShowPoster] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pb-32 bg-[#0B0B1A]"
    >
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0B0B1A] z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src={imgFlowerCrown} 
          alt="Elaina" 
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex justify-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white glow-text tracking-wider">
            Encyclopedia Arcana
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-6 rounded-3xl sticky top-32">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
              <img src={imgAlternate} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-serif text-white font-bold">Elaina</h2>
                <p className="text-primary text-sm uppercase tracking-widest font-bold">イレイナ</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded border border-white/20 text-xs text-white">Title: The Ashen Witch</span>
                <span className="px-3 py-1 bg-white/10 rounded border border-white/20 text-xs text-white">Rank: Witch (S-Class)</span>
                <span className="px-3 py-1 bg-white/10 rounded border border-white/20 text-xs text-white">Status: Active Traveler</span>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 uppercase mb-2">Quote</p>
                <p className="text-sm font-serif italic text-white/80 border-l-2 border-primary pl-3 py-1">
                  "Who is this beautiful girl? That's right, it's me."
                </p>
              </div>
            </div>

            {/* Seasonal Portrait */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Seasonal Portrait
              </h4>
              <div className="relative rounded-xl overflow-hidden border border-rose-400/30 p-1 bg-gradient-to-br from-rose-900/20 to-transparent shadow-[0_0_20px_rgba(244,63,94,0.1)] group">
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 to-transparent z-10" />
                <img src={elainaKimono} alt="Seasonal Elaina" className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-3 left-3 z-20">
                  <p className="text-xs text-rose-200 font-serif italic drop-shadow-md">Festival Mode 🎋</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Scrollable Lore Content */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h3 className="text-3xl font-serif text-primary mb-6 flex items-center gap-3">
              <span className="text-white/20">01</span> Origin
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-white/80 font-light leading-relaxed">
              <p>
                <span className="float-left text-6xl font-serif text-primary leading-none pr-3 pb-2 mt-2 glow-text">B</span>
                orn in the Peaceful Nation of Robetta, Elaina was fascinated by the book <em>"The Adventures of Nike"</em> since childhood. Resolving to become a witch and travel the world just like her idol, she studied relentlessly.
              </p>
              <p>
                She became the youngest person to pass the sorcery exams at age 14. However, finding a master to train her proved difficult as her immense talent intimidated local witches. Eventually, she apprenticed under the mysterious "Stardust Witch" Fran, completing her training and earning her title, "The Ashen Witch," named after her distinctive hair color.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-serif text-secondary mb-6 flex items-center gap-3">
              <span className="text-white/20">02</span> Personality
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">Observant</h4>
                <p className="text-sm text-white/70">Prefers to watch events unfold rather than intervene, maintaining the neutral stance of a traveler.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">Self-Confident</h4>
                <p className="text-sm text-white/70">Highly aware of her own beauty and magical prowess, often introducing herself with unabashed praise.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">Pragmatic</h4>
                <p className="text-sm text-white/70">Values money and survival. Will often charge for her services unless deeply emotionally invested.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">Compassionate</h4>
                <p className="text-sm text-white/70">Despite her aloof exterior, she frequently shows a soft heart for those genuinely suffering.</p>
              </div>
            </div>
          </section>

          <section className="relative">
            <h3 className="text-3xl font-serif text-accent mb-6 flex items-center gap-3">
              <span className="text-white/20">03</span> The Staff
            </h3>
            <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-transparent to-accent/5">
              <p className="text-white/80 leading-relaxed mb-6">
                Her primary magical implement is a wooden broom/staff that allows for high-speed flight. It channels her mana efficiently, enabling her to cast complex defensive and offensive spells while airborne.
              </p>
              <div className="flex gap-4">
                <span className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent">🧹</span>
                <div>
                  <h5 className="font-bold text-white">Flight Capable</h5>
                  <p className="text-xs text-white/60">Max speed unknown. Highly maneuverable.</p>
                </div>
              </div>
            </div>
            
            {/* Easter Egg Trigger */}
            <div 
              className="absolute -right-4 top-10 cursor-pointer text-white/10 hover:text-primary hover:scale-125 transition-all p-4 z-50"
              onClick={() => { playChime(1500); setShowPoster(true); }}
              onMouseEnter={playSparkle}
              data-testid="easter-egg-star"
            >
              <Star className="w-6 h-6 fill-current" />
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="text-white/20">04</span> Constellation Map
            </h3>
            <div className="w-full aspect-video glass-panel rounded-2xl overflow-hidden relative flex items-center justify-center p-4">
              <svg viewBox="0 0 800 400" className="w-full h-full max-w-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {/* Connections */}
                <polyline points="100,200 250,100 400,250 550,150 700,200" fill="none" stroke="hsl(var(--primary)/0.3)" strokeWidth="2" strokeDasharray="5 5" />
                <polyline points="250,100 400,50 550,150" fill="none" stroke="hsl(var(--secondary)/0.3)" strokeWidth="1.5" />
                
                {/* Nodes & Hover Areas */}
                {[
                  { x: 100, y: 200, label: "Robetta" },
                  { x: 250, y: 100, label: "City of Witches" },
                  { x: 400, y: 250, label: "Royal Celesteria" },
                  { x: 400, y: 50, label: "Nation of Mages" },
                  { x: 550, y: 150, label: "Clockwork City" },
                  { x: 700, y: 200, label: "Unknown Destination" },
                ].map((node, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle cx={node.x} cy={node.y} r="6" fill="hsl(var(--primary))" className="group-hover:r-[8px] transition-all" />
                    <circle cx={node.x} cy={node.y} r="15" fill="transparent" />
                    <text x={node.x} y={node.y - 15} textAnchor="middle" fill="white" fontSize="14" opacity="0" className="group-hover:opacity-100 transition-opacity font-serif">{node.label}</text>
                  </g>
                ))}
              </svg>
            </div>
          </section>

        </div>
      </div>

      {/* Wanted Poster Modal */}
      <AnimatePresence>
        {showPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowPoster(false)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              className="bg-[#DBC1A1] p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowPoster(false)} className="absolute top-2 right-2 text-black/50 hover:text-black">
                <X className="w-6 h-6" />
              </button>
              
              <div className="border-4 border-double border-[#5C4033] p-6 text-center">
                <h2 className="text-[#5C4033] text-5xl font-serif font-bold tracking-widest mb-2 uppercase" style={{ fontFamily: '"Playfair Display", serif' }}>Wanted</h2>
                <h3 className="text-[#8B5A2B] text-xl font-serif mb-6 uppercase tracking-widest">Dead or Alive</h3>
                
                <div className="w-48 h-48 mx-auto border-2 border-[#5C4033] mb-6 overflow-hidden sepia contrast-125">
                  <img src={imgAlternate} alt="Suspect" className="w-full h-full object-cover" />
                </div>
                
                <p className="text-[#5C4033] text-2xl font-serif font-bold mb-2">The Ashen Witch</p>
                <p className="text-[#8B5A2B] italic mb-6 text-sm">For the crime of being too beautiful and stealing hearts across the continent.</p>
                
                <div className="border-t-2 border-b-2 border-[#5C4033] py-2 mb-4">
                  <p className="text-[#5C4033] text-lg font-bold uppercase tracking-wider">Reward</p>
                  <p className="text-[#8B5A2B] text-3xl font-serif">∞ Magical Candies</p>
                </div>
                
                <p className="text-xs text-[#5C4033]/70 uppercase tracking-widest mt-6">Signed: The Witches Council</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
