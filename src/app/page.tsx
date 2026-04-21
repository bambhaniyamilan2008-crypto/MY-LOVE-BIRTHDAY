'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Heart, Star, Gift, Cake, Sparkles, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import BirthdayCountdown from '@/components/BirthdayCountdown';
import JourneyTimeline from '@/components/JourneyTimeline';
import SurpriseModal from '@/components/SurpriseModal';
import CursorTrail from '@/components/CursorTrail';
import Slideshow from '@/components/Slideshow';
import LockScreen from '@/components/LockScreen';
import confetti from 'canvas-confetti';

export default function BirthdayPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [targetDate, setTargetDate] = useState<string>('');
  const [heroTypedText, setHeroTypedText] = useState('');
  const [backgroundHearts, setBackgroundHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string; color: string }[]>([]);
  
  const heroFullQuote = `In your light, I learn how to love. In your beauty, how to make poems. You dance inside my chest where no one sees you.`;

  useEffect(() => {
    if (isLocked) return;

    const bday = new Date(2026, 2, 21);
    setTargetDate(bday.toISOString());

    // Generate background floating hearts
    const hearts = [...Array(25)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: `${15 + Math.random() * 30}px`,
      color: ['#E09485', '#E8AB30', '#FF6B6B', '#FDFBF9'][Math.floor(Math.random() * 4)]
    }));
    setBackgroundHearts(hearts);

    // Intersection Observer for reveal effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Hero Typewriter with smoother interval
    let i = 0;
    let timeoutId: NodeJS.Timeout;
    const typeWriter = () => {
      if (i <= heroFullQuote.length) {
        setHeroTypedText(heroFullQuote.slice(0, i));
        i++;
        timeoutId = setTimeout(typeWriter, 40);
      } else {
        timeoutId = setTimeout(() => {
          setHeroTypedText('');
          i = 0;
          typeWriter();
        }, 6000);
      }
    };
    typeWriter();

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [heroFullQuote, isLocked]);

  const triggerCelebration = () => {
    if (typeof confetti === 'function') {
      confetti({ 
          particleCount: 150, 
          spread: 80, 
          origin: { y: 0.6 }, 
          colors: ['#E09485', '#E8AB30', '#e07c7c', '#ffffff'] 
      });
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    // Smooth instant celebration upon unlock
    setTimeout(() => {
      triggerCelebration();
    }, 100);
  };

  const handleHeroSurprise = () => {
    triggerCelebration();
    document.getElementById('about-her')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  const heroImage = PlaceHolderImages.find(i => i.id === 'hero-couple')?.imageUrl;
  const wifePortrait = PlaceHolderImages.find(i => i.id === 'wife-portrait')?.imageUrl;
  
  const slideshowImages = PlaceHolderImages
    .filter(img => img.id.startsWith('gallery-'))
    .map(img => img.imageUrl);

  const galleryQuotes = [
    "तुम साथ हो तो हर ख्वाब पूरा लगता है।",
    "तेरे साथ बिताया हर पल खास है।",
    "तू मिले तो हर ख्वाब पूरा लगता है।",
    "तू साथ हो तो जिंदगी जन्नत लगती है।",
    "तू मेरी दुनिया, तू मेरा प्यार hai।",
    "तू ही मेरी हर खुशी की निशानी hai।"
  ];

  return (
    <div className="relative min-h-screen selection:bg-primary/20 bg-background font-body overflow-x-hidden">
      <CursorTrail />

      {/* Atmospheric Bokeh Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bokeh w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 top-[-5%] left-[-5%]" />
        <div className="bokeh w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/10 bottom-[-5%] right-[-5%]" />
      </div>

      {/* Background Hearts Animation Layer */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
        {backgroundHearts.map((heart) => (
          <i 
            key={heart.id}
            className="fas fa-heart background-heart"
            style={{
              left: heart.left,
              fontSize: heart.size,
              color: heart.color,
              opacity: 0.3,
              '--delay': heart.delay,
              '--duration': heart.duration,
            } as any}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <Image
              src={heroImage}
              alt="Hero Romantic"
              fill
              className="object-cover brightness-[0.4] scale-105 animate-slow-zoom"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
        </div>

        <div className="relative z-10 text-center text-white px-6 py-20 flex flex-col items-center max-w-4xl mx-auto w-full">
          <div className="mb-6 animate-bounce-slow">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-primary fill-primary drop-shadow-[0_0_15px_rgba(224,148,133,0.8)]" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-headline font-bold mb-4 drop-shadow-2xl tracking-tight leading-tight">
            Happy Birthday My Love Rekhu ❤️
          </h1>
          <p className="text-sm md:text-lg font-body mb-8 drop-shadow-lg opacity-90 uppercase tracking-[0.2em] md:tracking-[0.3em]">
            A Celebration of You
          </p>
          <div className="mb-10 min-h-[100px] relative px-4 md:px-12 w-full flex items-center justify-center">
            <span className="italic opacity-95 block text-lg md:text-xl font-headline leading-relaxed text-center">
              {heroTypedText}
            </span>
          </div>
          <Button 
            onClick={handleHeroSurprise}
            size="lg" 
            className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-7 md:px-12 md:py-10 text-lg md:text-xl font-headline shadow-xl transition-all hover:scale-105 active:scale-95 border-none"
          >
            Open Surprise 🎁
          </Button>
        </div>
      </section>

      {/* About Her Section */}
      <section id="about-her" className="py-20 md:py-32 bg-transparent relative overflow-hidden z-10">
        <div className="container mx-auto px-6 reveal-on-scroll">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-5/12 relative">
              <div className="relative w-full aspect-[3/4.5] max-w-lg mx-auto transform hover:rotate-0 transition-transform duration-700 lg:-rotate-3">
                <Slideshow images={[wifePortrait || '', ...slideshowImages]} />
              </div>
            </div>
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-headline text-primary mb-6 whitespace-nowrap overflow-hidden text-ellipsis">My Queen 👑</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 font-body max-w-xl mx-auto lg:mx-0">
                Today we celebrate the most incredible person I know. Born on March 21, 2008, you've brought magic to this world. You are the grace in my step and the joy in my heart.
              </p>
              <div className="p-4 md:p-8 glass-card rounded-2xl md:rounded-[3rem] mb-8 transform transition-all hover:shadow-xl">
                <p className="text-lg md:text-2xl font-headline text-accent italic font-medium leading-relaxed">
                  "You are my happiness, my world, my everything ❤️"
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['#MyLove', '#BestWifeEver', '#BirthdayQueen'].map(tag => (
                  <span key={tag} className="bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-widest border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Section */}
      <section className="py-20 md:py-32 bg-transparent relative overflow-hidden z-10">
        <div className="container mx-auto px-6 text-center reveal-on-scroll">
          <h2 className="text-3xl md:text-5xl font-headline text-primary mb-6">
            18 YEARS COMPLETE
          </h2>
          <p className="text-muted-foreground mb-12 font-body italic text-base md:text-lg max-w-xl mx-auto opacity-70">
             Eighteen years of beautiful existence, each moment a precious gift.
          </p>
          {targetDate && <BirthdayCountdown targetDate={targetDate} />}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 md:py-32 bg-transparent relative overflow-hidden z-10">
        <div className="container mx-auto px-6 reveal-on-scroll relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">Our Journey Together</h2>
            <div className="w-20 h-1 bg-accent/40 mx-auto rounded-full" />
          </div>
          <JourneyTimeline />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 md:py-32 bg-white/30 backdrop-blur-[2px] z-10 relative">
        <div className="container mx-auto px-6 reveal-on-scroll">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline text-primary mb-4">Captured Memories</h2>
            <p className="text-muted-foreground font-body text-base md:text-lg italic opacity-70">The moments that define our love</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {galleryQuotes.slice(0, 6).map((quote, idx) => {
              const i = idx + 1;
              const galleryImg = PlaceHolderImages.find(img => img.id === `gallery-${i}`)?.imageUrl;
              return (
                <div key={i} className="flex flex-col items-center group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-500 mb-6">
                    {galleryImg && (
                      <Image
                        src={galleryImg}
                        alt={`Memory ${i}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="glass-card px-6 py-4 rounded-xl text-center w-full max-w-[280px]">
                    <p className="italic font-body text-foreground/80 text-sm md:text-base">
                      {quote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 md:py-32 bg-transparent relative overflow-hidden z-10">
        <div className="container mx-auto px-6 reveal-on-scroll">
          <div className="letter-paper max-w-4xl p-6 md:p-16 rounded-2xl md:rounded-[4rem] mx-auto shadow-sm">
            <div className="flex justify-center mb-8">
              <Gift className="w-10 h-10 md:w-14 md:h-14 text-accent" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-headline text-primary mb-12 text-center">A Special Gift for You 💝</h2>
            
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-4 mb-12">
              <div className="text-base md:text-lg text-foreground/90 space-y-8 font-body leading-relaxed">
                <p className="italic text-center text-xl text-primary/70 font-medium">
                  "This is more than just a letter; it is a piece of my heart dedicated to the one who owns it entirely."
                </p>
                <div className="space-y-6 pt-4 text-lg">
                  <p className="font-headline font-bold text-primary text-2xl">mari priy rekhu,😊</p>
                  <p>Aaje my cute and lovely rekhu no birthday see. aaje ae divas se je divase mari life aa world ma aavi hati. aetle pela to Happy Birthday my Rekhu bachha.</p>
                  <p>Rekhu tame bovvvvvvvvvvvvvv hajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj sara so mara jivv ne tame mane bovvv hajjjjjjjj gamo so my diku,💝</p>
                  <p>Rekhu hu aapdi sagai thai tya thi aaj sudhi ni aapdi aakhi love sory kav hoo my bachha, oyeee rekhu aapdi to aakhi love story j kai ghate nai aevi se aela aapde to bey ae aek bija ne joya vagar j pasand kari lidha hata my bachha,</p>
                  <p>and sagai pela ni vat nathi karvi hoo baki pasa tame mane j khijaso ne mara thi kai nay bolay kem ke aema maro j vak nikalse kaa pagal mari, oyee bachha sorry ho tyare na aavto pan nano hato ne aema aela tamaro baby hato bachha baby thi to bhul thay j ke maf kari deso ne my bachha mane...😚 khabar se ho ke tame maf kari j deso samji vandri mari,🤭</p>
                  <p>Oyeee tu hu aadi vat kare he na padi ke sagai pela ni nay to pan magaj j nathi mari ne to ho hav gheli see aela pagal,🤫</p>
                  <p>chalo aab start karte hai hamari kahani our uska name he rekhu milu love story, 9 nov 2021 ae divas jyare aapde peli var malya hata rekhu and diku tyare to mane kai khabar pan na padti ke keva kapda perva joye ne su karvu joye ne kai nay jaan jii pasi aame badha tya sagai karva aavya pasi badha utarta hata pan aela tya badha ne aem thatu hase ke sagai karva aavi to gaya pan chokro kya see badha mane gotta hase aela ne koi khabar pan nay hoi ke sagai karva valo chokro aa hase aela pasi andar aavya ne aapde bey sathe bethya tyare diku me tamne peli var joya hata my bachha 😊</p>
                  <p>and diku tyare me tamaro hath pan touch karyo ne aapda sweets pan aek bija ne khavdavi jaan maja aavi hoo rekhu jii mara pasi diku andar photo padva gaya tya pan bov maja aavi hoo jaan jiii pasi diku, pasi rekhu sorry ho hu ghare na aavto hu nano hato ti mane kem saram lagti hoi aem lagtu rekhu aetle hu na aavto rekhu maf kari deso ne aela, sani mani kari deje hoo baki dhibi nakhi samji mari sweet rekhu jii.🤭</p>
                  <p>Have to diku aavu su ne bachha ne diku aapde ketli masti pan karye see ti maja aave ne my bacha, pasi bey malye tyare diku kitli masti majak ne love ne jaan bey respect pan bov j karye ne bachha jii mara, oyee rekhu hu jyare aavu tyare tame mane hu maro hee gal ma lage hoo vandri kai dav su hoo bhale birthday hoi ti su marva nu hee vandri jaa ni gheli dobi kagdi mari pagal magaj vagar ni mari,🤭</p>
                  <p>Oyee rekhu tame se ne jaan mara mate bovvvvvvvvvvv haj lucky ne best ma best life partner so ho jaan jiii tame rekhu mane badhi rite samjo so jaan hu naraj su ke nay mood off se ke nay hu masti ma su ke nay mane kai thayu se ke nay ae badhu j tamne khabar padi jai hoi jaan and diku hu tamane life time mate hasvi ne rakhi ne rekhu hamesa happy j rakhi hoi ne rekhu tamara badha j dream hu pura kari my bachha samji rekhu ne tamne rekhu puri respect aapi ho jaan and dika tamne kyarei kharab words nay kav ho life ma kayrei nay mara jivv okk rekhu jii mara,</p>
                  <p>oyeee rekhu to ae vat upar halo rekhu exam deva jaye jaan maja aavse hoi aena mate aapde preparetion karvu padse hoi samjii karvine preparation pasi jaye aapde hoi exam holl ma exam deva hasta nay hoi aela pagal mara,🤭</p>
                  <p>Rekhu tame bolo ne ae mane bov j game ne tame jaan miluuu kav ne aetle rekhu hav pani pani thay jav ne badhu j mani jav ho rekhu jii mara,🫠</p>
                  <p>ne rekhu mane tamari sathe bov maja aave rekhu aapde dhire dhire ketla year sathe spent karya hatu rekhu life time sudhi sathe j reva nu see ho haju to aapde sathe mali ne diku mast aapda 2 2 baby karna see hoi maja aavse hoi rekhu jii mara.😊</p>
                  <p>Rekhu jyare hu tamari najik aavu ne jaan to mara heart beat vadhva lage jaan jii ne diku pase hov to see mast feel thay ne diku man to bey ne ghanu thai baju karva nu pan aela haju nana see hoi aapde bey kai kharab vicharta pan nay hoi samji vandri ultu j vichare ti haju bey se ne nane se hoi samji gheli mari,🤭</p>
                  <p>oyeee rekhuuuuu halo ni diku ghadikkkkk bachhaa maja aavse jaan jii,😚</p>
                  <p>Oyeee rekhu badha ni mate bhale aek javabdari uthava valo ne knowledge valo hov pan tamara mate to se ne huu aek nano baby j su hoi samji mari gheli pagal dobi vandri oyeee rekhu hu baby su tamari same to hu nakhra pan kari ne badhu j kari hoi ne milk pivdavvu padse hoi tamaru mast mast helthy itli tarif kari to piva j deso visvas se mara par ho mane ,🤫</p>
                  <p>nay nay tamara par to pure puro see hoi my bachha, diku hu merrige pasi diku badhe j sathe rei ne ae pela pan hoi rekhu ne tamara badha j dream pan pura karsu ne sathe masti pan karsu ne badhe j jasu pan sathe hoi oyeee bahar to aapde bey ne smajadar husbend wife hoi aem reva nu see hoi pasi ghare bhale bey pagal ni jem nana baby bani ne reta hoi hoi samji tamara mate to hu ghodo bni ne pasi tame mara par bethjo hoi rekhu pasi hu aakha ghar ma tamne faravi my bacha ne okk ne diku jii mara.😘</p>
                  <p>Oyee have samajdar se to ae vat upar chalo chlate hai aapne adde jate hai maja aayenga my bachha,💕</p>
                  <p className="text-2xl font-headline font-bold text-primary pt-8 italic">
                    I REALLY RELLY REALLY LOVE YOUUUUUUUUUUU SOOOOOO MUCHHHHHHHHHHHHHHHH MY REKHU DIKUU 😘💝
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <SurpriseModal />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-transparent border-t border-primary/5 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-8 mb-8">
             <Heart className="text-primary fill-primary w-6 h-6 opacity-30" />
             <Cake className="text-accent fill-accent w-6 h-6 opacity-30" />
             <Star className="text-primary fill-primary w-6 h-6 opacity-30" />
          </div>
          <div className="space-y-2">
            <p className="text-primary font-headline text-xl md:text-2xl font-bold tracking-widest">REKHU LOVE MILU</p>
            <p className="text-muted-foreground font-body text-[10px] md:text-xs opacity-60 uppercase tracking-[0.3em]">Made with love for my best half • {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
