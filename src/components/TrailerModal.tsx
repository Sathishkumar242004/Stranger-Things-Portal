import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Tv, Film, ExternalLink, RefreshCw } from 'lucide-react';
import TrailerMediaSection from './TrailerMediaSection';
import { TrailerData } from '../types';

import stSeasonOne from '../assets/images/st_season_one_1780492260648.png';
import stSeasonTwo from '../assets/images/st_season_two_1780492276270.png';
import stSeasonThree from '../assets/images/st_season_three_1780492293099.png';
import stSeasonFour from '../assets/images/st_season_four_1780492307175.png';
import stSeasonFive from '../assets/images/st_season_five_1780492320587.png';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'RealWorld' | 'UpsideDown';
}

const TRAILERS: TrailerData[] = [
  {
    season: 1,
    title: "Season 1 Official Trailer",
    youtubeId: "b9EkMc79ZSU",
    thumbnail: stSeasonOne,
    description: "The vanishing of a young boy triggers a chain of events that leads a small town into mystery, government experiments, and supernatural secrets."
  },
  {
    season: 2,
    title: "Season 2 Official Trailer",
    youtubeId: "vgS2L7WPIO4",
    thumbnail: stSeasonTwo,
    description: "It's 1984 and the citizens of Hawkins are still reeling from the horrors of the Demogorgon and the secrets of Hawkins Lab. Will Byers has been rescued but a bigger, sinister entity still threatens those who survived."
  },
  {
    season: 3,
    title: "Season 3 Official Trailer",
    youtubeId: "YEG3bmU_waI",
    thumbnail: stSeasonThree,
    description: "One summer can change everything. In the summer of 1985, a new mall in Hawkins has opened. Romance, friendships, and a sinister force return to threaten the small Indiana town."
  },
  {
    season: 4,
    title: "Season 4 Official Trailer",
    youtubeId: "yQEondeGvKo",
    thumbnail: stSeasonFour,
    description: "It's been six months since the Battle of Starcourt, which brought terror and destruction to Hawkins. Struggling with the aftermath, our group of friends are separated for the first time."
  },
  {
    season: 5,
    title: "Season 5 Official Teaser",
    youtubeId: "fxG-3zNl7QU",
    thumbnail: stSeasonFive,
    description: "The final, monumental confrontation. The barrier between central Hawkins and the Upside Down decay has crumbled. The ultimate battle to save reality begins."
  }
];

