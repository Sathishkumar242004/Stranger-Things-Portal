import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ShieldAlert, ArrowRight, Skull, Sparkles, Shield, User, Heart, Star, Swords, Zap, Activity } from 'lucide-react';

import imgRealWorld from '../assets/images/hawkins_portal_hero_1780309477532.png';
import imgUpsideDown from '../assets/images/upside_down_world_1780309501274.png';
import SafeCinematicImage from './SafeCinematicImage';

interface HomeSectionProps {
  mode: 'RealWorld' | 'UpsideDown';
  onOpenTrailer: () => void;
  onNavigate: (tab: string) => void;
  setSelectedCharId: (id: string) => void;
}

const MEMORABLE_QUOTES = [
  { text: "FRIENDS DON'T LIE.", author: "Eleven" },
  { text: "MORNINGS ARE FOR COFFEE AND CONTEMPLATION.", author: "Jim Hopper" },
  { text: "SHE'S OUR FRIEND AND SHE'S CRAZY!", author: "Dustin Henderson" },
  { text: "HE LIKES IT COLD.", author: "Will Byers" },
  { text: "YOUR TIME HAS COME.", author: "Vecna" },
  { text: "ALWAYS THE GODDAMN BABYSITTER.", author: "Steve Harrington" },
];

const RAW_SPOTLIGHT_CHARACTERS = [
  {
    id: 'mike',
    name: 'Mike Wheeler',
    role: 'Group Leader / Paladin',
    trait: 'Brave and determined',
    image: '/images/characters/mike.jpg',
    description: 'The steadfast heart of the group. Mike leads his friends with unyielding loyalty, serving as the strategic coordinator through every dimensional threat.',
    code: 'UNIT_001_PALADIN',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  },
  {
    id: 'eleven',
    name: 'Eleven',
    role: 'Psychic Prodigy / Sentinel',
    trait: 'Powerful psychic abilities, mysterious past',
    image: '/images/characters/eleven.jpg',
    description: 'A miraculous telekinetic escapee from Hawkins National Laboratory. Standout defender standing as the absolute vanguard against the dark forces of the Void.',
    code: 'LAB_011_TELEKINETIC',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  },
  {
    id: 'dustin',
    name: 'Dustin Henderson',
    role: 'Scientific Compass / Decoder',
    trait: 'Smart and funny, technology expert',
    image: '/images/characters/dustin.jpg',
    description: 'The science-loving analytical brain. Dustin uses radio setups, compass physics, and cryptology to solve the Upside Down\'s most complex puzzles.',
    code: 'UNIT_002_COMPASS',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  },
  {
    id: 'lucas',
    name: 'Lucas Sinclair',
    role: 'Tactical Marksman / Sentinel',
    trait: 'Strategic thinker, loyal friend',
    image: '/images/characters/lucas.jpg',
    description: 'The ultimate level-headed defender. Armed with physical agility and military-like vigilance, Lucas stands guard when threats breach security.',
    code: 'UNIT_003_RANGER',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  },
  {
    id: 'max',
    name: 'Max Mayfield',
    role: 'Fearless Skater / Challenger',
    trait: 'Fearless and independent, skateboard enthusiast',
    image: '/images/characters/max.jpg',
    description: 'A fiery, independent skater whose sheer psychological courage and music-fueled willpower allowed her to escape Vecna\'s deadly shadow boundary.',
    code: 'UNIT_004_MADMAX',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  },
  {
    id: 'steve',
    name: 'Steve Harrington',
    role: 'Protective Vanguard / Babysitter',
    trait: 'Protective older brother figure, fan favorite',
    image: '/images/characters/steve.jpg',
    description: 'From arrogant high school popular crown holder to spiked-bat brandising protector, Steve is the ultimate guardian of the younger children.',
    code: 'UNIT_005_BABYSITTER',
    glowColor: 'hover:border-[#E21D26]/50 hover:shadow-[0_0_30px_rgba(226,29,38,0.4)] hover:bg-red-950/5'
  }
];

