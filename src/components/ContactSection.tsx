import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, ShieldCheck, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';

import imgTerminal from '../assets/images/hawkins_lab_terminal_1780309521738.png';

interface ContactSectionProps {
  mode: 'RealWorld' | 'UpsideDown';
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Map each letter to a customized light bulb color
const BULB_COLORS = [
  'text-rose-500 bg-rose-500 shadow-rose-500',
  'text-yellow-500 bg-yellow-500 shadow-yellow-500',
  'text-green-500 bg-green-500 shadow-green-500',
  'text-blue-500 bg-blue-500 shadow-blue-500',
  'text-violet-500 bg-violet-500 shadow-violet-500',
];

export default function ContactSection({ mode }: ContactSectionProps) {
  // Christmas alphabetic wall states
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [customWord, setCustomWord] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeLog, setDecodeLog] = useState('WALL DECODER IDLE.');

  // Official Lab Form states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLog, setSubmitLog] = useState<string[]>([]);
  const [displayLogs, setDisplayLogs] = useState(false);

  // Sound generator helpers
  const playFlashTick = (freqValue = 600, duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.frequency.setValueAtTime(freqValue, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.type = 'triangle';
      osc.start();
      osc.stop(audioCtx.currentTime + duration + 0.05);
    } catch (e) {
      // browser audio context limitations
    }
  };

  // Click individual alphabet letter
  const handleLetterClick = (letter: string) => {
    if (isDecoding) return;
    setActiveLetter(letter);
    playFlashTick(500 + letter.charCodeAt(0) * 2, 0.15);
    
    setTimeout(() => {
      setActiveLetter(null);
    }, 4500);
  };

