
'use client';

import { useState, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Autoplay blocked'));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Fallback romantic instrumental
      />
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="icon"
        className="rounded-full w-12 h-12 bg-white shadow-xl hover:bg-primary/10 transition-all border-primary/20"
      >
        {isPlaying ? (
          <Music2 className="text-primary animate-pulse" />
        ) : (
          <Music className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
