import { useEffect, useState } from 'react';
import { ExternalLink, Film, RefreshCw, AlertTriangle, Play, Loader2 } from 'lucide-react';

interface TrailerMediaSectionProps {
  season: number;
  youtubeId: string;
  title: string;
  isPlaying: boolean;
  mode: 'RealWorld' | 'UpsideDown';
  thumbnail: string;
  description?: string;
  onWatchDirect?: () => void;
}

export default function TrailerMediaSection({
  season,
  youtubeId,
  title,
  isPlaying,
  mode,
  thumbnail,
  description,
  onWatchDirect,
}: TrailerMediaSectionProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Formulate the canonical YouTube embed URL using current best practices
  const trailerUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

  // Log active trailer coordinates for debugging & diagnostics
  useEffect(() => {
    console.log(`[HAWKINS COMM DECK] Active Trailer - Season ${season} URL: ${trailerUrl}`);
  }, [season, youtubeId, trailerUrl]);

  // Reset loading and error states when youtubeId changes
  useEffect(() => {
    setIframeLoading(true);
    setLoadError(false);
  }, [youtubeId]);

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  const triggerDirectTab = () => {
    if (onWatchDirect) {
      onWatchDirect();
    } else {
      window.open(youtubeWatchUrl, '_blank');
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between" id={`trailer-media-viewport-s${season}`}>
      {/* Playback Space */}
      <div className="relative flex-1 aspect-video w-full overflow-hidden rounded-t-lg bg-black">
        {isPlaying && !useFallback ? (
          <>
            {/* Loading Shimmer Skeleton */}
            {iframeLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-900 font-mono">
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-16 h-16 rounded-full border-2 border-t-transparent ${mode === 'UpsideDown' ? 'border-red-500' : 'border-blue-400'} animate-spin`} />
                  <Loader2 className={`w-8 h-8 animate-spin ${mode === 'UpsideDown' ? 'text-red-500' : 'text-blue-400'}`} />
                </div>
                <div className="mt-5 text-center space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-100 block animate-pulse">
                    LOADING DECK SIGNAL S{season}...
                  </span>
                  <span className="text-[10px] text-zinc-500 block uppercase">
                    Connecting to secure video proxy
                  </span>
                </div>
              </div>
            )}

            <iframe
              src={trailerUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
              onLoad={() => setIframeLoading(false)}
              onError={() => {
                setLoadError(true);
                setUseFallback(true);
                setIframeLoading(false);
              }}
            ></iframe>
          </>
        ) : (
          /* Cinematic Fallback Card (When paused or restricted) */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-950/95 z-20 border border-zinc-900 relative overflow-hidden group select-none">
            {/* Cinematic Background Poster with Blur */}
            <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover filter blur-[2px] saturate-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            </div>

            {/* Alert Indicator */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
              <div className={`p-3.5 rounded-full bg-zinc-900 border mb-4 shadow-xl ${
                useFallback 
                  ? 'border-amber-500/40 text-amber-500' 
                  : mode === 'UpsideDown' 
                    ? 'border-red-650/40 text-red-500 animate-pulse' 
                    : 'border-blue-500/40 text-blue-400 animate-pulse'
              }`}>
                {useFallback ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <Film className="w-8 h-8" />
                )}
              </div>

              <h3 className="text-sm font-mono font-bold text-zinc-100 uppercase tracking-widest leading-none">
                {useFallback ? "STREAM EMBED UNAVAILABLE" : "VCR PLAYBACK DECK PAUSED"}
              </h3>
              
              <p className="text-xs text-zinc-400 font-sans mt-2 max-w-md leading-relaxed">
                {useFallback
                  ? "Direct streaming bypass protocol is active. This content can be verified on official servers."
                  : description || "Ready to engage screen communications. Press play on the video dock to begin streaming."}
              </p>

              {useFallback ? (
                <button
                  type="button"
                  onClick={triggerDirectTab}
                  className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold rounded-lg shadow-xl shadow-red-700/20 active:scale-95 transition-all uppercase tracking-wider"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> WATCH ON YOUTUBE DIRECTLY
                </button>
              ) : (
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-4 tracking-wider animate-pulse">
                  [ WAITING_FOR_COMMAND_SIGNAL_0X09 ]
                </span>
              )}
            </div>
          </div>
        )}

        {/* Glitch Indicator overlay for potential Errors */}
        {!useFallback && isPlaying && !iframeLoading && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono border border-zinc-800 text-zinc-400 shadow-md">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Iframe restricted?</span>
            <button
              onClick={() => {
                setUseFallback(true);
                setLoadError(true);
              }}
              className="text-amber-400 hover:text-amber-300 font-bold ml-1 cursor-pointer hover:underline uppercase"
              type="button"
            >
              Watch Directly (Bypass)
            </button>
          </div>
        )}
      </div>

      {/* Info and Fallback Bar at the Bottom */}
      <div className="p-3.5 bg-zinc-900 border-t border-zinc-800 rounded-b-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">STREAM TYPE:</span>
          <span className="text-emerald-400 font-bold uppercase">1080P_NETFLIX_EMBED</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-500">ID:</span>
          <span className="text-zinc-300 truncate max-w-[100px]">{youtubeId}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setUseFallback(!useFallback)}
            className={`flex items-center gap-1.5 hover:text-zinc-200 transition-colors ${useFallback ? 'text-amber-400' : ''}`}
            title="Toggle between Iframe Embed player and Direct Watch link fallback"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{useFallback ? "Switch to Embed" : "Bypass Embed"}</span>
          </button>

          <button
            onClick={triggerDirectTab}
            className="flex items-center gap-1.5 text-blue-405 text-blue-400 hover:text-blue-300 transition-colors uppercase font-bold relative group cursor-pointer"
            id={`external-watch-season-${season}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>OPEN NEW TAB</span>
          </button>
        </div>
      </div>
    </div>
  );
}
