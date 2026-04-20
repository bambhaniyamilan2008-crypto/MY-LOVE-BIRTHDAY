'use client';

import React, { useEffect, useRef } from 'react';

/**
 * @fileOverview A subtle and refined romantic cursor trail effect using HTML5 Canvas.
 * Emits tiny, soft pink and white heart particles that drift upwards and fade.
 */

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Refined romantic color palette (soft pinks and whites)
    const colors = ['#fff5f5', '#ffe3e3', '#ffc9c9', '#ffffff'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Extremely small base size
        this.size = Math.random() * 5 + 3;
        // Very slight horizontal drift
        this.speedX = (Math.random() - 0.5) * 0.6;
        // Gentle upward drift
        this.speedY = -Math.random() * 1.0 - 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.7; // Softer start opacity
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Gradually shrink and fade
        if (this.size > 0.05) this.size -= 0.04;
        this.opacity -= 0.008;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        
        // Drawing heart using Bezier curves
        // Scaling factor based on size
        const s = this.size / 20;
        ctx.scale(s, s);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.opacity);
        
        // Simple Heart Shape path
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -3, -5, -15, -20, -15);
        ctx.bezierCurveTo(-35, -15, -35, 3.5, -35, 3.5);
        ctx.bezierCurveTo(-35, 20, -15, 40, 0, 50);
        ctx.bezierCurveTo(15, 40, 35, 20, 35, 3.5);
        ctx.bezierCurveTo(35, 3.5, 35, -15, 20, -15);
        ctx.bezierCurveTo(10, -15, 0, -3, 0, 0);
        
        ctx.fill();
        ctx.restore();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const addParticles = (e: MouseEvent | TouchEvent) => {
      let x, y;
      if ('touches' in e) {
        if (e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else return;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // Add 3-4 tiny particles per movement event for a refined, low-density trail
      if (x !== undefined && y !== undefined) {
        const count = Math.floor(Math.random() * 2) + 3; // 3 or 4
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(x, y));
        }
      }
    };

    // Events for mouse and touch
    window.addEventListener('mousemove', addParticles);
    window.addEventListener('touchmove', addParticles, { passive: true });
    window.addEventListener('mousedown', addParticles);
    window.addEventListener('touchstart', addParticles, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Remove invisible or tiny particles
        if (particles[i].opacity <= 0 || particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', addParticles);
      window.removeEventListener('touchmove', addParticles);
      window.removeEventListener('mousedown', addParticles);
      window.removeEventListener('touchstart', addParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
