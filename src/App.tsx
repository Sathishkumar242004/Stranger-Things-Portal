import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Disc, Volume2, VolumeX, Mail, Flame, Shield, HelpCircle, Terminal } from 'lucide-react';

// Custom Modules Imports
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import HomeSection from './components/HomeSection';
import CharacterSection from './components/CharacterSection';
import EpisodeSection from './components/EpisodeSection';
import ArchiveSection from './components/ArchiveSection';
import ContactSection from './components/ContactSection';
import TrailerModal from './components/TrailerModal';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [mode, setMode] = useState<'RealWorld' | 'UpsideDown'>('RealWorld');
  const [isWarping, setIsWarping] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState('eleven');

  // Synthesizer step sequencer audio state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const arpeggioIntervalRef = useRef<number | null>(null);

  // Dimensional Rift transition wrapper
  const handleModeChange = (newMode: 'RealWorld' | 'UpsideDown') => {
    if (isWarping) return;
    setIsWarping(true);
    // Audio deep flash blast
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(40, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.55);
      osc.type = 'sawtooth';
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}

    setTimeout(() => {
      setMode(newMode);
    }, 450);

    setTimeout(() => {
      setIsWarping(false);
    }, 1100);
  };

  // Play synthesized retro theme arpeggio
  const startAmbientMusic = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Master gain & filter route
      const synthGain = ctx.createGain();
      synthGain.gain.setValueAtTime(0.04, ctx.currentTime);
      synthGainRef.current = synthGain;

      // Spooky delay echo filter
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.22; // eighth note offset

      const delayFeedback = ctx.createGain();
      delayFeedback.gain.value = 0.32; // feedback ratio

      // Node wiring
      delay.connect(delayFeedback);
      delayFeedback.connect(delay);

      synthGain.connect(ctx.destination);
      synthGain.connect(delay);
      delay.connect(ctx.destination);

      // Stranger Things sequence frequencies (C3, Eb3, G3, B3, C4, B3, G3, Eb3)
      const notes = [130.81, 155.56, 196.00, 246.94, 261.63, 246.94, 196.00, 155.56];
      let stepIdx = 0;

      const playTickerStep = () => {
        if (ctx.state === 'suspended') return;

        const time = ctx.currentTime;
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(notes[stepIdx], time);

        // Lowpass sweep
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + Math.sin(time * 1.5) * 200, time);

        noteGain.gain.setValueAtTime(0.06, time);
        noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(synthGain);

        osc.start(time);
        osc.stop(time + 0.32);

        stepIdx = (stepIdx + 1) % notes.length;
      };

      const intervalId = window.setInterval(playTickerStep, 175);
      arpeggioIntervalRef.current = intervalId;
      setIsPlayingMusic(true);

    } catch (err) {
      console.warn('Audio synthesis not supported or locked: ', err);
    }
  };

  const stopAmbientMusic = () => {
    if (arpeggioIntervalRef.current) {
      clearInterval(arpeggioIntervalRef.current);
      arpeggioIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlayingMusic(false);
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  // Clean ambient audio loop on unmount
  useEffect(() => {
    return () => {
      if (arpeggioIntervalRef.current) clearInterval(arpeggioIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  // When loading completes, we auto-trigger arpeggio sound (if browser permits)
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Attempt auto-playback arpeggiator
    setTimeout(() => {
      startAmbientMusic();
    }, 600);
  };

  return (
    <div id="stranger-experience-root" className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans relative select-none selection:bg-red-950 selection:text-red-300">
      
      {/* 1. Loading sequence screen trigger */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Ambient Design Theme Glow & Bleed Overlays */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black" />
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-30" 
              style={{ background: 'radial-gradient(circle at 50% -20%, #E21D26 0%, transparent 70%)' }} 
            />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]" />
          </div>

          {/* 2. Particle Space Background Canvas */}
          <ParticleCanvas mode={mode} />

          {/* 3. Glassmorphism Upper Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mode={mode}
            setMode={handleModeChange}
          />

          {/* 4. Core Section Panel Renderer */}
          <main id="portal-tab-panels" className="flex-grow z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="w-full"
              >
                {activeTab === 'Home' && (
                  <HomeSection
                    mode={mode}
                    onOpenTrailer={() => setIsTrailerOpen(true)}
                    onNavigate={(tab) => setActiveTab(tab)}
                    setSelectedCharId={setSelectedCharId}
                  />
                )}
                {activeTab === 'Characters' && (
                  <CharacterSection
                    mode={mode}
                    selectedCharId={selectedCharId}
                    setSelectedCharId={setSelectedCharId}
                  />
                )}
                {activeTab === 'Episodes' && (
                  <EpisodeSection mode={mode} />
                )}
                {activeTab === 'Archive' && (
                  <ArchiveSection mode={mode} setMode={handleModeChange} />
                )}
                {activeTab === 'Contact' && (
                  <ContactSection mode={mode} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 5. Ambient synthesized audio cassette widget (lower right) */}
          <div className="fixed bottom-6 right-6 z-45 flex items-center">
            <motion.div
              layout
              className={`p-2 rounded-full border flex items-center gap-2 shadow-2xl relative ${
                mode === 'UpsideDown'
                  ? 'border-red-600/40 bg-radial-vignette-red shadow-red-950/50'
                  : 'bg-zinc-950 border-zinc-800'
              }`}
            >
              <button
                onClick={toggleMusic}
                id="synthesizer-tape-btn"
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isPlayingMusic
                    ? mode === 'UpsideDown'
                      ? 'bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.7)] text-white'
                      : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] text-white'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
                title={isPlayingMusic ? 'Mute Arpeggio Synthesizer' : 'Synthesize Stranger Title Track'}
              >
                {isPlayingMusic ? (
                  <Volume2 className="w-4 h-4 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {isPlayingMusic && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 0.85, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 font-bold pr-2.5 hidden sm:inline"
                  >
                    SYNTH_REEL_ACTIVE
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 6. High Craft cinematic footer details */}
          <footer className="z-35 border-t border-zinc-950 pb-8 pt-10 px-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest text-center mt-auto max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 relative select-none">
            <div className="flex flex-col items-center sm:items-start text-left leading-normal">
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${mode === 'UpsideDown' ? 'bg-red-600 animate-pulse' : 'bg-green-500 animate-ping'}`} />
                <span>FIELD NETWORK STATUS: ACTIVE</span>
              </div>
              <span className="text-[8px] text-zinc-700 mt-1">DIRECTOR DECK: HAWKINS LAB</span>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setActiveTab('Contact')} className="hover:text-zinc-300 transition-colors cursor-pointer flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> SECURE TRACE
              </button>
            </div>

            <div>
              &copy; 1986 HAWKINS LABORATORY INC.
            </div>
          </footer>

          {/* 7. Netflix-Style Teaser VCR Modal */}
          <TrailerModal
            isOpen={isTrailerOpen}
            onClose={() => setIsTrailerOpen(false)}
            mode={mode}
          />

          {/* Premium Quantum Membrane Rift Transition Overlay */}
          <AnimatePresence>
            {isWarping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, times: [0, 0.25, 0.75, 1], ease: "easeInOut" }}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 select-none pointer-events-auto"
              >
                {/* Visual warp distortions */}
                <motion.div 
                  className="absolute inset-0 bg-radial-vignette-red combine-mix"
                  animate={{ scale: [1, 1.25, 1] }} 
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 scanlines opacity-50 bg-repeat" />
                
                {/* Flashing grid coordinates & warning */}
                <div className="relative text-center space-y-4 px-6 z-10">
                  <motion.div 
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    className="flex justify-center"
                  >
                    <div className="px-3.5 py-1.5 border border-[#E21D26] bg-[#E21D26]/10 text-[#E21D26] text-xs font-mono font-bold tracking-[0.25em] uppercase rounded shadow-[0_0_15px_rgba(226,29,38,0.4)]">
                      CRITICAL REALITY DECOHERENCE
                    </div>
                  </motion.div>
                  <h3 id="warp-title" className="text-3xl sm:text-5xl font-serif font-black uppercase text-white tracking-[0.05em] leading-none text-shadow-red animate-pulse">
                    Puncturing the Rift
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em]">
                    Stabilizing interdimensional gateway field metrics...
                  </p>
                </div>

                {/* Vertical neon particle laser sweep indicator */}
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 0.9, ease: "linear", repeat: 1 }}
                  className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#E21D26] to-transparent shadow-[0_0_12px_#E21D26] z-10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </div>
  );
}
