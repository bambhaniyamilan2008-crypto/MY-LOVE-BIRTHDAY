
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';

const journeyEvents = [
  {
    title: 'My Love Born ✨',
    description: 'The world became a brighter place on March 21, 2008. The start of an incredible journey.',
    date: 'March 21, 2008',
    image: PlaceHolderImages.find(i => i.id === 'wife-portrait')?.imageUrl,
  },
  {
    title: 'First Meeting ❤️',
    description: 'The day my life changed forever. I still remember what you were wearing.',
    date: 'November 9, 2021',
    image: PlaceHolderImages.find(i => i.id === 'journey-1')?.imageUrl,
  },
  {
    title: 'First Trip 🌍',
    description: 'Exploring the world together. Our hearts grew closer with every mile.',
    date: 'December 22, 2019',
    image: PlaceHolderImages.find(i => i.id === 'journey-2')?.imageUrl,
  },
  {
    title: 'Best Memories 💑',
    description: 'Building our home and our future. Every moment with you is a treasure.',
    date: 'July 10, 2021',
    image: PlaceHolderImages.find(i => i.id === 'journey-3')?.imageUrl,
  },
  {
    title: 'Today (18th Birthday 🎂)',
    description: 'Celebrating 18 years of your beautiful existence. Happy Birthday, My Queen!',
    date: 'March 21, 2026',
    image: PlaceHolderImages.find(i => i.id === 'wife-portrait')?.imageUrl,
  },
];

export default function JourneyTimeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative py-8 px-2 max-w-5xl mx-auto">
      {/* Vertical Connecting Line - Responsive position */}
      <div 
        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 transform md:-translate-x-1/2 z-0"
        aria-hidden="true"
      />

      {journeyEvents.map((event, index) => {
        const isRightSide = index % 2 === 1; 
        return (
          <div 
            key={index} 
            className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center w-full ${
              isRightSide ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Connector Dot - Responsive position */}
            <div className="absolute left-[20px] md:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white transform -translate-x-1/2 z-10 shadow-md" />

            {/* Content Container - Responsive padding and alignment */}
            <div className={`w-full md:w-[48%] pl-10 md:pl-0 ${
              isRightSide ? 'md:pl-16' : 'md:pr-16'
            }`}>
              <Card className="hover:shadow-xl transition-all duration-500 border-none bg-white/90 backdrop-blur-md overflow-hidden rounded-[2rem] group">
                <div className="relative h-80 sm:h-96 md:h-[450px] w-full bg-muted overflow-hidden">
                  {/* Floating Soft Hearts Overlay for Each Image */}
                  {mounted && (
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                      <i className="fas fa-heart floating-heart" style={{ left: '15%', animation: 'floatUp 8s linear infinite', fontSize: '30px', bottom: '0' }}></i>
                      <i className="fas fa-heart floating-heart" style={{ left: '85%', animation: 'floatUp 12s linear infinite', fontSize: '45px', bottom: '0' }}></i>
                      <i className="fas fa-heart floating-heart" style={{ left: '50%', animation: 'floatUp 10s linear infinite', fontSize: '20px', animationDelay: '2s', bottom: '0' }}></i>
                      <i className="fas fa-heart floating-heart" style={{ left: '30%', animation: 'floatUp 14s linear infinite', fontSize: '35px', animationDelay: '4s', bottom: '0' }}></i>
                    </div>
                  )}

                  {event.image && (
                    <Image 
                      src={event.image} 
                      alt={event.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-8">
                  <div className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-3">{event.date}</div>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-3">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body italic opacity-80">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Spacer for desktop zigzag */}
            <div className="hidden md:block md:w-[48%]" />
          </div>
        );
      })}
    </div>
  );
}
