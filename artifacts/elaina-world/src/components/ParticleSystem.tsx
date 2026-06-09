import React, { useEffect, useRef } from 'react';

export const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; color: string; speedY: number; speedX: number; life: number; maxLife: number }> = [];

    const colors = ['#FFB7C5', '#C9B8FF', '#7DE8FF', '#FFFFFF'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * -1 - 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: Math.random() * 300 + 100
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: 40 }, createParticle);
      // Pre-distribute them
      particles.forEach(p => {
        p.y = Math.random() * canvas.height;
        p.life = Math.random() * p.maxLife;
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.life >= p.maxLife || p.y < -10) {
          particles[index] = createParticle();
        }

        const opacity = 1 - (p.life / p.maxLife);
        
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * 0.6;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
};
