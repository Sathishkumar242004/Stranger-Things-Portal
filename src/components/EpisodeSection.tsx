import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EPISODES } from '../data';
import { 
  Clock, 
  Calendar, 
  Play, 
  Tv, 
  Sparkles, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX, 
  Skull, 
  Stars, 
  Award, 
  Film,
  Info
} from 'lucide-react';

interface EpisodeSectionProps {
  mode: 'RealWorld' | 'UpsideDown';
}

const SEASONS = [
  { value: 1, label: 'Season 1', subtitle: 'The Vanishing • 1983', count: 8 },
  { value: 2, label: 'Season 2', subtitle: 'The Gate • 1984', count: 9 },
  { value: 3, label: 'Season 3', subtitle: 'Starcourt • 1985', count: 8 },
  { value: 4, label: 'Season 4', subtitle: 'Vecna\'s Curse • 1986', count: 9 },
  { value: 5, label: 'Season 5', subtitle: 'The Final Stand • 1987', count: 8, isFinal: true },
];

export default function EpisodeSection({ mode }: EpisodeSectionProps) {
  const [activeSeason, setActiveSeason] = useState(5);
  const [selectedEpId, setSelectedEpId] = useState('s5e1');

  useEffect(() => {
    const s1e1 = EPISODES.find((ep) => ep.id === 's1e1');
    if (s1e1) {
      console.log('📼 [S01E01] Dedicated Episode Thumbnail Path loaded into client:', s1e1.thumbnail || s1e1.image);
    }
  }, []);
  
  // Interactive client state: Mark as Watched tracks which episodes have been viewed
  const [watchedEpisodes, setWatchedEpisodes] = useState<Record<string, boolean>>({
    's1e1': true,
    's1e8': true,
    's2e9': true,
    's3e8': true,
    's4e4': true,
    's4e9': false,
  });

  // Simulated visual noise glitch state when trailer/preview changes
  const [isSimulatingGlitch, setIsSimulatingGlitch] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const filteredEpisodes = EPISODES.filter((ep) => ep.season === activeSeason);
  const selectedEp = EPISODES.find((ep) => ep.id === selectedEpId) || filteredEpisodes[0] || EPISODES[0];

  const handleSelectEpisode = (epId: string) => {
    setIsSimulatingGlitch(true);
    setSelectedEpId(epId);
    setTimeout(() => {
      setIsSimulatingGlitch(false);
    }, 450);
  };

  const toggleEpisodeWatched = (epId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setWatchedEpisodes(prev => ({
      ...prev,
      [epId]: !prev[epId]
    }));
  };

  const currentProgressPercent = (epId: string) => {
    if (watchedEpisodes[epId]) return 100;
    // Preset mock progress states for realistic values
    const hash = epId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 65) + 20; // returns value between 20% and 85%
  };

  // Render cinematic rating stats
  const renderPopularRating = (rating: number) => {
    const filledStars = Math.round(rating / 2);
    return (
      <div className="flex items-center gap-0.5 text-red-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Stars
            key={i}
            className={`w-3.5 h-3.5 ${
              i < filledStars
                ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.8)]'
                : 'text-zinc-800'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="episodes-timeline" className="relative py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Neon Gradients */}
      <div className={`absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full filter blur-3xl pointer-events-none transition-all duration-[1500ms] ${
        activeSeason === 5
          ? 'opacity-[0.22] bg-red-650 animate-pulse'
          : 'opacity-[0.03] bg-red-600'
      }`} />
      <div className={`absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full filter blur-3xl pointer-events-none transition-all duration-[1500ms] ${
        activeSeason === 5
          ? 'opacity-[0.16] bg-red-950 animate-bounce'
          : 'opacity-[0.03] bg-blue-500'
      }`} />

      {/* Special red Upside Down visual effects for Season 5 */}
      {activeSeason === 5 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {/* Subtle ash flakes floating */}
          <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-red-500/30 rounded-full blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[35%] right-[25%] w-1 h-1 bg-red-600/45 rounded-full blur-[1px] animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute top-[65%] left-[45%] w-1.5 h-1.5 bg-red-500/20 rounded-full blur-[1.5px] animate-ping" style={{ animationDuration: '6s' }} />
          <div className="absolute top-[75%] left-[15%] w-2 h-2 bg-red-700/20 rounded-full blur-[2px] animate-ping" style={{ animationDuration: '5s' }} />
          <div className="absolute top-[50%] right-[10%] w-1.5 h-1.5 bg-red-650/40 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3.5s' }} />
          {/* Red scanline or overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-red-950/10 mix-blend-color-burn" />
        </div>
      )}

      {/* Retro VHS Overhead Header */}
      <div className="text-center space-y-3 mb-10">
        <span className={`font-mono text-xs uppercase tracking-[0.3em] block ${
          activeSeason === 5
            ? 'text-red-500 animate-pulse font-extrabold text-shadow-[0_0_8px_rgba(220,38,38,0.8)]'
            : mode === 'UpsideDown' 
            ? 'text-red-500 animate-pulse font-extrabold' 
            : 'text-zinc-400 font-medium'
        }`}>
          {activeSeason === 5 ? 'VECNA CONVERGENCE DECAY // SECTOR_05 TARGET' : 'HAWKINS TV CABLE COMMUNION // TRANSMISSION LOG'}
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif text-white font-extrabold tracking-widest uppercase">
          {activeSeason === 5 ? 'The Final Chapter' : 'Chapter Chronicles'}
        </h2>
        <p className="text-zinc-500 text-xs font-mono tracking-widest">
          {activeSeason === 5 ? 'DECRYPTING SURVIVAL DATA STREAM ACROSS ROT-INFESTED FREQUENCIES' : 'BROWSE PREMIUM DIGITAL EMBEDDED VHS CASSETTES ACROSS REALITY VECTORS'}
        </p>
      </div>

      {/* Season Selection Deck (Cassette-style Switcher) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-900 mb-12 relative z-20">
        {SEASONS.map((season) => {
          const isActive = activeSeason === season.value;
          return (
            <button
              key={season.value}
              id={`season-button-tab-${season.value}`}
              onClick={() => {
                setActiveSeason(season.value);
                const firstOfSeason = EPISODES.find((ep) => ep.season === season.value);
                if (firstOfSeason) {
                  handleSelectEpisode(firstOfSeason.id);
                }
              }}
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer group ${
                isActive
                  ? 'bg-zinc-900/60 border-red-500/80 text-white shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-gradient-to-br from-red-950/15 to-transparent'
                  : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20'
              }`}
            >
              {isActive && (
                <div className={`absolute left-0 top-0 bottom-0 w-1 shadow-[0_0_8px_rgba(239,68,68,0.8)] ${
                  season.value === 5 ? 'bg-red-500' : 'bg-red-650'
                }`} />
              )}
              <div className="flex justify-between items-center w-full">
                <span className="text-sm font-bold font-mono tracking-wider uppercase flex items-center gap-1">
                  {season.label}
                  {season.value === 5 && (
                    <span className="text-[8px] leading-none bg-red-600 text-white font-black px-1 py-0.5 rounded animate-pulse shadow-[0_0_6px_rgba(220,38,38,0.6)]">
                      FINAL
                    </span>
                  )}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-red-950/40 text-red-400 border border-red-900/40' : 'bg-zinc-900 text-zinc-650'
                }`}>
                  {season.count} EPS
                </span>
              </div>
              <span className="text-[11px] font-mono opacity-60 mt-1 truncate">
                {season.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Big Featured Hero Episode Billboard (Netflix Style Showcase Deck) */}
      <div className="relative mb-16 z-20">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-red-950/30 to-zinc-900/30 blur opacity-60" />
        
        <div className={`relative rounded-3xl border transition-all duration-[600ms] bg-zinc-950/95 overflow-hidden shadow-2xl p-6 lg:p-10 ${
          activeSeason === 5
            ? 'shadow-[0_0_50px_rgba(239,68,68,0.25)] border-red-650/40'
            : mode === 'UpsideDown' 
            ? 'shadow-[0_0_40px_rgba(185,28,28,0.1)] border-red-950/60' 
            : 'border-zinc-900/90'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Screen Player Preview (5 Columns) */}
            <div className="lg:col-span-6 xl:col-span-5 w-full">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-900 shadow-xl group bg-black">
                
                {/* Simulated static glitch filter */}
                <AnimatePresence mode="wait">
                  {isSimulatingGlitch ? (
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: [1, 0.8, 1, 0.9, 1] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-40 bg-zinc-900 mix-blend-screen opacity-90 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>")`
                      }}
                    />
                  ) : null}
                </AnimatePresence>

                {/* Scanline cinematic simulation overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/30 z-20" />
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.06] z-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)`
                  }}
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 z-10" />

                 {/* Main Hero Episode Image */}
                 <img
                   src={selectedEp.thumbnail || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=850'}
                   alt={selectedEp.title}
                   className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-102 group-hover:scale-108"
                   referrerPolicy="no-referrer"
                 />

                {/* Real-time playback widgets */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-300 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-zinc-805/40">
                    DECK_0{selectedEp.episodeNum} FEED
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-zinc-900/60 rounded px-2.5 py-1">
                  <button 
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={audioEnabled ? "Mute Stream Resonance" : "Unmute Stream Resonance"}
                  >
                    {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-red-500" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
                    {selectedEp.duration}
                  </span>
                </div>

                {/* Play Button Icon Overlaid centrally */}
                <div className="absolute inset-0 flex items-center justify-center z-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40 hover:scale-110 active:scale-95 transition-all cursor-pointer">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Information Dossier Details (7 Columns) */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-5">
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[10px] bg-red-950/40 text-red-400 font-extrabold font-mono border border-red-900/60 uppercase tracking-widest px-2.5 py-1 rounded-full">
                    Season {selectedEp.season}
                  </span>
                  {selectedEp.season === 5 && (
                    <span className="text-[10px] bg-red-600 text-white font-extrabold font-mono border border-red-500 uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                      FINAL SEASON
                    </span>
                  )}
                  <span className="text-[10px] bg-zinc-900 text-zinc-300 font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-zinc-800">
                    Chapter {selectedEp.episodeNum}
                  </span>
                  
                  {watchedEpisodes[selectedEp.id] && (
                    <span className="text-[9px] bg-emerald-950/40 text-emerald-400 font-extrabold font-mono border border-emerald-900/40 uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Fully Watched
                    </span>
                  )}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white tracking-wide text-shadow-red uppercase mt-1 leading-tight">
                  {selectedEp.title.replace(/Chapter [A-Za-z0-9]+: /, '')}
                </h3>
              </div>

              {/* Streaming Meta stats bar */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-400 uppercase tracking-wider bg-zinc-900/30 p-3 rounded-xl border border-zinc-900 max-w-xl">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>{selectedEp.duration} Runtime</span>
                </span>
                <span className="h-4 w-px bg-zinc-850" />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>{selectedEp.airDate}</span>
                </span>
                <span className="h-4 w-px bg-zinc-850" />
                <div className="flex items-center gap-2">
                  <span>Rating:</span>
                  {renderPopularRating(selectedEp.ratingPv)}
                  <span className="text-white font-bold">{selectedEp.ratingPv}</span>
                </div>
              </div>

              {/* Synopsis text box */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-zinc-500" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">
                    LOGGED ARCHIVE REPORT:
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300 font-sans font-light">
                  {selectedEp.synopsis}
                </p>

                {mode === 'UpsideDown' && (
                  <div className="bg-red-950/10 border-l-2 border-red-600 p-3 rounded-r-lg mt-2 font-mono">
                    <div className="flex items-center gap-1.5 text-xs text-red-500 font-extrabold">
                      <Skull className="w-4 h-4 animate-bounce" />
                      <span>DECRYPTED DECAY VECTOR INTERCEPT:</span>
                    </div>
                    <p className="text-xs text-red-400/90 italic mt-1 leading-relaxed">
                      * SUBJECT NO_011 STRUGGLES TO COMPREHEND THE REACH. WE SHALL CRUSH EVERY BONE. HER SILENT TEARS FEED OUR IMMINENT CONVERGENCE. THE RIFT EXPANDS. *
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons bar for Netflix authenticity */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button 
                  onClick={() => window.open('https://www.youtube.com/results?search_query=stranger+things+trailer+official', '_blank')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-750 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 transform active:scale-95 cursor-pointer shadow-lg shadow-red-900/30"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Watch Season Preview
                </button>
                <button
                  onClick={(e) => toggleEpisodeWatched(selectedEp.id, e)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-zinc-800 active:scale-95 cursor-pointer"
                >
                  {watchedEpisodes[selectedEp.id] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      Watched Logged
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Mark as Watched
                    </>
                  )}
                </button>
                <span className="text-xs text-zinc-500 font-mono pl-2 block sm:inline">
                  Directed by <span className="text-zinc-300 font-bold">{selectedEp.director}</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Netflix Horizontal Episode Cards Carousel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-20">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-extrabold uppercase tracking-wider text-white">
            Season {activeSeason} Episode Broadcasts
          </h3>
          <p className="text-[11px] font-mono text-zinc-500 tracking-wider mt-0.5">
            SELECT A TAPE TO LOAD ITS NARRATIVE VECTOR INTO THE PROJECTION SCREEN
          </p>
        </div>
        
        {/* Quick legend info */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" /> Seen Logs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" /> Non-Seen Logs
          </span>
        </div>
      </div>
       {/* Premium Horizontal Netflix Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-20">
        {filteredEpisodes.map((ep) => {
          const isSelected = ep.id === selectedEpId;
          const isWatched = watchedEpisodes[ep.id] || false;
          const progressMultiplier = currentProgressPercent(ep.id);
          
          return (
            <div
              key={ep.id}
              id={`episode-timeline-card-${ep.id}`}
              onClick={() => handleSelectEpisode(ep.id)}
              className={`flex flex-col rounded-xl bg-zinc-950/80 border overflow-hidden transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-zinc-950/50 ${
                isSelected
                  ? 'border-red-650 shadow-[0_0_20px_rgba(220,38,38,0.2)] scale-[1.02]'
                  : 'border-zinc-900 hover:border-zinc-800 hover:scale-[1.01]'
              }`}
            >
              {/* Media Thumbnail Container (Top section of Card) */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-zinc-900">
                <img
                  src={ep.thumbnail || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=850'}
                  alt={ep.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Absolute play button overlay visual on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="p-3 rounded-full bg-red-600/95 text-white scale-90 group-hover:scale-100 transition-transform shadow-lg shadow-red-900/40">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Chapter badge overlaid top left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold bg-black/70 border border-zinc-900 px-2 py-0.5 rounded text-zinc-300">
                    EP {ep.episodeNum}
                  </span>
                </div>

                {/* Progress viewed bar at bottom of card image */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-800 z-10">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isWatched ? 'bg-red-600' : 'bg-red-600/50'
                    }`} 
                    style={{ width: `${progressMultiplier}%` }}
                  />
                </div>
              </div>

              {/* Text Information block (Bottom section of Card) */}
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-2">
                  <h4 className={`text-md font-sans font-bold tracking-wide transition-colors ${
                    isSelected ? 'text-red-500' : 'text-white hover:text-red-400'
                  }`}>
                    {ep.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-red-500 inline" />
                    <span>{ep.duration}</span>
                  </div>
                  
                  <p className="text-[11px] leading-relaxed text-zinc-400 font-sans font-light line-clamp-2 pt-0.5">
                    {ep.synopsis}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    <Stars className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-mono font-bold text-amber-500">★ {ep.ratingPv} Popular Vote</span>
                  </div>
                </div>

                {/* Seen status action row */}
                <div className="flex items-center justify-between border-t border-zinc-900 pt-2.5 mt-1 select-none text-[10px] font-mono text-zinc-500">
                  <span>By: {ep.director.split(' ').pop()}</span>
                  
                  <button
                    onClick={(e) => toggleEpisodeWatched(ep.id, e)}
                    className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded hover:bg-zinc-850"
                  >
                    {isWatched ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Seen</span>
                      </>
                    ) : (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-650" />
                        <span>Mark Seen</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