const UNSPLASH_FALLBACKS: Record<string, string> = {
  mike: '/images/characters/mike.jpg',
  eleven: '/images/characters/eleven.jpg',
  max: '/images/characters/max.jpg',
  steve: '/images/characters/steve.jpg',
  will: '/images/characters/will.jpg',
  lucas: '/images/characters/lucas.jpg',
  dustin: '/images/characters/dustin.jpg',
  vecna: '/images/characters/vecna.jpg',
  nancy: '/images/characters/nancy.jpg',
  jonathan: '/images/characters/jonathan.jpg',
  robin: '/images/characters/robin.jpg',
  eddie: '/images/characters/eddie.jpg',
  billy: '/images/characters/billy.jpg'
};

const SPOTLIGHT_CHARACTERS = RAW_SPOTLIGHT_CHARACTERS.map(char => {
  const fallbackUnsplash = UNSPLASH_FALLBACKS[char.id] || UNSPLASH_FALLBACKS.eleven;
  return {
    ...char,
    image: char.image,
    fallbackImage: fallbackUnsplash
  };
});

const getCardIcon = (id: string) => {
  switch (id) {
    case 'mike': return <Heart className="w-5 h-5 text-rose-500 fill-rose-500/10" />;
    case 'eleven': return <Zap className="w-5 h-5 text-pink-500 fill-pink-500/10" />;
    case 'dustin': return <Shield className="w-5 h-5 text-sky-400 fill-sky-450/15" />;
    case 'lucas': return <Star className="w-5 h-5 text-amber-500 fill-amber-500/10" />;
    case 'max': return <Sparkles className="w-5 h-5 text-orange-400" />;
    case 'steve': return <Swords className="w-5 h-5 text-indigo-400" />;
    default: return <User className="w-5 h-5 text-white" />;
  }
};

const getObjectPosition = (id: string) => {
  switch (id) {
    case 'eleven': return 'center 28%';
    case 'mike': return 'center 20%';
    case 'max': return 'center 32%';
    case 'steve': return 'center 20%';
    case 'will': return 'center 20%';
    case 'lucas': return 'center 22%';
    case 'dustin': return 'center 32%';
    case 'vecna': return 'center 40%';
    case 'nancy': return 'center 24%';
    case 'jonathan': return 'center 22%';
    case 'robin': return 'center 22%';
    case 'eddie': return 'center 26%';
    case 'billy': return 'center 24%';
    default: return 'center 25%';
  }
};

