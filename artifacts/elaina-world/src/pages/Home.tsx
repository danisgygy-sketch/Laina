import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import { StarField } from "@/components/StarField";
import { ParticleSystem } from "@/components/ParticleSystem";
import { CharacterCard } from "@/components/CharacterCard";
import { FloatingWidgets } from "@/components/FloatingWidgets";

// Assets
import heroImg from "@assets/Adobe_Express_-_file_1781016014862.png";
import imgFlowerCrown from "@assets/edited-photo_(5)_1781016102147.png";
import imgWitchCape from "@assets/edited-photo_(4)_1781016102247.png";
import imgSchoolUniform from "@assets/edited-photo_(3)_1781016102291.png";
import imgWhiteOutfit from "@assets/edited-photo_(2)_1781016102324.png";
import imgPointing from "@assets/edited-photo_(1)_1781016102354.png";
import imgReaching from "@assets/edited-photo_1781016102392.png";
import imgAlternate from "@assets/Adobe_Express_-_file_1781016102419.png";

const CARDS = [
  { name: "The Ashen Witch", mood: "Mysterious", description: "Wandering from town to town, observing the beautiful and tragic facets of life.", imageSrc: imgWitchCape },
  { name: "Floral Reverie", mood: "Peaceful", description: "A quiet moment surrounded by the blooming flowers of a forgotten nation.", imageSrc: imgFlowerCrown },
  { name: "Academy Days", mood: "Determined", description: "Memories of the Magic Academy where a prodigy honed her immense talent.", imageSrc: imgSchoolUniform },
  { name: "Silver Resolve", mood: "Fierce", description: "Clad in white, ready to face the magical anomalies that threaten the peace.", imageSrc: imgWhiteOutfit },
  { name: "Commanding Presence", mood: "Confident", description: "Guiding the path forward with unwavering certainty and a touch of arrogance.", imageSrc: imgPointing },
  { name: "Reaching Out", mood: "Ethereal", description: "Grasping at fading memories in a world that constantly changes.", imageSrc: imgReaching },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Global Background Systems */}
      <StarField mouseX={mousePos.x} mouseY={mousePos.y} />
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 mix-blend-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>

      <FloatingWidgets />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "glass-panel py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-white glow-text tracking-wide cursor-pointer" onClick={() => scrollTo('hero')}>
            ✦ Elaina
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Journey', 'Gallery', 'Grimoire', 'Lore'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm text-white/70 hover:text-white hover:glow-text transition-all tracking-wider uppercase"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="hidden md:block px-6 py-2 rounded-full border border-white/20 text-white text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ParticleSystem />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-start gap-6"
          >
            <div className="glass-panel px-4 py-1.5 rounded-full border-primary/30 flex items-center gap-2 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary">✦ The Silver Witch Travels</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-shimmer">
                Elaina
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest uppercase">
              Wandering Witch <span className="text-primary mx-2">·</span> Collector of Memories
            </p>
            
            <p className="text-lg text-white/60 font-serif italic max-w-md leading-relaxed border-l-2 border-white/20 pl-4 py-2">
              "Every road leads somewhere new. Every stranger becomes a story."
            </p>
            
            <div className="flex items-center gap-6 mt-4">
              <button className="relative px-8 py-4 rounded-full overflow-hidden group bg-primary/20 border border-primary/50 text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300 shimmer-bg" />
                <span className="relative z-10 drop-shadow-md">Enter Dream</span>
              </button>
              <button className="px-8 py-4 rounded-full border border-secondary/50 text-white font-bold tracking-widest uppercase text-sm hover:bg-secondary/10 hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)] transition-all duration-300">
                Explore World
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="relative h-[600px] w-full flex items-center justify-center lg:justify-end"
          >
            {/* Radial Glow behind character */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none" />
            
            <motion.div
              style={{
                x: (mousePos.x - window.innerWidth / 2) * -0.02,
                y: (mousePos.y - window.innerHeight / 2) * -0.02,
              }}
              className="relative z-10 w-full h-full flex justify-center lg:justify-end"
            >
              <img 
                src={heroImg} 
                alt="Elaina" 
                className="h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-float"
              />
            </motion.div>

            {/* Decorative floaters */}
            <span className="absolute top-20 right-20 text-2xl text-primary/50 animate-pulse">✦</span>
            <span className="absolute bottom-40 left-10 text-xl text-secondary/50 animate-float-slow delay-1000">✧</span>
            <span className="absolute top-1/3 left-20 text-3xl text-accent/40 animate-pulse delay-500">★</span>
          </motion.div>

        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-white/20 block" />
              <span className="text-secondary">✧</span>
              <span className="h-[1px] w-12 bg-white/20 block" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Memories of the Journey</h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">Glimpses of places visited, people met, and magic woven across countless distant lands.</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="ml-6 lg:ml-12 overflow-hidden" 
          ref={emblaRef}
        >
          <div className="flex gap-6 py-8 pr-12">
            {CARDS.map((card, idx) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <CharacterCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quote Section */}
      <section id="grimoire" className="py-32 relative flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl mx-6 w-full"
        >
          {/* Decorative scatter */}
          <span className="absolute -top-10 -left-10 text-3xl text-primary animate-pulse">✦</span>
          <span className="absolute top-20 -right-12 text-2xl text-secondary animate-float">✧</span>
          <span className="absolute -bottom-10 right-10 text-xl text-accent animate-pulse delay-300">★</span>
          
          <div className="glass-panel p-12 md:p-20 rounded-3xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="text-2xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-8 relative z-10 glow-text">
              "The journey is not about the destination. It is about the people you meet, and the stories you carry home."
            </p>
            <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm relative z-10">
              — Elaina, The Silver Witch
            </p>
          </div>
        </motion.div>
      </section>

      {/* Lore Section */}
      <section id="lore" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-3xl overflow-hidden glass-panel group"
          >
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
            <img 
              src={imgAlternate} 
              alt="Elaina Casting" 
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20" />
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider mb-3">
                Current Location: Unknown
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">The Silver Witch</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                Fascinated by the stories of Nike's adventures since childhood, Elaina set out to become a witch and travel the world. Defying the odds, she became the youngest apprentice to pass the sorcery exams.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Her journey has no singular goal. She merely travels, observes, and occasionally intervenes—a passing observer in the grand tapestry of countless lives. Beautiful, talented, and delightfully arrogant.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['⚔️ S-Rank Witch', '🧭 Eternal Traveler', '📖 Seeker of Stories'].map((badge) => (
                <div key={badge} className="glass-panel px-5 py-2.5 rounded-full border-white/10 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors cursor-default">
                  {badge}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/50 uppercase tracking-widest font-bold mb-4">Magical Affinities</p>
              <div className="flex flex-wrap gap-3">
                {['Elemental Weaving', 'Flight Magic', 'Time Restoration', 'Combat Sorcery'].map((tag) => (
                  <span key={tag} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-transparent to-black/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center z-10 relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 mb-6 mx-auto relative group">
             <div className="absolute inset-0 bg-primary/20 animate-pulse z-10" />
             <img src={heroImg} alt="Elaina Mini" className="w-full h-full object-cover object-top" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white glow-text mb-2">✦ Elaina's Dream World</h3>
          <p className="text-white/50 text-sm font-light mb-8">A Fan Tribute to the Wandering Witch</p>
          
          <div className="flex gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all cursor-pointer">
                <span className="text-white/70">✦</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/30 uppercase tracking-widest">
            "May our paths cross again."
          </p>
        </div>
      </footer>
    </div>
  );
}
