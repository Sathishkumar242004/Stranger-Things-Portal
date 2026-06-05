import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Eye, AlertTriangle } from 'lucide-react';

interface SafeCinematicImageProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  episodeTitle?: string;
  episodeNum?: number;
  season?: number;
}

export default function SafeCinematicImage({
  src,
  fallbackSrc,
  alt,
  className,
  style,
  referrerPolicy = 'no-referrer',
  episodeTitle,
  episodeNum,
  season
}: SafeCinematicImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(!src);
    setHasTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc);
      setHasTriedFallback(true);
    } else {
      setHasError(true);
    }
  };

  // If there is an error (image failed to load, or was empty)
  // we render a highly polished cinematic premium Stranger Things classified lab dossier placeholder card.
  if (hasError || !imgSrc) {
    return (
      <div 
        className={`w-full h-full relative overflow-hidden flex flex-col justify-between p-4 select-none ${className || ''}`}
        style={{
          background: 'radial-gradient(circle at center, #240506 0%, #0c0203 70%, #030000 100%)',
          border: '1px solid rgba(226, 29, 38, 0.25)',
          ...style
        }}
      >
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,29,38,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,29,38,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        {/* Sinister Red glow aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        
        {/* VHS Scanlines Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)'
          }}
        />

        {/* Decorative Vertical Caution Stripe on the left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-red-600 via-red-950/20 to-red-600" />

        {/* Cinematic Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-60">
            <Terminal className="w-3 h-3 text-red-500" />
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-red-500 font-extrabold">
              HAWKINS_NET // SYS_FEED
            </span>
          </div>
          <div className="flex items-center gap-1 bg-red-950/40 border border-red-900/30 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-widest text-red-500 uppercase font-bold">
            <ShieldAlert className="w-2.5 h-2.5 animate-pulse text-red-500" />
            SECURE DOSSIER
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 my-auto flex flex-col justify-center text-left pl-3 space-y-2">
          {/* Episode Label */}
          <span className="font-mono text-[9px] tracking-[0.3em] font-black text-red-500 uppercase block">
            {season !== undefined && episodeNum !== undefined ? `SEASON ${season} • EPISODE ${episodeNum}` : 'CLASSIFIED TRANSMISSION'}
          </span>
          
          {/* Main Title displaying beautifully in EB Garamond Display Serif with premium red glow shadow */}
          <h4 
            className="font-serif text-base md:text-lg leading-tight text-white font-extrabold tracking-wide uppercase transition-colors"
            style={{
              textShadow: '0 0 10px rgba(226, 29, 38, 0.85), 0 0 20px rgba(226, 29, 38, 0.45)'
            }}
          >
            {episodeTitle || alt || 'CLASSIFIED DOSSIER'}
          </h4>

          {/* Subtext info */}
          <p className="font-mono text-[7px] tracking-widest text-zinc-400 uppercase flex items-center gap-1">
            <Eye className="w-2.5 h-2.5 text-red-650" />
            REALITY DEVIATION READOUT COMPLETE
          </p>
        </div>

        {/* Bottom Technical Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-red-950/40 pt-2 pl-3">
          <div className="font-mono text-[7px] tracking-[0.15em] text-zinc-500 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 text-red-600/80" />
            CLASSIFIED CL_5 // RESTECH-1983
          </div>
          <div className="flex items-center gap-1">
            <span className="block w-1.5 h-1.5 rounded-full bg-red-650 animate-ping" />
            <span className="font-mono text-[7px] font-bold text-red-500 tracking-wider">SECURE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      referrerPolicy={referrerPolicy}
      onError={handleError}
    />
  );
}