  // Decode whole word automatically
  const handleDecodeTransmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isDecoding || !customWord.trim()) return;

    const parsedWord = customWord.toUpperCase().replace(/[^A-Z\s]/g, '');
    if (!parsedWord) {
      setDecodeLog('ERROR: INVALID VOID COEFFICIENT CHARACTERSET.');
      return;
    }

    setIsDecoding(true);
    setDecodeLog('ESTABLISHING QUANTUM LINK...');
    
    // Play intense surge hum
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(280, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (_) {}

    // Flash letter-by-letter
    for (let i = 0; i < parsedWord.length; i++) {
      const char = parsedWord[i];
      if (char === ' ') {
        setDecodeLog('PUNCTUATING VACANT GAP...');
        await new Promise((r) => setTimeout(r, 600));
        continue;
      }

      setDecodeLog(`TRANSMITTING SYMBOL: "${char}"`);
      setActiveLetter(char);
      playFlashTick(450, 0.25);
      
      // Delay illuminated
      await new Promise((r) => setTimeout(r, 700));
      setActiveLetter(null);
      // Gap between bulbs
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsDecoding(false);
    setDecodeLog('TRANSMISSION EXECUTED SECURELY TO THE UPSIDE DOWN.');
    setCustomWord('');
  };

  // Encrypt Contact form
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setDisplayLogs(true);
    setSubmitLog(['AUTHENTICATING CREDENTIALS SUBJECT...', 'ESTABLISHING SECURE PORTAL CHANNEL...']);

    // Log feedback cascade simulator
    const steps = [
      'PACKAGING TRANSMISSIONS DATASET...',
      'ENCRYPTING TELEMETRY ENTRANCE CODES...',
      'BYPASSING COLD SHIELD COMPARTMENTS...',
      'DATA INGESTION COMMITTED TO SERVER ARCHIVE!',
      'REPORT CONFIRMED. OUTLET PORT: 3000 OPEN.'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSubmitLog((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSubmitting(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
          // Clear log display in 5s
          setTimeout(() => setDisplayLogs(false), 5000);
        }
      }, (idx + 1) * 850);
    });
  };

  return (
    <section id="contact-laboratory" className="relative py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Absolute Wood-Panel wallpaper framing for Christmas alphabet section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        
        {/* Left Column: Christmas Alphabet Interactive Wall (6 columns) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-3 mb-6">
            <span className={`font-mono text-xs uppercase tracking-[0.25em] flex items-center gap-1.5 ${
              mode === 'UpsideDown' ? 'text-red-500 font-bold' : 'text-blue-400'
            }`}>
              <Lightbulb className="w-3.5 h-3.5" /> CHRISTMAS LIGHTS RF_LINK
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-extrabold uppercase tracking-wider leading-none">
              The Alphabet Wall
            </h3>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              JOYCE BYERS\' COMMUNICATOR GATEWAY. SEQUENCE-SPELL ANY WORDS (E.G. &quot;RUN&quot;, &quot;HELP&quot;) IN THE BOX OR CLICK LETTERS DIRECTLY.
            </p>
          </div>

          {/* Graphical Christmas Alphabet Board */}
          <div className="relative p-6 rounded-xl border border-amber-900/30 bg-[#160c04] shadow-[0_15px_45px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-center min-h-[340px] border-b-8 border-amber-950">
            {/* Christmas alphabet drawn wallpaper lines */}
            <div className="absolute inset-x-0 h-[1px] bg-amber-900/10 top-1/3" />
            <div className="absolute inset-x-0 h-[1px] bg-amber-900/10 top-2/3" />

            {/* Christmas Letters board rendering */}
            <div className="grid grid-cols-7 gap-y-12 gap-x-3 sm:gap-x-4 relative z-10 select-none">
              {ALPHABET.map((char, index) => {
                const isLit = activeLetter === char;
                // Distribute colors across the list
                const colorIdx = index % BULB_COLORS.length;
                const bulbColorClasses = BULB_COLORS[colorIdx];

                return (
                  <div
                    key={char}
                    id={`alphabet-bulb-${char.toLowerCase()}`}
                    onClick={() => handleLetterClick(char)}
                    className="flex flex-col items-center justify-center cursor-pointer group"
                  >
                    {/* Glowing colorful bulb above letter */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-t border-zinc-500/30 shadow-2xl transition-all duration-300 relative ${
                        isLit
                          ? `${bulbColorClasses.split(' ')[1]} ${bulbColorClasses.split(' ')[2]} ring-4 ring-offset-2 ring-offset-black scale-135 z-20`
                          : 'bg-zinc-800/80 hover:bg-zinc-700'
                      }`}
                    >
                      {/* Little filament wire inside it */}
                      <div className={`absolute top-0 w-full text-center text-[5px] font-bold ${
                        isLit ? 'text-black' : 'text-zinc-600'
                      }`}>
                        ☼
                      </div>
                    </div>

                    {/* Letter drawn on wall under the bulb */}
                    <span
                      className={`text-2xl sm:text-3xl font-serif font-extrabold mt-1.5 font-outline tracking-wider select-none ${
                        isLit
                          ? `${bulbColorClasses.split('0')[0]}0 shadow-[0_0_12px_rgba(255,255,255,0.2)] scale-110 font-black`
                          : 'text-zinc-500'
                      }`}
                    >
                      {char}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Autoplay Transmitter Box form */}
          <form onSubmit={handleDecodeTransmit} className="mt-5 flex gap-3">
            <input
              type="text"
              id="alphabet-portal-input"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              placeholder="Spell message (e.g. HELP)"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 font-mono text-xs placeholder:text-zinc-600 outline-none text-zinc-100 focus:border-zinc-700 transition"
              disabled={isDecoding}
              maxLength={15}
            />
            <button
              type="submit"
              id="alphabet-transmit-btn"
              disabled={isDecoding || !customWord.trim()}
              className={`px-5 py-3 rounded font-mono text-xs uppercase font-extrabold tracking-wider transition-all cursor-pointer ${
                isDecoding
                  ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                  : mode === 'UpsideDown'
                    ? 'bg-red-600 border border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:bg-red-700'
                    : 'bg-blue-500 border border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-blue-600'
              }`}
            >
              TRANSMIT
            </button>
          </form>

          {/* Decoder Logger Status */}
          <div className="mt-2.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500 flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isDecoding ? 'bg-red-600 animate-ping' : 'bg-zinc-700'}`} />
            <span>DECODER_OUT: {decodeLog}</span>
          </div>

        </div>

        {/* Right Column: Retro Hawkins Haboratory Terminal form (6 columns) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-3 mb-6">
            <span className="font-mono text-xs text-red-500 uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> SECURE LAB DATABASE INGESTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-extrabold uppercase tracking-wider leading-none">
              Lab Transmission
            </h3>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              SUBMIT A ENCRYPTED REPORT DIRECTLY TO THE HAWKINS DEPARTMENT OF ENERGY. AGENTS WILL DECRYPT TOKENS IMMEDIATELY.
            </p>
          </div>

          {/* Lab Terminal Card with terminal screen backdrop asset */}
          <div
            id="lab-contact-terminal"
            className="rounded-xl border border-zinc-900 overflow-hidden shadow-2xl relative bg-zinc-950/80 backdrop-blur-md p-6 sm:p-8"
          >
            {/* Background screen monitor glow */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
              style={{ backgroundImage: `url(${imgTerminal})` }}
            />

            {/* Glowing bezel and border decoration */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600/10 via-red-600 to-red-600/10" />

            <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="agent-name-input" className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                    Agent Name / Call Sign
                  </label>
                  <input
                    type="text"
                    id="agent-name-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Agent Wheeler"
                    required
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2.5 font-mono text-xs text-zinc-100 outline-none focus:border-zinc-700 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="agent-cred-input" className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                    SECURE CALL SIGN (EMAIL)
                  </label>
                  <input
                    type="email"
                    id="agent-cred-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.g. wheeler@doe.gov"
                    required
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2.5 font-mono text-xs text-zinc-100 outline-none focus:border-zinc-700 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="agent-subject-input" className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                  Ingestion Subject Token
                </label>
                <input
                  type="text"
                  id="agent-subject-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="E.g. Electromagnetic Resonance Shifter"
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2.5 font-mono text-xs text-zinc-100 outline-none focus:border-zinc-700 transition"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="agent-message-input" className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                  Ingestion Transmission Log Body
                </label>
                <textarea
                  id="agent-message-input"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Record transmission parameters clearly..."
                  required
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-3 py-2.5 font-mono text-xs text-zinc-100 outline-none focus:border-zinc-700 transition resize-none"
                />
              </div>

              <button
                type="submit"
                id="encrypt-submit-btn"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-extrabold tracking-widest border border-red-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.25)]"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'ENCRYPTING PACKET...' : 'ENCRYPT & TRANSMIT REPORT'}
              </button>
            </form>

            {/* Ingestion logging interface */}
            <AnimatePresence>
              {displayLogs && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 border-t border-zinc-900 pt-4 font-mono text-[10px] text-emerald-400 space-y-1 selection:bg-emerald-950"
                  id="terminal-transmitting-logs"
                >
                  <div className="flex items-center gap-1.5 mb-1 bg-emerald-950/30 p-2.5 border border-emerald-900/30 text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" /> CONFIRMED_SECURE_INGESTION_TUNNEL_001
                  </div>
                  {submitLog.map((log, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-zinc-600">{`>`}</span>
                      <span className="truncate">{log}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
