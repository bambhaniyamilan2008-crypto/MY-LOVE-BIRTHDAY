'use client';

import React, { useEffect, useState } from 'react';

type Particle = {
  id: number;
  type: 'balloon' | 'heart' | 'sparkle' | 'confetti';
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  angle?: number;
};

interface CelebrationOverlayProps {
  trigger: boolean;
  originX?: number;
  originY?: number;
}

export default function CelebrationOverlay({ trigger, originX = 50, originY = 50 }: CelebrationOverlayProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      const newParticles: Particle[] = [];
      const colors = ['#E09485', '#E8AB30', '#FF6B6B', '#FFD93D', '#FFFFFF'];
      
      // Balloons from bottom (fewer for performance)
      for (let i = 0; i < 10; i++) {
        newParticles.push({
          id: Math.random(),
          type: 'balloon',
          x: Math.random() * 100,
          y: 110,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 30 + Math.random() * 30,
          delay: Math.random() * 0.5,
        });
      }

      // Hearts burst
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        newParticles.push({
          id: Math.random(),
          type: 'heart',
          x: originX,
          y: originY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 12 + Math.random() * 15,
          delay: Math.random() * 0.2,
          angle: angle,
        });
      }

      // Confetti burst (optimized count)
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: Math.random(),
          type: 'confetti',
          x: 50,
          y: 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 8,
          delay: Math.random() * 0.4,
        });
      }

      setParticles(newParticles);
      
      // Chime sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});

      const timer = setTimeout(() => {
        setActive(false);
        setParticles([]);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [trigger, originX, originY]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] animate-fade-in transition-all duration-700" />
      
      {particles.map((p) => {
        if (p.type === 'balloon') {
          return (
            <div
              key={p.id}
              className="absolute animate-balloon opacity-0"
              style={{
                left: `${p.x}%`,
                bottom: '-10%',
                fontSize: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                color: p.color,
              }}
            >
              🎈
            </div>
          );
        }
        if (p.type === 'heart') {
          const tx = Math.cos(p.angle!) * 250;
          const ty = Math.sin(p.angle!) * 250 - 300; 
          return (
            <div
              key={p.id}
              className="absolute animate-heart-burst opacity-0"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                color: p.color,
                '--tw-translate-x': `${tx}px`,
                '--tw-translate-y': `${ty}px`,
                '--tw-rotate': `${Math.random() * 360}deg`,
              } as any}
            >
              ❤️
            </div>
          );
        }
        if (p.type === 'confetti') {
          return (
            <div
              key={p.id}
              className="absolute animate-float-up opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-5%',
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${p.delay}s`,
              }}
            />
          );
        }
        return null;
      })}

      {/* Sparkles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle text-accent opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 15}px`,
            animationDelay: `${Math.random() * 1.5}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}
