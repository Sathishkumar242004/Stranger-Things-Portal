import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, Compass, EyeOff, Radio } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mode: 'RealWorld' | 'UpsideDown';
  setMode: (mode: 'RealWorld' | 'UpsideDown') => void;
}

const TABS = ['Home', 'Characters', 'Episodes', 'Archive', 'Contact'];

export default function Navbar({ activeTab, setActiveTab, mode, setMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMode = () => {
    const newMode = mode === 'RealWorld' ? 'UpsideDown' : 'RealWorld';
    setMode(newMode);
    
    // Play subtle audio click or synth spark
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (newMode === 'UpsideDown') {
        // Deep chilling drone drop pitch
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.type = 'sawtooth';
      } else {
        // Bright retro 80s arcade rising pitch
        osc.frequency.setValueAtTime(80, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.type = 'triangle';
      }
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.7);
    } catch (e) {
      // Browser audio constraints
    }
  };

  return (
    <header
      id="main-nav-header"
      className="fixed top-0 inset-x-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b transition-colors duration-1000 border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Glowing Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.div
            onClick={() => setActiveTab('Home')}
            className="cursor-pointer select-none flex items-center space-x-1.5 sm:space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-[#E21D26] font-serif text-xl xs:text-2xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none border-y border-[#E21D26] py-1 px-1.5 shadow-[0_0_15px_rgba(226,29,38,0.4)] whitespace-nowrap">
              STRANGER THINGS
            </span>
            <span className="text-[#E21D26] font-serif text-[11px] xs:text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase self-end mb-1 whitespace-nowrap">
              PORTAL
            </span>
          </motion.div>
        </div>

        {/* Center: Desktop Navigation List */}
        <nav className="hidden md:flex items-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              id={`nav-link-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`relative px-2 py-2 font-serif text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded ${
                activeTab === tab
                  ? 'text-[#E21D26]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 inset-x-0 h-[2px] rounded bg-[#E21D26] shadow-[0_0_10px_#E21D26]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Mode Switch Toggler (The Rift) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-zinc-950/80 p-1.5 rounded-full border border-zinc-800/80">
            <span className={`text-[10px] font-mono uppercase tracking-wider hidden lg:block px-2 ${mode === 'RealWorld' ? 'text-blue-400' : 'text-zinc-500'}`}>
              REAL WORLD
            </span>
            <button
              onClick={toggleMode}
              id="the-rift-switch"
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-all duration-700 cursor-pointer ${
                mode === 'UpsideDown'
                  ? 'bg-red-900 border border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                  : 'bg-zinc-800 border border-zinc-700'
              }`}
              title="Activate the Dimensional Rift Gate"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                className={`w-4 h-4 rounded-full shadow flex items-center justify-center ${
                  mode === 'UpsideDown' ? 'bg-red-500 ml-auto' : 'bg-blue-500 mr-auto'
                }`}
              >
                {mode === 'UpsideDown' ? (
                  <EyeOff className="w-2.5 h-2.5 text-black" />
                ) : (
                  <Compass className="w-2.5 h-2.5 text-white" />
                )}
              </motion.div>
            </button>
            <span className={`text-[10px] font-mono uppercase tracking-wider hidden lg:block px-2 ${mode === 'UpsideDown' ? 'text-red-500 animate-pulse font-bold' : 'text-zinc-500'}`}>
              UPSIDE DOWN
            </span>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-trigger"
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white transition-colors border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation-drawer"
            className="md:hidden border-t border-zinc-900 bg-zinc-950 pb-5 overflow-hidden transition-all"
          >
            <div className="px-4 pt-4 pb-3 space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  id={`mobile-nav-link-${tab.toLowerCase()}`}
                  className={`block w-full text-left px-4 py-3 rounded font-mono text-xs uppercase tracking-widest ${
                    activeTab === tab
                      ? mode === 'UpsideDown'
                        ? 'bg-red-950/40 border border-red-500/50 text-red-500 font-bold'
                        : 'bg-zinc-900 border border-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}

              {/* Mobile active mode status banner */}
              <div className="pt-2 px-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">DIMENSION FIELD:</span>
                <span className={`font-semibold tracking-wider flex items-center gap-1 ${
                  mode === 'UpsideDown' ? 'text-red-500 animate-pulse' : 'text-blue-400'
                }`}>
                  <Radio className="w-3 h-3 animate-pulse" />
                  {mode === 'UpsideDown' ? 'THE_UPSIDE_DOWN' : 'REALITY_STABLE'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
