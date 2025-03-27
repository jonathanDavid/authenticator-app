import React, { useEffect, useRef } from 'react';
import { useTheme } from '../theme_context';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  type: 'sphere' | 'leaf' | 'hat' | 'star';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  targetOpacity: number;
  baseX: number;
  baseY: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    const createParticles = () => {
      particles.current = [];
      const types: ('sphere' | 'leaf' | 'hat' | 'star')[] = ['sphere', 'leaf', 'hat', 'star'];
      const particleCount = 300;
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          opacity: 0,
          targetOpacity: 0.2 + Math.random() * 0.2
        });
      }
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      const hue = isDark ? 230 : 200; // Fixed hue value
      const gradient = ctx.createRadialGradient(x - size/3, y - size/3, 0, x, y, size);
      gradient.addColorStop(0, `hsla(${hue}, 70%, 75%, ${opacity})`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 55%, ${opacity * 0.5})`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      const hue = isDark ? 230 : 200; // Fixed hue value
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size, 0, 0, size);
      ctx.quadraticCurveTo(-size, 0, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    const drawHat = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      const hue = isDark ? 230 : 200; // Fixed hue value
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${opacity})`;
      
      ctx.beginPath();
      ctx.arc(0, 0, size, Math.PI, 0, false);
      ctx.fill();
      
      ctx.fillRect(-size * 1.5, 0, size * 3, size * 0.5);
      
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number) => {
      const hue = isDark ? 230 : 200; // Fixed hue value
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${opacity})`;
      
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.lineTo(
          Math.cos(angle + Math.PI / 4) * (size * 0.5),
          Math.sin(angle + Math.PI / 4) * (size * 0.5)
        );
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(243, 244, 246, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Reduced interaction radius
        
        if (distance < maxDistance) {
          // Weaker repulsion when close to mouse
          const force = (1 - distance / maxDistance) * 0.01; // Significantly reduced force
          particle.x -= dx * force;
          particle.y -= dy * force;
        } else {
          // Gentler return to base position
          const returnSpeed = 0.05; // Reduced return speed
          particle.x += (particle.baseX - particle.x) * returnSpeed;
          particle.y += (particle.baseY - particle.y) * returnSpeed;
        }

        // Add very subtle random movement
        particle.x += particle.speedX * 0.1; // Further reduced movement
        particle.y += particle.speedY * 0.1; // Further reduced movement
        particle.rotation += particle.rotationSpeed;

        // Update base position if particle moves too far
        const maxOffset = 30; // Reduced maximum offset
        if (Math.abs(particle.x - particle.baseX) > maxOffset) {
          particle.baseX = particle.x;
        }
        if (Math.abs(particle.y - particle.baseY) > maxOffset) {
          particle.baseY = particle.y;
        }

        // Screen wrapping
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.1;

        switch (particle.type) {
          case 'sphere':
            drawSphere(ctx, particle.x, particle.y, particle.size, particle.opacity);
            break;
          case 'leaf':
            drawLeaf(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
          case 'hat':
            drawHat(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
          case 'star':
            drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
            break;
        }
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}