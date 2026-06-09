import React from "react";

interface CharacterCardProps {
  name: string;
  mood: string;
  description: string;
  imageSrc: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, mood, description, imageSrc }) => {
  return (
    <div className="group relative w-[280px] h-[380px] rounded-2xl glass-panel overflow-hidden shrink-0 transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)] hover:border-secondary/50 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-accent font-bold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
            {mood}
          </span>
        </div>
        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
