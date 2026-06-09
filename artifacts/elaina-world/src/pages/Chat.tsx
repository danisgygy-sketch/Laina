import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";
import { Send, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import elainaSmile from "@/assets/elaina_smile.png";
import elainaLean from "@/assets/elaina_lean.png";
import elainaSurprised from "@/assets/elaina_surprised.png";
import elainaCrepe from "@/assets/elaina_crepe.png";
import elainaPout from "@/assets/elaina_pout.png";
import elainaSleepy from "@/assets/elaina_sleepy.png";

type Message = { role: "user" | "assistant"; content: string; id: string };
type Mood = "smile" | "surprised" | "lean" | "crepe" | "pout" | "sleepy";

const MOOD_IMAGES: Record<Mood, string> = {
  smile: elainaSmile,
  surprised: elainaSurprised,
  lean: elainaLean,
  crepe: elainaCrepe,
  pout: elainaPout,
  sleepy: elainaSleepy,
};

const detectMood = (text: string): Mood => {
  const lower = text.toLowerCase();
  if (lower.includes("food") || lower.includes("eat") || lower.includes("crepe") || lower.includes("bread") || lower.includes("sweet")) return "crepe";
  if (lower.includes("ehe") || lower.includes("beautiful") || lower.includes("wonderful") || lower.includes("happy")) return "smile";
  if (lower.includes("what") || lower.includes("how") || lower.includes("curious") || lower.includes("?")) return "surprised";
  if (lower.includes("no") || lower.includes("bother") || lower.includes("stop") || lower.includes("tired")) return "pout";
  if (lower.includes("sleep") || lower.includes("rest") || lower.includes("zzz")) return "sleepy";
  return "lean";
};

const QUICK_PROMPTS = [
  "Tell me about your travels~",
  "What's your favorite food?",
  "Describe yourself...",
  "What magic can you do?",
  "Where should I visit?"
];

export default function Chat() {
  const { playChime, playSparkle } = useAudio();
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Ehe~ My, my... so you've found your way here. How curious. I am Elaina — the most beautiful witch in the world, and author of the acclaimed series 'Witch's Journey.' I suppose I have a moment to spare. What is it you wish to know, traveler?",
      id: "opening"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<Mood>("smile");
  
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [diaryLocation, setDiaryLocation] = useState("");
  const [diaryEntry, setDiaryEntry] = useState("");
  const [isGeneratingDiary, setIsGeneratingDiary] = useState(false);
  const [displayedDiary, setDisplayedDiary] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput ?? input;
    if (!textToSend.trim() || isLoading) return;

    const newMessage: Message = { role: "user", content: textToSend, id: Date.now().toString() };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${BASE}/api/elaina/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: textToSend, 
          history: messages.map(m => ({ role: m.role, content: m.content })) 
        }),
      });
      
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      const replyText = data.reply;
      
      setMessages(prev => [...prev, { role: "assistant", content: replyText, id: Date.now().toString() }]);
      setCurrentMood(detectMood(replyText));
      playChime();
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Hmm... it seems my magical correspondence is disrupted. Try again in a moment.", 
        id: Date.now().toString() 
      }]);
      setCurrentMood("pout");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateDiary = async () => {
    if (!diaryLocation.trim() || isGeneratingDiary) return;
    
    setIsGeneratingDiary(true);
    setDiaryEntry("");
    setDisplayedDiary("");
    playSparkle();
    
    try {
      const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${BASE}/api/elaina/diary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: diaryLocation }),
      });
      
      if (!res.ok) throw new Error("Failed to fetch diary");
      
      const data = await res.json();
      setDiaryEntry(data.entry);
    } catch (err) {
      setDiaryEntry("The pages of my diary remain blank. Perhaps the magic was interrupted.");
    } finally {
      setIsGeneratingDiary(false);
    }
  };

  useEffect(() => {
    if (diaryEntry) {
      let i = 0;
      setDisplayedDiary("");
      const timer = setInterval(() => {
        setDisplayedDiary(prev => prev + diaryEntry.charAt(i));
        i++;
        if (i >= diaryEntry.length) {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [diaryEntry]);

  return (
    <div className="min-h-[100dvh] pt-24 pb-6 px-4 md:px-8 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto h-[100dvh] overflow-hidden">
      
      {/* Left Panel: Character */}
      <div className="w-full md:w-[35%] flex flex-col items-center justify-center glass-panel rounded-3xl p-6 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 hidden md:block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentMood}
              src={MOOD_IMAGES[currentMood]} 
              alt="Elaina"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>
        
        <div className="text-center z-10 w-full">
          <div className="flex items-center justify-center gap-4 md:hidden mb-4">
            <img src={MOOD_IMAGES[currentMood]} alt="Elaina" className="w-16 h-16 object-contain drop-shadow-lg" />
            <div className="text-left">
              <h1 className="text-2xl font-serif glow-text">Elaina</h1>
              <p className="text-white/60 text-xs tracking-widest uppercase">The Silver Witch · S-Rank</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <h1 className="text-4xl font-serif glow-text mb-2">Elaina</h1>
            <p className="text-white/60 text-sm tracking-widest uppercase mb-6">The Silver Witch · S-Rank</p>
          </div>
          
          <div className="glass-panel py-2 px-4 rounded-full text-sm inline-flex items-center gap-2 mb-6 border border-white/10">
            <span className="text-primary animate-pulse">✦</span> Traveling · Ready to chat
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">📖 Witch's Journey Author</span>
            <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">✨ S-Rank Sorceress</span>
            <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">🌸 World Traveler</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Chat */}
      <div className="w-full md:w-[65%] flex flex-col h-[calc(100vh-200px)] md:h-full glass-panel rounded-3xl overflow-hidden relative">
        <div className="p-4 border-b border-white/10 bg-black/20 flex flex-col shrink-0">
          <h2 className="text-xl font-serif text-white glow-text">✦ Witch's Correspondence</h2>
          <p className="text-xs text-white/50">Direct line to the Silver Witch</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: m.role === "user" ? 20 : -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
              >
                {m.role === "assistant" && (
                  <img src={elainaSmile} alt="Elaina avatar" className="w-8 h-8 rounded-full border border-primary/30 object-cover bg-black/40 shrink-0" />
                )}
                <div className={`max-w-[80%] p-4 text-sm leading-relaxed shadow-lg ${
                  m.role === "user" 
                    ? "bg-gradient-to-br from-primary/80 to-purple-600/80 text-white rounded-2xl rounded-br-sm" 
                    : "glass-panel border border-primary/20 text-white/90 rounded-2xl rounded-bl-sm"
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start items-end gap-2"
              >
                <img src={elainaSmile} alt="Elaina avatar" className="w-8 h-8 rounded-full border border-primary/30 object-cover bg-black/40" />
                <div className="glass-panel border border-primary/20 p-4 rounded-2xl rounded-bl-sm flex items-center gap-1">
                  <span className="text-sm text-white/60 mr-2">Elaina is writing</span>
                  <div className="flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        
        {/* Diary Request Section */}
        <div className="px-4 shrink-0">
          <button 
            onClick={() => setDiaryOpen(!diaryOpen)}
            className="w-full text-xs flex items-center justify-between text-white/60 hover:text-primary transition-colors py-2 border-t border-white/10"
            data-testid="button-toggle-diary"
          >
            <span>✦ Request a Travel Diary Entry</span>
            {diaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          <AnimatePresence>
            {diaryOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4 space-y-3">
                  <div className="flex gap-2">
                    <Input 
                      value={diaryLocation}
                      onChange={(e) => setDiaryLocation(e.target.value)}
                      placeholder="Enter a location name..."
                      className="bg-black/30 border-white/10 focus-visible:ring-primary h-9 text-sm"
                      maxLength={50}
                    />
                    <Button 
                      onClick={generateDiary} 
                      disabled={isGeneratingDiary || !diaryLocation.trim()}
                      className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 h-9"
                      data-testid="button-generate-diary"
                    >
                      {isGeneratingDiary ? <Sparkles className="w-4 h-4 animate-spin" /> : "Generate"}
                    </Button>
                  </div>
                  
                  {displayedDiary && (
                    <div className="p-4 bg-gradient-to-b from-[#f4e4c1]/10 to-[#eaddb6]/5 border border-[#d4c39b]/20 rounded-lg text-[#ece6d5] font-serif text-sm italic leading-relaxed shadow-inner">
                      {displayedDiary}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/10 shrink-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                data-testid={`button-quick-prompt-${prompt.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 text-white/80 transition-colors px-3 py-1.5 rounded-full"
              >
                {prompt}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Write to the Silver Witch..."
              maxLength={300}
              className="bg-white/5 border-white/20 focus-visible:ring-primary rounded-full pr-14 h-12 glass-panel"
              data-testid="input-chat"
            />
            <div className="absolute right-12 text-[10px] text-white/40 pointer-events-none">
              {input.length}/300
            </div>
            <Button 
              size="icon"
              disabled={isLoading || !input.trim()}
              onClick={() => handleSend()}
              className="absolute right-1.5 h-9 w-9 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 disabled:opacity-50"
              data-testid="button-send"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
