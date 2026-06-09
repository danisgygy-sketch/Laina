import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

import { StarField } from "@/components/StarField";
import { ParticleSystem } from "@/components/ParticleSystem";
import { CharacterCard } from "@/components/CharacterCard";
import { FloatingWidgets } from "@/components/FloatingWidgets";
import { useAudio } from "@/hooks/useAudio";

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

const QUOTES = [
  "Ehehe~ Welcome to my world!",
  "I've been waiting for you, traveler...",
  "Would you like some magical candy? ✦",
  "The road ahead is full of wonder!",
  "Don't stare too long, you'll fall in love~"
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  const { playSparkle, playPageTransition } = useAudio();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setShowQuote(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/30 selection:text-white"
    >
      {/* Global Background Systems */}
      <StarField mouseX={mousePos.x} mouseY={mousePos.y} />
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 mix-blend-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>

      <FloatingWidgets />

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
              <Link href="/journey" onClick={playPageTransition} className="relative px-8 py-4 rounded-full overflow-hidden group bg-primary/20 border border-primary/50 text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300 shimmer-bg" />
                <span className="relative z-10 drop-shadow-md">Begin Journey</span>
              </Link>
              <Link href="/lore" onClick={playPageTransition} className="px-8 py-4 rounded-full border border-secondary/50 text-white font-bold tracking-widest uppercase text-sm hover:bg-secondary/10 hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)] transition-all duration-300 block">
                Read Lore
              </Link>
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
            
            {/* Dialogue Bubble */}
            <AnimatePresence>
              {showQuote && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="absolute top-10 right-20 lg:right-40 z-20 glass-panel px-6 py-4 rounded-2xl rounded-br-none border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.2)] max-w-[250px]"
                >
                  <p className="text-white text-sm font-serif italic relative z-10">{QUOTES[quoteIndex]}</p>
                </motion.div>
              )}
            </AnimatePresence>

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
            <span className="absolute top-20 right-20 text-2xl text-primary/50 animate-pulse pointer-events-none">✦</span>
            <span className="absolute bottom-40 left-10 text-xl text-secondary/50 animate-float-slow delay-1000 pointer-events-none">✧</span>
            <span className="absolute top-1/3 left-20 text-3xl text-accent/40 animate-pulse delay-500 pointer-events-none">★</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group" onClick={scrollToGallery}>
          <span className="text-xs text-white/50 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">Scroll to explore</span>
          <div className="flex flex-col items-center animate-bounce">
            <ChevronDown className="w-5 h-5 text-white/70 -mb-2 group-hover:text-primary transition-colors" />
            <ChevronDown className="w-5 h-5 text-white/50 group-hover:text-primary/70 transition-colors" />
          </div>
        </div>
      </section>

      {/* Gallery Section Preview */}
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
                onMouseEnter={playSparkle}
              >
                <CharacterCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Link href="/gallery" onClick={playPageTransition} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors uppercase tracking-widest text-sm font-bold">
            View Full Gallery
          </Link>
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
    </motion.div>
  );
}