export default function TrailerModal({ isOpen, onClose, mode }: TrailerModalProps) {
  const [selectedSeason, setSelectedSeason] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [crtFilter, setCrtFilter] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentTrailer = TRAILERS.find((t) => t.season === selectedSeason) || TRAILERS[TRAILERS.length - 1];

  const handleWatchDirect = () => {
    window.open(`https://www.youtube.com/watch?v=${currentTrailer.youtubeId}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
        id="trailer-overlay"
      >
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 190 }}
          className={`relative w-full max-w-5xl rounded-2xl border p-4 sm:p-6 overflow-hidden bg-zinc-950 flex flex-col gap-6 my-auto ${
            mode === 'UpsideDown'
              ? 'border-red-600/50 shadow-[0_0_60px_rgba(220,38,38,0.3)]'
              : 'border-blue-500/30 shadow-[0_0_60px_rgba(59,130,246,0.2)]'
          }`}
          id="trailer-modal-container"
        >
          {/* CRT scanlines screen filter */}
          {crtFilter && (
            <div className="absolute inset-0 pointer-events-none z-30 scanlines opacity-[0.22] mix-blend-overlay bg-repeat" />
          )}

          {/* Premium Video Theater Headroom bar */}
          <div className="flex items-center justify-between border-b pb-3 border-zinc-850">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full animate-ping ${mode === 'UpsideDown' ? 'bg-red-650 text-red-600' : 'bg-blue-500 text-blue-500'}`} />
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 block">VHS DECK INTERSTAGE PROTOCOL</span>
                <h2 className={`font-mono text-sm font-black uppercase tracking-wider ${mode === 'UpsideDown' ? 'text-red-500' : 'text-blue-400'}`}>
                  {mode === 'UpsideDown' ? 'HAWKINS UNIFIED REEL DECK-05B' : 'HAWKINS AV CLUB ARCHIVE THEATER'}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* CRT Scanline Filter Toggle Switcher */}
              <button
                onClick={() => setCrtFilter(!crtFilter)}
                id="crt-toggle-btn"
                className={`hidden xs:flex items-center gap-1.5 px-3 py-1 rounded border font-mono text-[10px] transition-all cursor-pointer ${
                  crtFilter
                    ? mode === 'UpsideDown'
                      ? 'border-red-600/30 text-red-400 bg-red-950/20'
                      : 'border-blue-500/30 text-blue-400 bg-blue-950/20'
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                }`}
                title="Toggle CRT Static Scanlines Screen Filter"
              >
                <Tv className="w-3 h-3" />
                <span>CRT: {crtFilter ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={onClose}
                id="close-trailer-btn"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Core Master Player Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Embedded Active Frame Viewport (7 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="relative aspect-video w-full rounded-xl bg-black border border-zinc-900 overflow-hidden shadow-2xl">
                <TrailerMediaSection
                  season={selectedSeason}
                  youtubeId={currentTrailer.youtubeId}
                  title={currentTrailer.title}
                  isPlaying={isPlaying}
                  mode={mode}
                  thumbnail={currentTrailer.thumbnail}
                  description={currentTrailer.description}
                  onWatchDirect={handleWatchDirect}
                />

                {/* VHS Overlay Glitch Tracking Indicator and text */}
                <div className="absolute bottom-16 left-4 z-20 pointer-events-none font-mono text-[9px] text-[#22c55e]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-normal hidden md:block">
                  <div className="font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AV_CHANNEL: VHS_0{selectedSeason}</span>
                  </div>
                  <div className="opacity-75">TRACKING: AUTO_LOCKED</div>
                  <div className="text-orange-400/90 font-bold uppercase">REEL: ST_S{selectedSeason}_OFF_CAM_STREAM</div>
                </div>
              </div>
            </div>

            {/* Selected Metadata / Synopsis Card panel (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-900/40 border border-zinc-905 border-zinc-900/60 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/20 to-transparent pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${
                    mode === 'UpsideDown'
                      ? 'bg-red-950/40 border border-red-800/40 text-red-400'
                      : 'bg-blue-950/40 border border-blue-800/40 text-blue-400'
                  }`}>
                    Season {currentTrailer.season}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">ST_REC_VHS</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-serif text-white font-extrabold uppercase tracking-wide leading-tight">
                    {currentTrailer.title}
                  </h3>
                  <div className="h-[2px] w-12 bg-red-650 bg-red-600 rounded" />
                </div>

                <p className="font-sans text-xs text-zinc-300 leading-relaxed max-w-sm">
                  {currentTrailer.description}
                </p>
              </div>

              {/* Instant Controls panel */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col gap-2 relative z-10 font-mono">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  id="play-pause-vcr-btn"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
                      : mode === 'UpsideDown'
                        ? 'bg-red-600 hover:bg-red-705 bg-red-600 hover:bg-red-750 text-white shadow-lg shadow-red-650/20'
                        : 'bg-blue-500 hover:bg-blue-550 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE CASSETTE SIGNAL</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY CASSETTE SIGNAL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWatchDirect}
                  type="button"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OPEN IN NEW TAB</span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Media Browser Catalog Section - Styled exactly like Netflix browse list */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E21D26] block font-black">HAWKINS MEDIA ARCHIVE</span>
                <h3 className="text-sm font-sans font-extrabold text-zinc-100 uppercase tracking-widest">
                  Select Season Cassette
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:block">
                5 CASSETTES RECOVERED // HIGH FIDELITY VHS DECK ACTIVE
              </span>
            </div>

            {/* Custom Premium Netflix/HBO Grid View Container */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="vhs-media-grid">
              {TRAILERS.map((item) => {
                const isActive = selectedSeason === item.season;
                return (
                  <button
                    key={item.season}
                    id={`vhs-tab-season-${item.season}`}
                    onClick={() => {
                      setSelectedSeason(item.season);
                      setIsPlaying(true);
                    }}
                    type="button"
                    className="group flex flex-col text-left focus:outline-none cursor-pointer"
                  >
                    {/* Media Thumbnail Container with hover animation */}
                    <div className={`relative aspect-video w-full rounded-lg overflow-hidden border transition-all duration-300 ${
                      isActive
                        ? mode === 'UpsideDown'
                          ? 'border-red-650 ring-2 ring-red-650/40 ring-red-500/40 border-red-500 shadow-md shadow-red-500/10 scale-[1.02]'
                          : 'border-blue-500 ring-2 ring-blue-500/40 border-blue-500 shadow-md shadow-blue-500/10 scale-[1.02]'
                        : 'border-zinc-850 border-zinc-800 hover:border-zinc-700'
                    }`}>
                      {/* Thumbnail backdrop image with zoom-in on hover */}
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-90 saturate-75 contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Black Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300" />

                      {/* Play Hover Glassmorphic Center Mask */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[1px] transition-all duration-300">
                        <div className={`p-2.5 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl ${
                          isActive
                            ? mode === 'UpsideDown' ? 'bg-red-600' : 'bg-blue-500'
                            : 'bg-zinc-900 border border-zinc-700'
                        }`}>
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                      </div>

                      {/* Absolute Top badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-black tracking-wider shadow-lg ${
                          isActive
                            ? mode === 'UpsideDown'
                              ? 'bg-red-950/85 border border-red-550 border-red-500 text-red-200'
                              : 'bg-blue-950/85 border border-blue-550 border-blue-500 text-blue-200'
                            : 'bg-zinc-950/85 border border-zinc-800 text-zinc-400'
                        }`}>
                          S{item.season}
                        </span>
                      </div>

                      {/* Active Highlighting neon pulse pill */}
                      {isActive && (
                        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 text-[8px] font-mono text-zinc-200 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-current">
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${mode === 'UpsideDown' ? 'bg-red-500' : 'bg-blue-400'}`} />
                          <span className="font-bold">ACTIVE</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata titles underneath the card */}
                    <div className="mt-2 text-xs font-mono space-y-0.5 px-0.5">
                      <span className={`block font-bold truncate transition-colors ${
                        isActive 
                          ? mode === 'UpsideDown' ? 'text-red-400' : 'text-blue-400'
                          : 'text-zinc-300 group-hover:text-zinc-100'
                      }`}>
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-zinc-500 uppercase truncate">
                        HAWKINS_CASSETTE_S0{item.season}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
