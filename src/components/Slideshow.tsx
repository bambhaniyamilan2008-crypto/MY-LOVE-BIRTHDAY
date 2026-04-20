
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlideshowProps {
  images: string[];
}

export default function Slideshow({ images }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white group">
      {/* Floating Soft Hearts Overlay */}
      {mounted && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <i className="fas fa-heart floating-heart" style={{ left: '15%', animation: 'floatUp 8s linear infinite', fontSize: '30px', bottom: '0' }}></i>
          <i className="fas fa-heart floating-heart" style={{ left: '85%', animation: 'floatUp 12s linear infinite', fontSize: '45px', bottom: '0' }}></i>
          <i className="fas fa-heart floating-heart" style={{ left: '50%', animation: 'floatUp 10s linear infinite', fontSize: '20px', animationDelay: '2s', bottom: '0' }}></i>
          <i className="fas fa-heart floating-heart" style={{ left: '30%', animation: 'floatUp 14s linear infinite', fontSize: '35px', animationDelay: '4s', bottom: '0' }}></i>
        </div>
      )}

      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={img}
            alt={`Slideshow image ${index + 1}`}
            fill
            className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
