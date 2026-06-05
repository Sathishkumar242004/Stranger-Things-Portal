import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  mode: 'RealWorld' | 'UpsideDown';
}

export default function ParticleCanvas({ mode }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Spore {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      sinOffset: number;
      sinSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = mode === 'UpsideDown' ? Math.random() * -50 : Math.random() * height;
        this.size = Math.random() * 3.5 + 0.5;
        
        if (mode === 'UpsideDown') {
          // Floating down slowly like decay/ash
          this.speedY = Math.random() * 0.8 + 0.3;
          this.speedX = (Math.random() - 0.5) * 0.5;
        } else {
          // Floating up slowly like clean embers/neon dust
          this.speedY = -(Math.random() * 0.5 + 0.2);
          this.speedX = (Math.random() - 0.5) * 0.3;
        }

        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.sinOffset = Math.random() * Math.PI * 2;
        this.sinSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y += this.speedY;
        this.sinOffset += this.sinSpeed;
        this.x += this.speedX + Math.sin(this.sinOffset) * 0.3;

        // Fade in/out cycle
        if (mode === 'UpsideDown') {
          if (this.y > height) {
            this.y = -10;
            this.x = Math.random() * width;
            this.opacity = Math.random() * 0.5 + 0.1;
          }
        } else {
          if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
            this.opacity = Math.random() * 0.5 + 0.1;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (mode === 'UpsideDown') {
          // Glowing red ash/spores
          context.fillStyle = `rgba(239, 68, 68, ${this.opacity})`;
          context.shadowBlur = this.size * 2;
          context.shadowColor = 'rgba(239, 68, 68, 0.8)';
        } else {
          // Soft cyan/indigo dust
          context.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
          context.shadowBlur = this.size * 1.5;
          context.shadowColor = 'rgba(59, 130, 246, 0.4)';
        }
        context.fill();
        context.shadowBlur = 0; // reset
      }
    }

    const particles: Spore[] = [];
    const maxParticles = mode === 'UpsideDown' ? 120 : 60;
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Spore());
    }

    // Spooky red lightning forks in Upside Down mode
    let lightningTimer = 0;
    let lightningDuration = 0;
    let lightningAlpha = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw lightning ambient flash in UpsideDown mode
      if (mode === 'UpsideDown') {
        lightningTimer++;
        if (lightningTimer > 300 && Math.random() < 0.015) {
          lightningTimer = 0;
          lightningDuration = Math.floor(Math.random() * 12) + 4;
        }

        if (lightningTimer < lightningDuration) {
          // Flicker intense red glow
          lightningAlpha = Math.random() * 0.18;
          ctx.fillStyle = `rgba(220, 38, 38, ${lightningAlpha})`;
          ctx.fillRect(0, 0, width, height);

          // Eerie red horizontal scanline glow during flash
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let y = 0; y < height; y += 40) {
            ctx.moveTo(0, y + Math.random() * 20);
            ctx.lineTo(width, y + Math.random() * 20);
          }
          ctx.stroke();
        }
      } else {
        // Draw elegant grid lines sweeping down in Real World mode
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.1)';
        ctx.lineWidth = 1;
        // Horizontal scan lines mapping
        for (let y = 0; y < height; y += 80) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 2. Draw and update spores/particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      id="cinematic-canvas"
      className="fixed inset-0 pointer-events-none z-10 transition-colors duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
