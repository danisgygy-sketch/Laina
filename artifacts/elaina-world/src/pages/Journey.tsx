import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { useAudio } from "@/hooks/useAudio";
import imgFlowerCrown from "@assets/edited-photo_(5)_1781016102147.png";
import imgWitchCape from "@assets/edited-photo_(4)_1781016102247.png";
import imgSchoolUniform from "@assets/edited-photo_(3)_1781016102291.png";
import imgWhiteOutfit from "@assets/edited-photo_(2)_1781016102324.png";
import imgPointing from "@assets/edited-photo_(1)_1781016102354.png";
import imgReaching from "@assets/edited-photo_1781016102392.png";
import heroImg from "@assets/Adobe_Express_-_file_1781016014862.png";

const TIMELINE = [
  { id: 1, title: "Amethyst Country", text: "A land of purple hues and blooming flora. The scent of lavender fills the air as the wind gently sweeps through the valleys.", mood: "🌸 Bittersweet", image: imgFlowerCrown },
  { id: 2, title: "The City of Stars", text: "Starlit skies reflecting on crystal clear waters. A serene battle was fought here to protect the shimmering peace.", mood: "✨ Magical", image: imgWhiteOutfit },
  { id: 3, title: "Staircase Country", text: "An endless climb towards the heavens. Reaching out for something just beyond grasp, tracing the steps of the past.", mood: "🌙 Mysterious", image: imgReaching },
  { id: 4, title: "The Witch's Academy", text: "The beginning of it all. Where talent bloomed into mastery under the watchful eyes of strict mentors.", mood: "💛 Warm", image: heroImg },
  { id: 5, title: "The Nation of Magicians", text: "A society where magic dictates law. A school uniform brings back memories of simpler days and strict rules.", mood: "✨ Magical", image: imgSchoolUniform },
  { id: 6, title: "The Land of Mages", text: "Pointing towards the future. A confident display of prowess that left the locals in sheer awe.", mood: "🔥 Fierce", image: imgPointing },
  { id: 7, title: "The Traveling Road", text: "Butterflies dancing along the path. No destination in sight, just the gentle rhythm of the journey.", mood: "🌿 Peaceful", image: imgWitchCape },
];

export default function Journey() {
  const { playChime } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen pt-24 pb-32 px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white glow-text mb-4"
          >
            The Wandering Chronicles
          </motion.h1>
          <p className="text-white/60 font-light max-w-lg mx-auto italic font-serif">
            "Pages turn, countries pass by. Only the memories remain immortal."
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary z-10 -translate-x-1/2 shadow-[0_0_15px_hsl(var(--primary))] animate-pulse" />

                  <div className={`w-full md:w-1/2 flex ${isEven ? 'justify-end md:pr-12' : 'justify-start md:pl-12'} pl-20 md:pl-0`}>
                    <div 
                      className="glass-panel p-6 rounded-2xl w-full max-w-md group hover:border-primary/50 transition-colors"
                      onMouseEnter={() => playChime(1200 + idx * 100)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase">Chapter {item.id}</span>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">{item.mood}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-3">{item.title}</h3>
                      <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed italic">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
