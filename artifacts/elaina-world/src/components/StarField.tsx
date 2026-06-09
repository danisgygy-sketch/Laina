import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  mouseX: number;
  mouseY: number;
}

export const StarField: React.FC<StarFieldProps> = ({ mouseX, mouseY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{ x: number; y: number; size: number; alpha: number; speed: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax offsets
      const offsetX = (mouseX - window.innerWidth / 2) * 0.02;
      const offsetY = (mouseY - window.innerHeight / 2) * 0.02;

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.speed *= -1;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        
        let drawX = star.x + offsetX * (star.size * 0.5);
        let drawY = star.y + offsetY * (star.size * 0.5);
        
        // Wrap around
        if (drawX < 0) drawX = canvas.width;
        if (drawX > canvas.width) drawX = 0;
        if (drawY < 0) drawY = canvas.height;
        if (drawY > canvas.height) drawY = 0;

        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
