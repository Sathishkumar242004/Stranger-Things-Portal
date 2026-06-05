import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('ESTABLISHING SECURE GATE CONNECTION...');
  const [readyToEnter, setReadyToEnter] = useState(false);

  useEffect(() => {
    // 1. Progress simulator
    let token = 0;
    const interval = setInterval(() => {
      token += Math.floor(Math.random() * 15) + 5;
      if (token >= 100) {
        token = 100;
        clearInterval(interval);
        setGlitchText('DIMENSIONAL FIELD STABILIZED.');
        setTimeout(() => {
          setReadyToEnter(true);
        }, 500);
      } else {
        // Change text occasionally to give depth
        if (token > 30 && token < 60) setGlitchText('SCANNING HAWKINS LABORATORY ELECTROMAGNETIC EMISSIONS...');
        if (token >= 60 && token < 85) setGlitchText('WARNING: VOLTAGE OSCILLATIONS EXCEED NORMAL BOUNDS...');
        if (token >= 85) setGlitchText('BREACHING RIFT COMPARTMENT 01...');
      }
      setProgress(token);
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    // Trigger intense synth chord on click
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const osc3 = audioCtx.createOscillator();
      
      const gainNode = audioCtx.createGain();

      osc1.frequency.setValueAtTime(65.41, audioCtx.currentTime); // C2
      osc1.type = 'sawtooth';

      osc2.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3
      osc2.type = 'sawtooth';

      osc3.frequency.setValueAtTime(155.56, audioCtx.currentTime); // Eb3 (Minor third for spooky vibe)
      osc3.type = 'triangle';

      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      // Simple lowpass filter
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      osc1.stop(audioCtx.currentTime + 1.9);
      osc2.stop(audioCtx.currentTime + 1.9);
      osc3.stop(audioCtx.currentTime + 1.9);
    } catch (e) {
      // audio restrictions
    }

    onComplete();
  };

  const strangerLetters = 'STRANGER'.split('');
  const thingsLetters = 'THINGS'.split('');

  return (
    <AnimatePresence>
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      >
        {/* Retro scanlines CRT filter overlay */}
        <div className="absolute inset-0 pointer-events-none scanlines opacity-50 z-30" />
        <div className="absolute inset-0 pointer-events-none bg-radial-vignette z-25" />

        {/* Flickering Red warning indicators */}
        <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-[9px] text-red-500/65 tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>DECK_RECORD: LIVE_COMM_LOG</span>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[9px] text-red-500/65 tracking-widest uppercase">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
          <span>STATUS: REALM_UNSTABLE</span>
        </div>

        {/* Main Netflix-style glowing text formation */}
        <div className="text-center px-4 mb-10 select-none">
          <div className="flex justify-center gap-0.5 sm:gap-1.5 md:gap-3 mb-1">
            {strangerLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 2, y: -40 }}
                animate={{ opacity: 0.95, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 80,
                  damping: 10,
                }}
                className="text-red-600 font-serif text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-normal text-glow-red md:font-outline"
                style={{
                  textShadow: '0 0 15px rgba(220, 38, 38, 0.95), 0 0 35px rgba(220, 38, 38, 0.6)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="flex justify-center gap-0.5 sm:gap-1.5 md:gap-3">
            {thingsLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 2, y: 40 }}
                animate={{ opacity: 0.95, scale: 1, y: 0 }}
                transition={{
                  delay: (index + 4) * 0.1,
                  type: 'spring',
                  stiffness: 80,
                  damping: 10,
                }}
                className="text-red-600 font-serif text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-normal text-glow-red md:font-outline animate-flicker"
                style={{
                  textShadow: '0 0 15px rgba(220, 38, 38, 0.95), 0 0 35px rgba(220, 38, 38, 0.6)',
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Loading details */}
        <div className="w-full max-w-sm px-6 text-center space-y-4">
          <AnimatePresence mode="wait">
            {!readyToEnter ? (
              <motion.div
                key="loading-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5"
              >
                {/* Micro linear track loading loader */}
                <div className="h-[2px] w-full bg-zinc-900 border border-zinc-800/50 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-zinc-500 tracking-wider">
                  <span>VOIDS_BREACH_COEF</span>
                  <span className="text-red-500 font-bold">{progress}%</span>
                </div>
                <p className="font-mono text-[9px] text-zinc-400 font-medium tracking-widest truncate uppercase text-center animate-pulse">
                  {glitchText}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="enter-action"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="pt-2"
              >
                <button
                  onClick={handleEnter}
                  id="vvc-enter-gate-btn"
                  className="px-8 py-3 bg-red-600 text-white font-mono text-xs uppercase tracking-widest font-bold rounded shadow-[0_0_25px_rgba(220,38,38,0.65)] hover:bg-red-700 hover:shadow-[0_0_35px_rgba(220,38,38,0.85)] border border-red-500/50 transition-all duration-300 animate-pulse hover:animate-none cursor-pointer"
                >
                  ENTER THE GATEWAY
                </button>
                <p className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-2">
                  WARNING: AUDIOPHILER SOUNDWAVE ENABLED
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fine-print info footer */}
        <div className="absolute bottom-6 font-mono text-[8px] text-zinc-600 uppercase tracking-widest">
          HAWKINS DEPARTMENT OF ENERGY © 1986
        </div>
      </div>
    </AnimatePresence>
  );
}
