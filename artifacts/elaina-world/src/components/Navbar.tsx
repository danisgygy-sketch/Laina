import { Link, useLocation } from "wouter";
import { useAudio } from "@/hooks/useAudio";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import imgAlternate from "@assets/Adobe_Express_-_file_1781016102419.png";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Journey", href: "/journey" },
  { name: "Gallery", href: "/gallery" },
  { name: "Moments", href: "/moments" },
  { name: "Chat", href: "/chat" },
  { name: "Grimoire", href: "/grimoire" },
  { name: "Lore", href: "/lore" },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { isMuted, toggleMute, playSparkle, playPageTransition } = useAudio();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    if (location !== href) {
      playPageTransition();
    }
    setLocation(href);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 py-4 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div 
            className="text-2xl font-serif font-bold text-white glow-text tracking-wide cursor-pointer relative group" 
            onClick={() => handleNav("/")}
            onMouseEnter={playSparkle}
            data-testid="link-logo"
          >
            ✦ Elaina
            <span className="absolute -top-2 -right-4 text-xs text-primary opacity-0 group-hover:opacity-100 group-hover:animate-float transition-all">✧</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.href)}
                  onMouseEnter={playSparkle}
                  data-testid={`link-${item.name.toLowerCase()}`}
                  className={`text-sm tracking-wider uppercase transition-all ${
                    isActive ? "text-white glow-text font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMute} 
              className="text-white/70 hover:text-white transition-colors"
              data-testid="button-mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileOpen(true)}
              data-testid="button-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm glass-panel z-[70] p-6 flex flex-col md:hidden border-l border-white/10"
            >
              <div className="flex justify-end">
                <button onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6 mt-12">
                {LINKS.map((item) => {
                  const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNav(item.href)}
                      className={`text-2xl font-serif tracking-widest text-left transition-all ${
                        isActive ? "text-primary glow-text" : "text-white/80"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-auto relative rounded-2xl overflow-hidden h-48 border border-white/10">
                <img src={imgAlternate} alt="Elaina" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white/50 text-xs tracking-widest uppercase">The Silver Witch</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