export default function HomeSection({ mode, onOpenTrailer, onNavigate, setSelectedCharId }: HomeSectionProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const qInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MEMORABLE_QUOTES.length);
    }, 4500);
    return () => clearInterval(qInterval);
  }, []);

  const currentQuote = MEMORABLE_QUOTES[quoteIndex];

  // Map generated background asset paths

  return (
    <div id="home-view-container" className="w-full bg-[#050505] text-[#F5F5F5] select-none">
      <section
        id="home-hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background Cinematic Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {mode === 'RealWorld' ? (
              <motion.div
                key="bg-real"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imgRealWorld})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
              </motion.div>
            ) : (
              <motion.div
                key="bg-spooky"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imgUpsideDown})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/20 to-black/60" />
                {/* Extra red vignette to simulate decay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(15,3,3,0.85)_100%)] mix-blend-multiply" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Hero Container */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-8 select-none">
          
          {/* Cinematic Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className={`flex items-center gap-2 px-3 py-1 rounded bg-zinc-950/80 border text-[10px] sm:text-xs font-mono uppercase tracking-widest ${
              mode === 'UpsideDown'
                ? 'border-red-600/30 text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.2)] animate-pulse'
                : 'border-blue-500/20 text-blue-400'
            }`}>
              {mode === 'UpsideDown' ? (
                <>
                  <Skull className="w-3 h-3 animate-spin text-red-500" />
                  <span>WARNING: DECAYING DIMENSION COEF ACTIVE</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3 h-3 text-blue-400" />
                  <span>HAWKINS ARCHIVAL DATA FEED LOADED</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Title Logo with massive vintage display typography */}
          <div id="hero-title-container" className="space-y-2 relative max-w-4xl mx-auto py-8">
            {/* Accent corner line indicator from design theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#E21D26] shadow-[0_0_12px_#E21D26]" />

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-[44px] sm:text-[76px] md:text-[110px] lg:text-[130px] leading-[0.85] font-serif font-black uppercase tracking-tighter"
            >
              <span
                className="block text-transparent font-outline text-shadow-red transition-all"
                style={{ WebkitTextStroke: '1px #E21D26' }}
              >
                STRANGER
              </span>
              <span
                className={`block relative z-10 ${
                  mode === 'UpsideDown'
                    ? 'text-[#E21D26] drop-shadow-[0_0_15px_rgba(226,29,38,0.7)] animate-flicker text-shadow-red'
                    : 'text-[#F5F5F5]'
                }`}
              >
                THINGS
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] font-bold text-zinc-400 mt-5"
            >
              Hawkins, Indiana • Confidential Files • Est. 1983
            </motion.p>
          </div>

          {/* Dynamic Quote Box with height preservation */}
          <div className="h-16 flex items-center justify-center max-w-2xl mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className={`font-mono text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  mode === 'UpsideDown' ? 'text-red-400/90' : 'text-zinc-300'
                }`}>
                  “{currentQuote.text}”
                </p>
                <span className={`text-[9px] font-mono tracking-widest uppercase opacity-50 block mt-1.5 ${
                  mode === 'UpsideDown' ? 'text-[#E21D26]' : 'text-blue-500'
                }`}>
                  — {currentQuote.author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Editorial Synopsis Block with Vertical Accent Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-2xl mx-auto pt-2 pb-4 text-center md:text-left"
          >
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-white/60 font-medium italic">
              One summer can change everything. A terrifying new threat emerges from the Upside Down, forcing the gang to confront their darkest fears yet.
            </p>
            <div className="hidden md:block h-10 w-[1px] bg-white/20" />
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Directed By</p>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">The Duffer Brothers</p>
            </div>
          </motion.div>

          {/* High Craft CTA VHS Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            id="hero-cta-buttons"
          >
            <button
              onClick={onOpenTrailer}
              id="watch-teaser-hero-btn"
              className={`flex items-center justify-center gap-2.5 px-8 py-3.5 rounded font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto relative overflow-hidden group border cursor-pointer ${
                mode === 'UpsideDown'
                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:bg-red-700 hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]'
                  : 'bg-zinc-100 border-white text-zinc-950 hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]'
              }`}
            >
              <Play className={`w-4 h-4 fill-current ${mode === 'UpsideDown' ? 'text-white' : 'text-zinc-950'}`} />
              <span>Watch Trailers</span>
            </button>

            <button
              onClick={() => onNavigate('Characters')}
              id="explore-characters-hero-btn"
              className={`flex items-center justify-center gap-2.5 px-8 py-3.5 rounded font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 w-full sm:w-auto border bg-black/45 cursor-pointer hover:bg-neutral-900 group ${
                mode === 'UpsideDown'
                  ? 'border-red-600/30 text-red-500 hover:border-red-500 hover:text-red-400'
                  : 'border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100'
              }`}
            >
              <span>Dossier database</span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                mode === 'UpsideDown' ? 'text-red-500' : 'text-zinc-400'
              }`} />
            </button>
          </motion.div>

          {/* Vintage Scanline instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.9 }}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 text-center"
          >
            {mode === 'RealWorld'
              ? 'TIP: TOGGLE THE RIFT SWITCH IN NAVBAR TO ENTER THE UPSIDE DOWN'
              : 'WARNING: TOXIC SPORE LEVELS EXCEED RECOVERY CRITERIA'}
          </motion.div>

          {/* Premium Curated Netflix-style Content Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, type: 'spring' }}
            className="pt-10 max-w-4xl mx-auto text-left"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/55 flex items-center gap-1.5 font-black">
                <span className={`w-1.5 h-1.5 rounded-full ${mode === 'UpsideDown' ? 'bg-[#E21D26] animate-pulse' : 'bg-blue-400'}`}></span>
                TRENDING DOSSIER HOTLIST // S04
              </h3>
              <span className="font-mono text-[9px] text-[#E21D26] uppercase tracking-widest hover:underline cursor-pointer" onClick={() => onNavigate('Characters')}>
                Browse All Dossiers →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Pick 1: Eleven */}
              <div 
                onClick={() => {
                  setSelectedCharId('eleven');
                  onNavigate('Characters');
                }}
                className={`p-4 rounded-lg bg-zinc-950/60 border hover:bg-neutral-950 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-44 ${
                  mode === 'UpsideDown'
                    ? 'border-white/5 hover:border-[#E21D26]/60 hover:shadow-[0_0_15px_rgba(226,29,38,0.15)]'
                    : 'border-white/5 hover:border-blue-500/30'
                }`}
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                  SUB_011
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase bg-[#E21D26]/10 text-red-500 px-2 py-0.5 rounded border border-[#E21D26]/20 font-bold inline-block">
                    TOP INTEL
                  </span>
                  <h4 className="font-serif text-lg text-white font-bold tracking-wide mt-1.5 group-hover:text-[#E21D26] transition-colors">
                    Eleven
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                    Abducted and raised in Hawkins National Lab. Telekinetic prodigy defending Hawkins.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-2 border-t border-white/5">
                  <span>SEAS_01 ORIGIN</span>
                  <span className="group-hover:translate-x-1 transition-transform">EXP_DOSSIER →</span>
                </div>
              </div>

              {/* Pick 2: Will Byers */}
              <div 
                onClick={() => {
                  setSelectedCharId('will');
                  onNavigate('Characters');
                }}
                className={`p-4 rounded-lg bg-zinc-950/60 border hover:bg-neutral-950 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-44 ${
                  mode === 'UpsideDown'
                    ? 'border-white/5 hover:border-[#E21D26]/60 hover:shadow-[0_0_15px_rgba(226,29,38,0.15)]'
                    : 'border-white/5 hover:border-blue-500/30'
                }`}
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
                  SUB_BYERS
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold inline-block">
                    SENSORY_RATED
                  </span>
                  <h4 className="font-serif text-lg text-white font-bold tracking-wide mt-1.5 group-hover:text-[#E21D26] transition-colors">
                    Will Byers
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                    Survived the dark alternate dimension; retains a mental connection to the Mind Flayer.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-2 border-t border-white/5">
                  <span>SEAS_01 ORIGIN</span>
                  <span className="group-hover:translate-x-1 transition-transform">EXP_DOSSIER →</span>
                </div>
              </div>

              {/* Pick 3: Vecna */}
              <div 
                onClick={() => {
                  setSelectedCharId('vecna');
                  onNavigate('Characters');
                }}
                className={`p-4 rounded-lg bg-zinc-950/60 border hover:bg-neutral-950 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-44 ${
                  mode === 'UpsideDown'
                    ? 'border-[#E21D26]/40 hover:border-[#E21D26] hover:shadow-[0_0_20px_rgba(226,29,38,0.35)] bg-red-950/5 animate-pulse'
                    : 'border-white/5 hover:border-[#E21D26]/40'
                }`}
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono opacity-30 group-hover:opacity-80 transition-opacity text-[#E21D26] font-bold">
                  SUB_001
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase bg-red-650/25 text-red-500 px-2 py-0.5 rounded border border-red-600/30 font-bold inline-block">
                    CURSE_ACTIVE
                  </span>
                  <h4 className="font-serif text-lg text-white font-bold tracking-wide mt-1.5 group-hover:text-[#E21D26] group-hover:text-shadow-red transition-all">
                    Vecna
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                    Henry Creel. Primordial host of the Upside Down coordinate invasions. Danger level 100%.
                  </p>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[#E21D26] animate-pulse">WARNING</span>
                  <span className="group-hover:translate-x-1 transition-transform">EXP_DOSSIER →</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Grid footer elements resembling retro scopes */}
        <div className="absolute bottom-6 inset-x-0 hidden md:flex justify-between items-center px-12 z-20 pointer-events-none font-mono text-[8px] text-zinc-650 tracking-widest uppercase">
          <div>COORDINATES: S04_REEL_001</div>
          <div className="flex gap-4">
            <span>FREQ: 11.20 MHZ</span>
            <span>CH: 11</span>
          </div>
        </div>
      </section>

      {/* PREMIUM INTEL DOSSIER - 6 CHARACTER GALLERY */}
      <section id="home-characters-section" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-25 border-t border-white/5 bg-[#030303]/90 relative overflow-hidden">
        
        {/* Absolute floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                backgroundColor: mode === 'UpsideDown' ? '#E21D26' : '#3b82f6',
                opacity: Math.random() * 0.35 + 0.15,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -120 - Math.random() * 150],
                x: [0, (Math.random() - 0.5) * 80],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="relative z-10 space-y-16">
          {/* Header Title with Editorial Line Styling */}
          <div className="text-center relative max-w-2xl mx-auto space-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#E21D26] shadow-[0_0_10px_#E21D26]" />
            <span className="font-mono text-xs text-[#E21D26] uppercase tracking-[0.4em] pt-4 block font-black">
              SURVEILLANCE DOSSIERS // LEVEL 4 CLASSIFIED
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-black uppercase tracking-tight text-white leading-none">
              CLASSIFIED <span className="text-transparent font-outline" style={{ WebkitTextStroke: '1.2px #E21D26' }}>PERSONNEL</span>
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Interdimensional field diagnostics of the primary survivors of the 1983 Hawkins Gate manifestation event.
            </p>
          </div>

          {/* 6-Card Cinematic Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPOTLIGHT_CHARACTERS.map((char, index) => {
              const fileStatus = char.id === 'max' ? 'CRITICAL' : 'ACTIVE';
              return (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedCharId(char.id);
                    onNavigate('Characters');
                  }}
                  className={`group relative overflow-hidden bg-zinc-950/75 backdrop-blur-md border border-white/5 rounded-xl p-6 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-[450px] cursor-pointer ${char.glowColor}`}
                >
                  
                  {/* Embedded Floating Image Canvas with Hover Zoom */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 z-10 transition-colors duration-500 group-hover:from-black/85 group-hover:via-black/60" />
                    <SafeCinematicImage
                      src={char.image}
                      fallbackSrc={char.fallbackImage}
                      alt={char.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
                      style={{
                        objectPosition: getObjectPosition(char.id)
                      }}
                    />
                    
                    {/* Digital Scanning sweep line on hover */}
                    <div className="absolute inset-x-0 h-[2px] bg-[#E21D26] opacity-0 group-hover:opacity-50 top-0 group-hover:top-[98%] transition-all duration-[1300] ease-in-out repeat-infinite z-15" />
                  </div>

                  {/* Card Top: Metadata and Classification Index */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono tracking-widest text-[#E21D26] bg-[#E21D26]/10 border border-[#E21D26]/20 px-2 py-0.5 rounded font-black uppercase">
                        {char.code}
                      </span>
                      <span className="block text-[8px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">
                        SEAS_04 DIAGNOSTIC
                      </span>
                    </div>
                    
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#E21D26]/35 group-hover:bg-[#E21D26]/10 transition-colors">
                      {getCardIcon(char.id)}
                    </div>
                  </div>

                  {/* Card Bottom: Content Specifications */}
                  <div className="relative z-10 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-serif font-bold text-white tracking-wide group-hover:text-[#E21D26] transition-colors">
                          {char.name}
                        </h4>
                        <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${fileStatus === 'CRITICAL' ? 'bg-rose-500/10 text-rose-450 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                          {fileStatus}
                        </span>
                      </div>
                      
                      <p className="text-xs text-red-550 font-mono tracking-wide uppercase italic">
                        {char.trait}
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-light line-clamp-3">
                        {char.description}
                      </p>
                    </div>

                    {/* High precision View Profile Button */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCharId(char.id);
                          onNavigate('Characters');
                        }}
                        className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#E21D26] hover:text-white border border-white/10 hover:border-[#E21D26] text-zinc-350 rounded font-mono text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(226,29,38,0.45)]"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>View Character Profile</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
