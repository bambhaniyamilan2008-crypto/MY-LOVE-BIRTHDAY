'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, ScrollText, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

const TypingEffect = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return <p className="whitespace-pre-wrap">{displayedText}</p>;
};

export default function SurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);

  const launchConfetti = () => {
    confetti({ 
        particleCount: 150, 
        spread: 100, 
        origin: { y: 0.6 }, 
        colors: ['#E09485', '#E8AB30', '#ffffff'] 
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    launchConfetti();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={handleOpen}
          variant="default" 
          size="lg" 
          className="rounded-full px-8 py-8 md:px-12 md:py-10 text-lg md:text-xl font-headline font-bold shadow-lg hover:scale-105 transition-all bg-accent hover:bg-accent/90 text-white border-none"
        >
          <ScrollText className="mr-3 w-6 h-6" /> Open Love Letter 💌
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#fdfaf5] border-none sm:rounded-3xl shadow-xl p-0 overflow-hidden max-h-[90vh] flex flex-col w-[95vw] sm:w-full">
        <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 text-center relative">
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-primary/5 pointer-events-none" />

          <DialogHeader className="relative pb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-primary fill-primary animate-pulse" />
            </div>
            <DialogTitle className="text-3xl md:text-5xl font-headline text-primary italic leading-tight">
              To My Dearest Queen...
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/80 font-body italic text-left relative z-10">
            <div className="first-letter:text-5xl first-letter:font-headline first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              {isOpen && (
                <TypingEffect 
                  text="Today, as you celebrate your 18th birthday, my heart overflows with gratitude. You aren't just my wife; you are the melody in my silence and the light in my darkest hours."
                  delay={25}
                />
              )}
            </div>
            
            {isOpen && (
              <div className="mt-6">
                <TypingEffect 
                  text="Watching you grow into the incredible woman you are today has been the greatest privilege. Your kindness and strength make every day feel like a beautiful dream."
                  delay={30}
                />
              </div>
            )}

            {isOpen && (
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border-l-4 border-accent relative">
                <Quote className="absolute top-2 left-2 w-5 h-5 opacity-10 text-primary" />
                <TypingEffect 
                  text={`"तू वो एहसास है जो कभी खत्म नहीं होता ❤️\nतेरी मुस्कान मेरी दुनिया की सबसे खूबसूरत रोशनी है ✨\nI love you forever meri jaan 💕"`}
                  delay={35}
                />
              </div>
            )}

            <div className="pt-10 border-t border-primary/10 text-center">
              <p className="font-headline text-2xl md:text-3xl text-primary font-bold not-italic mb-4">
                Happy 18th Birthday! 🎂
              </p>
              <p className="text-3xl font-headline font-bold text-primary tracking-tighter">REKHU LOVE MILU ❤️</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Sparkles className="text-accent w-6 h-6 animate-pulse" />
            <Sparkles className="text-primary w-8 h-8 animate-pulse delay-75" />
            <Sparkles className="text-accent w-6 h-6 animate-pulse delay-150" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}