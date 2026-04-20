'use client';

import { useState, useEffect } from 'react';

export default function BirthdayCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="flex gap-3 md:gap-6 justify-center animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-primary/5" />
        ))}
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center bg-white border border-primary/10 rounded-2xl md:rounded-[2rem] shadow-sm mb-2 transform transition-all">
        <span className="text-2xl sm:text-3xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12 max-w-4xl mx-auto px-2">
      <div className="flex gap-3 sm:gap-4 md:gap-8 justify-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
      
      <div className="text-center py-6 px-8 bg-primary/5 rounded-2xl border border-primary/10 w-full max-w-sm">
        <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">
          Born: March 21, 2008
        </div>
        <p className="text-muted-foreground font-body text-sm italic opacity-80">
          "Counting every heartbeat until your big day."
        </p>
      </div>
    </div>
  );
}