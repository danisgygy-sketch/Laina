import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSparkle: () => void;
  playChime: (pitch?: number) => void;
  playMagicCircle: () => void;
  playPageTransition: () => void;
  startAmbient: () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const isStarted = useRef(false);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtxRef.current = new AudioContextClass();
  };

  const ensurePlaying = () => {
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
      ensurePlaying();
      if (!isStarted.current) {
        startAmbient();
        isStarted.current = true;
      }
    };
    
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (ambientGainRef.current && audioCtxRef.current) {
      ambientGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : 0.04,
        audioCtxRef.current.currentTime,
        0.5
      );
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  const playSparkle = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  };

  const playChime = (pitch: number = 880) => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = "sine";
    osc2.type = "triangle";
    
    osc1.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc2.frequency.setValueAtTime(pitch * 1.01, ctx.currentTime); // detune
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.8);
    osc2.stop(ctx.currentTime + 0.8);
  };

  const playMagicCircle = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const freqs = [220, 440, 660];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f * 2, ctx.currentTime + 0.5);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12 / freqs.length, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + i * 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    });
    
    // Final ping
    setTimeout(() => {
      if (!audioCtxRef.current || isMuted) return;
      const ctx2 = audioCtxRef.current;
      const osc = ctx2.createOscillator();
      const gain = ctx2.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1760, ctx2.currentTime);
      gain.gain.setValueAtTime(0, ctx2.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx2.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx2.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx2.destination);
      osc.start();
      osc.stop(ctx2.currentTime + 0.4);
    }, 450);
  };

  const playPageTransition = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const bufferSize = ctx.sampleRate * 0.3; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
  };

  const startAmbient = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfoGain = ctx.createGain();
    
    osc1.type = "sine";
    osc2.type = "sine";
    osc1.frequency.value = 110;
    osc2.frequency.value = 165; 
    
    lfo.type = "sine";
    lfo.frequency.value = 0.2; 
    
    gain.gain.value = isMuted ? 0 : 0.04;
    ambientGainRef.current = gain;
    
    lfoGain.gain.value = 0.015;
    
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    lfo.start();
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSparkle, playChime, playMagicCircle, playPageTransition, startAmbient }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
}
