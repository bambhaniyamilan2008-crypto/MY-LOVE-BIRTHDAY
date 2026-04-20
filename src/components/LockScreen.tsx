'use client';

import { useState, useEffect } from 'react';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [hearts, setHearts] = useState<{ top: string; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const generatedHearts = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${20 + Math.random() * 40}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(generatedHearts);
  }, []);

  const handleUnlock = () => {
    if (password.toUpperCase() === 'REKHUMILU2008') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#FDFBF9] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
         {hearts.map((heart, i) => (
           <Heart 
            key={i}
            className="absolute text-primary fill-primary/10 animate-bounce-slow"
            style={{
              top: heart.top,
              left: heart.left,
              fontSize: heart.size,
              animationDelay: heart.delay,
            } as any}
           />
         ))}
      </div>

      <div className="glass-card max-w-md w-full p-8 md:p-12 text-center rounded-[3rem] shadow-2xl relative z-10 border-none bg-white/80 backdrop-blur-xl">
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <Heart className="w-24 h-24 text-primary fill-primary animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full backdrop-blur-md">
              <Lock className="w-8 h-8 text-white drop-shadow-md" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
          Happy Birthday My Love ❤️
        </h1>
        <p className="text-muted-foreground mb-10 font-body italic text-base leading-relaxed">
          Enter our special secret code to reveal your birthday surprise...
        </p>

        <div className="space-y-6">
          <div className="relative">
            <Input 
              type="password"
              placeholder="Enter Secret Code..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`text-center h-16 rounded-full border-primary/20 focus:ring-primary text-xl font-headline tracking-widest ${error ? 'border-destructive animate-shake shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'shadow-inner'}`}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>
          
          {error && (
            <p className="text-destructive text-sm font-bold animate-in fade-in slide-in-from-top-1 text-center">
              Incorrect Code, My Love! Try Again ❤️
            </p>
          )}
          
          <Button 
            onClick={handleUnlock}
            className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white text-xl font-headline font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95 border-none group"
          >
            Unlock My Heart 🔓
          </Button>
        </div>

        <div className="mt-12 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground opacity-40">
            For: My Beautiful Rekhu
          </p>
          <div className="flex justify-center gap-4 opacity-30">
            <Heart size={12} className="text-primary" />
            <Heart size={12} className="text-accent" />
            <Heart size={12} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
