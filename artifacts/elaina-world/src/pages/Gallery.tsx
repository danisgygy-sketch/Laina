import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import imgFlowerCrown from "@assets/edited-photo_(5)_1781016102147.png";
import imgWitchCape from "@assets/edited-photo_(4)_1781016102247.png";
import imgSchoolUniform from "@assets/edited-photo_(3)_1781016102291.png";
import imgWhiteOutfit from "@assets/edited-photo_(2)_1781016102324.png";
import imgPointing from "@assets/edited-photo_(1)_1781016102354.png";
import imgReaching from "@assets/edited-photo_1781016102392.png";
import heroImg from "@assets/Adobe_Express_-_file_1781016014862.png";
import imgAlternate from "@assets/Adobe_Express_-_file_1781016102419.png";

const IMAGES = [
  { id: 1, src: heroImg, tag: "Magical", title: "The Ashen Witch", desc: "A serene moment with the broom." },
  { id: 2, src: imgFlowerCrown, tag: "Dreamy", title: "Floral Reverie", desc: "Crowned with the blossoms of a peaceful nation." },
  { id: 3, src: imgWitchCape, tag: "Adventure", title: "Journey's Breeze", desc: "The wind carrying tales of faraway lands." },
  { id: 4, src: imgSchoolUniform, tag: "Cute", title: "Academy Days", desc: "A strict uniform for a prodigy." },
  { id: 5, src: imgWhiteOutfit, tag: "Magical", title: "Silver Resolve", desc: "White garments contrasting the dark magic." },
  { id: 6, src: imgPointing, tag: "Adventure", title: "Guiding Light", desc: "Showing the way forward." },
  { id: 7, src: imgReaching, tag: "Dreamy", title: "Ethereal Grasp", desc: "Reaching for fading stars." },
  { id: 8, src: imgAlternate, tag: "Cute", title: "A Passing Glimpse", desc: "Just a wandering witch." },
];

const TABS = ["All", "Dreamy", "Adventure", "Magical", "Cute"];

export default function Gallery() {
  const { playChime, playSparkle } = useAudio();
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = filter === "All" ? IMAGES : IMAGES.filter(i => i.tag === filter);

  const openLightbox = (index: number) => {
    playChime(1000);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    playChime(600);
    setSelectedIndex(null);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filtered.length);
    playSparkle();
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
    playSparkle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Gallery of Memories</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === t ? 'bg-primary text-black shadow-[0_0_15px_hsl(var(--primary))]' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
                onClick={() => openLightbox(idx)}
                onMouseEnter={playSparkle}
              >
                <img src={img.src} alt={img.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                  <span className="px-3 py-1 border border-white/30 rounded-full text-xs text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    ✦ View
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white z-50">
              <X className="w-8 h-8" />
            </button>
            
            <button onClick={prevImg} className="absolute left-4 md:left-10 text-white/50 hover:text-white p-4">
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[85vh] max-w-5xl flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={filtered[selectedIndex].src} 
                alt={filtered[selectedIndex].title} 
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" 
              />
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-serif text-white">{filtered[selectedIndex].title}</h2>
                <p className="text-white/60 italic">{filtered[selectedIndex].desc}</p>
              </div>
            </motion.div>

            <button onClick={nextImg} className="absolute right-4 md:right-10 text-white/50 hover:text-white p-4">
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
