import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquareHeart } from "lucide-react";
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

type CompanionState = {
  img: string;
  mood: string;
  message: string;
};

const companionStates: CompanionState[] = [
  { img: elainaSmile, mood: "happy", message: "Welcome back! ✨" },
  { img: elainaLean, mood: "sweet", message: "I'm glad you're here~" },
  { img: elainaBread, mood: "hungry", message: "I could really use a snack right now..." },
  { img: elainaPout, mood: "grumpy", message: "You've been on this page for a while..." },
  { img: elainaSleepy, mood: "sleepy", message: "zzZ... oh! You're still here!" },
  { img: elainaSurprised, mood: "surprised", message: "Oh my— hello there!" },
  { img: elainaCrepe, mood: "foodie", message: "This reminds me of that crepe shop in Robetta..." },
  { img: elainaGlasses, mood: "scholar", message: "Knowledge fuels every journey." },
  { img: elainaKimono, mood: "festival", message: "A new adventure begins~" },
];

export function ElainaCompanion() {
  const { playChime } = useAudio();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStateIdx, setCurrentStateIdx] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [messageLog, setMessageLog] = useState<string[]>([]);
  
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setCompanionState = (idx: number, tempMessage?: boolean) => {
    setCurrentStateIdx(idx);
    setShowMessage(true);
    setMessageLog(prev => [companionStates[idx].message, ...prev].slice(0, 3));
    
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    if (!tempMessage) {
      messageTimerRef.current = setTimeout(() => setShowMessage(false), 4000);
    }
  };

  const startCycle = () => {
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    cycleTimerRef.current = setInterval(() => {
      setCurrentStateIdx(prev => {
        let next = prev + 1;
        if (next >= companionStates.length) next = 0;
        setCompanionState(next);
        return next;
      });
    }, 12000);
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      // Index 4 is Sleepy
      setCompanionState(4);
    }, 30000);
  };

  useEffect(() => {
    setCompanionState(0);
    startCycle();
    resetIdleTimer();

    const handleMouseMove = () => resetIdleTimer();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  const handleCompanionClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    
    if (clickCountRef.current >= 3) {
      // Index 5 is Surprised
      setCompanionState(5);
      playChime();
      clickCountRef.current = 0;
    } else {
      clickTimerRef.current = setTimeout(() => {
        if (clickCountRef.current < 3) {
          setIsMenuOpen(prev => !prev);
          playChime(1200);
        }
        clickCountRef.current = 0;
      }, 300);
    }
  };

  const handleTalk = () => {
    let next = Math.floor(Math.random() * companionStates.length);
    if (next === currentStateIdx) next = (next + 1) % companionStates.length;
    setCompanionState(next);
    playChime();
    startCycle(); // reset cycle
  };

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 left-6 z-[100] w-4 h-4 bg-pink-400 rounded-full shadow-[0_0_15px_#f472b6] cursor-pointer hover:scale-150 transition-transform animate-pulse"
        onClick={() => setIsMinimized(false)}
        title="Show Elaina"
        data-testid="companion-restore"
      />
    );
  }

  const currentState = companionStates[currentStateIdx];

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-end">
      
      {/* Companion Main Circle */}
      <div className="relative">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-[90px] left-0 w-64 glass-panel border border-pink-400/30 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                <span className="text-sm font-bold text-pink-300">Elaina</span>
                <button onClick={() => setIsMinimized(true)} className="text-white/50 hover:text-white" data-testid="companion-minimize">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 mb-4">
                {messageLog.map((msg, i) => (
                  <p key={i} className={`text-xs ${i === 0 ? 'text-white' : 'text-white/50'}`}>
                    {msg}
                  </p>
                ))}
              </div>

              <button 
                onClick={handleTalk}
                className="w-full flex items-center justify-center gap-2 py-2 bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 rounded-lg transition-colors text-sm font-bold"
                data-testid="companion-talk"
              >
                <MessageSquareHeart className="w-4 h-4" />
                Talk to Elaina
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 rounded-full border-2 border-pink-400/50 shadow-[0_0_20px_rgba(244,114,182,0.4)] overflow-hidden cursor-pointer bg-[#1A1A2E] animate-float relative z-10"
          onClick={handleCompanionClick}
          data-testid="companion-avatar"
        >
          <img src={currentState.img} alt={currentState.mood} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && !isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-4 mb-6 relative glass-panel bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl rounded-bl-none shadow-lg max-w-[200px]"
          >
            {/* Small triangle pointer using borders */}
            <div className="absolute -left-2 bottom-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-white/20 border-b-[10px] border-b-transparent" />
            <p className="text-sm font-sans text-white leading-snug">{currentState.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
