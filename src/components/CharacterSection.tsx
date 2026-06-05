import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../data';
import { Character } from '../types';
import SafeCinematicImage from './SafeCinematicImage';
import { 
  Star, 
  ShieldAlert, 
  BookOpen, 
  Quote, 
  Sparkles, 
  Wand2, 
  Shield, 
  Heart, 
  Zap, 
  Swords, 
  User, 
  Activity, 
  Fingerprint, 
  Lock, 
  Volume2, 
  Scan,
  Compass,
  Cpu
} from 'lucide-react';

interface CharacterSectionProps {
  mode: 'RealWorld' | 'UpsideDown';
  selectedCharId: string;
  setSelectedCharId: (id: string) => void;
}

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

// Portraits mapped directly from character database in types/data.ts

export default function CharacterSection({ mode, selectedCharId, setSelectedCharId }: CharacterSectionProps) {
  const selectedChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
  
  // Ref & 3D Tilt coordinates state
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'METRICS' | 'ABILLITIES' | 'VOCALS'>('METRICS');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Missing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Trapped in Upside Down':
        return 'bg-red-500/15 text-red-500 border-red-500/30 animate-pulse';
      case 'Deceased':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700/50';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  // Character Icon selector helper
  const getCharacterIcon = (id: string, size = "w-6 h-6") => {
    switch (id) {
      case 'mike':
        return <Heart className={`${size} text-rose-500`} />;
      case 'eleven':
        return <Zap className={`${size} text-pink-500 animate-pulse`} />;
      case 'max':
        return <Sparkles className={`${size} text-orange-400`} />;
      case 'steve':
        return <Swords className={`${size} text-indigo-400`} />;
      case 'will':
        return <Wand2 className={`${size} text-emerald-400`} />;
      case 'dustin':
        return <Shield className={`${size} text-sky-400`} />;
      case 'lucas':
        return <Star className={`${size} text-amber-500`} />;
      case 'vecna':
        return <ShieldAlert className={`${size} text-red-650 animate-pulse`} />;
      case 'nancy':
        return <Fingerprint className={`${size} text-fuchsia-400`} />;
      case 'jonathan':
        return <Scan className={`${size} text-amber-500`} />;
      case 'robin':
        return <Cpu className={`${size} text-teal-450`} />;
      case 'eddie':
        return <Volume2 className={`${size} text-purple-400`} />;
      case 'billy':
        return <ShieldAlert className={`${size} text-red-500`} />;
      default:
        return <User className={`${size} text-zinc-400`} />;
    }
  };

  // Manage mouse move for 3D tilt and light beam following
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalization to range (-15, 15) degrees for Apple responsive tilt
    const tiltX = ((x / rect.width) - 0.5) * 20; 
    const tiltY = ((y / rect.height) - 0.5) * -20; 

    setMousePos({ x, y });
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const currentPortrait = selectedChar.image;

  return (
    <section id="characters-showcase" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Decorative matrix Grid background */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Cinematic Glowing Header Layout */}
      <div className="relative z-10 text-center mb-16 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Scan className={`w-4 h-4 ${mode === 'UpsideDown' ? 'text-[#E21D26] animate-pulse' : 'text-blue-500'}`} />
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.35em]">
            SYSTEM Dossiers // DECRYPTION INTEGRATED
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-black uppercase text-white tracking-wide">
          HAWKINS <span className="text-transparent font-outline-red font-bold text-shadow-red" style={{ WebkitTextStroke: '1px #E21D26' }}>ARCHIVES</span>
        </h2>
        <div className="w-16 h-1 bg-[#E21D26] mx-auto rounded shadow-[0_0_12px_#E21D26]" /> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
        
        {/* LEFT COLUMN: SUBJECT BADGE SELECTION LIST (5-columns) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-start space-y-4">
          <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/60 backdrop-blur-md space-y-1">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Fingerprint className="w-3.5 h-3.5 text-zinc-400" /> IDENTITY VALIDATION SYSTEM
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Scan through local telecommunication links to decode credentials.
            </p>
          </div>

          <div id="character-selectors-scroller" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[580px] overflow-y-auto pr-1">
            {CHARACTERS.map((char) => {
              const isSelected = char.id === selectedCharId;
              const hasRedGlow = mode === 'UpsideDown' || char.id === 'vecna';
              
              return (
                <button
                  key={char.id}
                  id={`character-selector-card-${char.id}`}
                  onClick={() => setSelectedCharId(char.id)}
                  className={`p-3 rounded-xl border relative overflow-hidden transition-all duration-300 text-left cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? hasRedGlow
                        ? 'bg-red-950/15 border-red-600 shadow-[0_0_20px_rgba(226,29,38,0.25)]'
                        : 'bg-zinc-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-zinc-950/50 border-white/5 hover:border-zinc-800 hover:bg-zinc-900/40'
                  }`}
                >
                  {/* Selected neon status line indicators */}
                  <div className={`absolute top-0 bottom-0 left-0 w-[3px] transition-all duration-300 ${
                    isSelected
                      ? hasRedGlow ? 'bg-red-500 shadow-[0_0_8px_#E21D26]' : 'bg-blue-500'
                      : 'bg-transparent group-hover:bg-zinc-800'
                  }`} />

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                      isSelected 
                        ? hasRedGlow ? 'border-red-650/40 bg-red-950/20' : 'border-blue-500/30 bg-blue-950/20'
                        : 'border-zinc-850 bg-zinc-950'
                    }`}>
                      {getCharacterIcon(char.id, "w-4 h-4")}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold tracking-wide transition-colors ${
                        isSelected 
                          ? hasRedGlow ? 'text-red-400' : 'text-zinc-100'
                          : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}>
                        {char.name}
                      </h4>
                      <span className="text-[10px] font-mono font-medium text-zinc-500 block uppercase tracking-wider mt-0.5">
                        {char.alterEgo}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 font-mono text-[9px] text-zinc-500">
                    <span className="opacity-40">SEAS_0{char.seasonIntroduced}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isSelected
                        ? hasRedGlow ? 'bg-red-500 animate-ping' : 'bg-blue-400 animate-ping'
                        : 'bg-zinc-800'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: COGNITIVE IMAGES & 3D TILT PARALLAX DOSSIER PANEL (8-columns) */}
        <div className="col-span-1 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCharId}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              id="character-dossier-root"
              className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-950/40 backdrop-blur-xl h-full flex flex-col justify-between group p-6 sm:p-8"
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                boxShadow: isHovered 
                  ? '0 0 50px rgba(226, 29, 38, 0.45)' 
                  : '0 10px 40px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
              }}
            >
              
              {/* Premium Mouse-Follow Beam Dynamic Glowing Filter */}
              {isHovered && (
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-100 transition-all duration-300 z-10"
                  style={{
                    background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
                      mode === 'UpsideDown' || selectedChar.id === 'vecna'
                        ? 'rgba(226, 29, 38, 0.14)' 
                        : 'rgba(59, 130, 246, 0.11)'
                    }, transparent 70%)`
                  }}
                />
              )}

              {/* Parallax Depth Layer 1: Spooky Crimson/Blue Portrait Background */}
              <div 
                className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none transition-transform duration-100 ease-out"
                style={{
                  transform: isHovered 
                    ? `translateX(${tilt.x * -0.6}px) translateY(${tilt.y * -0.6}px)` 
                    : 'none',
                }}
              >
                <SafeCinematicImage
                  src={currentPortrait}
                  fallbackSrc={selectedChar.fallbackImage}
                  alt={selectedChar.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-115 saturate-110 transition-all duration-700 ease-in-out rounded-2xl z-0"
                  style={{
                    objectPosition: getObjectPosition(selectedChar.id)
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10 transition-colors duration-500 pointer-events-none" />
                <div className={`absolute inset-0 z-10 pointer-events-none ${
                  mode === 'UpsideDown' || selectedChar.id === 'vecna'
                    ? 'bg-radial-vignette-red combine-mix opacity-50'
                    : 'bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_75%)]'
                }`} />

                {/* Cyber Scan line bar sweeping infinitely */}
                <div className="absolute inset-x-0 h-0.5 bg-[#E21D26]/40 shadow-[0_0_10px_#E21D26] animate-scanline z-10" />
              </div>

              {/* Decorative Apple-level corner laser line borders */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#E21D26] shadow-[0_0_12px_#E21D26] rounded-tl-2xl z-20 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#E21D26] shadow-[0_0_12px_#E21D26] rounded-tr-2xl z-20 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#E21D26] shadow-[0_0_12px_#E21D26] rounded-bl-2xl z-20 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#E21D26] shadow-[0_0_12px_#E21D26] rounded-br-2xl z-20 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />

              {/* Parallax Depth Layer 2: Main Contents Overlay */}
              <div 
                className="relative z-20 flex flex-col justify-between h-full space-y-8 select-none transition-transform duration-100 ease-out"
                style={{
                  transform: isHovered 
                    ? `translateX(${tilt.x * 0.3}px) translateY(${tilt.y * 0.3}px)` 
                    : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white">
                        {getCharacterIcon(selectedChar.id, "w-6 h-6")}
                      </div>
                      <h3 className={`text-3xl sm:text-4xl font-serif uppercase tracking-tight text-white font-extrabold ${
                        selectedChar.id === 'vecna' || mode === 'UpsideDown' ? 'text-shadow-red animate-flicker text-[#E21D26]' : ''
                      }`}>
                        {selectedChar.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                      <span>PROJECT INTEL: {selectedChar.alterEgo}</span>
                      <span>•</span>
                      <span>PORTRAYED BY: {selectedChar.actor}</span>
                    </div>
                  </div>

                  <div className={`px-3 py-1.5 rounded border text-[10px] font-mono font-bold uppercase ${getStatusColor(selectedChar.status)}`}>
                    {selectedChar.status}
                  </div>
                </div>

                {/* Mid Section: Tab Controls for Apple presentation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-4">
                  
                  {/* Left Specs specs column */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-black text-[#E21D26] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> ARCHIVAL REEL OVERVIEW
                      </span>
                      <p className="text-zinc-350 text-xs sm:text-sm leading-relaxed font-light">
                        {selectedChar.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-black text-blue-400 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" /> FIELD DISPOSITION
                      </span>
                      <span className={`inline-block text-xs font-mono font-bold tracking-wide border px-3 py-1.5 rounded-lg bg-zinc-950/80 ${
                        mode === 'UpsideDown' || selectedChar.id === 'vecna'
                          ? 'border-red-900/40 text-red-400'
                          : 'border-blue-500/10 text-blue-400'
                      }`}>
                        {selectedChar.ability}
                      </span>
                    </div>
                  </div>

                  {/* Right specs column featuring live HUD state tab */}
                  <div className="md:col-span-5 space-y-5 bg-zinc-950/65 border border-white/5 rounded-xl p-5 relative">
                    {/* Retro HUD grid decoration */}
                    <div className="absolute inset-0 grid grid-cols-3 pointer-events-none opacity-5 z-0">
                      <div className="border-r border-white h-full" />
                      <div className="border-r border-white h-full" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1">
                        <Activity className="w-3 h-3 text-red-500 animate-pulse" /> BIO_TELEMETRY READOUT
                      </span>
                      <span className="font-mono text-[8px] text-zinc-650">S04_ONLINE</span>
                    </div>

                    {/* Power rating bar */}
                    <div className="space-y-1.5 relative z-10">
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        <span>PSYCHIC CAPABILITY</span>
                        <span className="text-white font-bold">{selectedChar.powerLevel}%</span>
                      </div>
                      <div className="h-3.5 bg-black border border-white/5 rounded-sm p-[2px] flex gap-[2px] overflow-hidden">
                        {Array.from({ length: 15 }).map((_, i) => {
                          const limit = (i / 15) * 100;
                          const active = selectedChar.powerLevel >= limit;
                          return (
                            <div
                              key={i}
                              className={`flex-1 rounded-xs transition-all duration-600 ${
                                active
                                  ? selectedChar.id === 'vecna' || mode === 'UpsideDown'
                                    ? 'bg-red-650 shadow-[0_0_5px_rgba(220,38,38,0.7)]'
                                    : 'bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]'
                                  : 'bg-zinc-900/60'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Danger rating bar */}
                    <div className="space-y-1.5 relative z-10">
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        <span>THREAT COEFFICIENT</span>
                        <span className={`font-bold ${selectedChar.dangerLevel >= 75 ? 'text-red-500' : 'text-amber-500'}`}>{selectedChar.dangerLevel}%</span>
                      </div>
                      <div className="h-3.5 bg-black border border-white/5 rounded-sm p-[2px] flex gap-[2px] overflow-hidden">
                        {Array.from({ length: 15 }).map((_, i) => {
                          const limit = (i / 15) * 100;
                          const active = selectedChar.dangerLevel >= limit;
                          return (
                            <div
                              key={i}
                              className={`flex-1 rounded-xs transition-all duration-600 ${
                                active
                                  ? 'bg-red-500 shadow-[0_0_6px_#E21D26]'
                                  : 'bg-zinc-900/60'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Bio indicators */}
                    <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 mt-1">
                      <span className="flex items-center gap-1.5">
                        <Fingerprint className="w-3.5 h-3.5 text-zinc-500" /> DEC_SUCCESS
                      </span>
                      <span className="flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-emerald-500" /> MATRIX COEF OK
                      </span>
                    </div>

                  </div>
                </div>

                {/* Dynamic Quote Transmissions */}
                <div className="border-t border-white/5 pt-6 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-black text-rose-550 flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-[#E21D26] animate-pulse" /> PSYCHIC FEED TRANSMISSIONS
                    </span>
                    <span className="font-mono text-[8px] text-zinc-650 uppercase tracking-widest">
                      AUDIO SOURCE: TRANS_RECORDING
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedChar.quotes.map((quote, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border font-mono text-xs text-center flex items-center justify-center relative overflow-hidden group/quote min-h-[75px] cursor-help tracking-wide ${
                          mode === 'UpsideDown' || selectedChar.id === 'vecna'
                            ? 'bg-red-950/15 border-red-900/30 text-red-400/90'
                            : 'bg-zinc-950/80 border-white/5 text-zinc-350'
                        }`}
                      >
                        {/* Audio track effect on quote hover */}
                        <div className={`absolute top-0 right-0 p-1 text-[8px] opacity-20 font-mono`}>
                          T_0{idx}
                        </div>
                        <p className="italic relative z-10 leading-relaxed font-medium">“{quote}”</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
