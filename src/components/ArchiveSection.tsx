import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Skull, 
  MapPin, 
  Calendar, 
  Radio, 
  Flame, 
  ShieldAlert, 
  Layers, 
  User, 
  Info, 
  Eye, 
  Zap, 
  Tv, 
  Sparkles,
  HelpCircle,
  Minimize2,
  Maximize2,
  Activity,
  GitCommit,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ArchiveSectionProps {
  mode: 'RealWorld' | 'UpsideDown';
  setMode?: (mode: 'RealWorld' | 'UpsideDown') => void;
}

// ----------------------------------------------------
// Data Structure for the Timeline Module
// ----------------------------------------------------
interface TimelineYear {
  year: string;
  season: string;
  title: string;
  villain: string;
  importantLocations: string[];
  majorEvents: string[];
  characterDevelopments: string[];
  colorGrade: string; // Tailwind class
  accentColor: string; // Hex color
  imagery: string; // Unsplash reference themed for that season
}

const TIMELINE_DATA: TimelineYear[] = [
  {
    year: '1983',
    season: 'Season 1',
    title: 'The Vanishing of Will Byers',
    villain: 'The Demogorgon (Subject No. 1)',
    importantLocations: ['Hawkins Lab', 'Mirkwood Forest', 'Byers House', 'Wheeler Basement'],
    majorEvents: [
      'Will Byers disappears near Mirkwood Bypass.',
      'Eleven escapes secret government confinement.',
      'Joyce Byers paints communication light bulbs on her living room wall.',
      'The boys find Eleven and discover her telekinetic powers.'
    ],
    characterDevelopments: [
      'Eleven learns the meaning of "Friends don\'t lie".',
      'Mike Wheeler emerges as the emotional core of the party.',
      'Nancy Wheeler ditches her perfect-girl schema to search for Barb.'
    ],
    colorGrade: 'from-blue-950 via-zinc-950 to-black',
    accentColor: '#3b82f6',
    imagery: '/images/archive/season1.png'
  },
  {
    year: '1984',
    season: 'Season 2',
    title: 'The Gate & The Spy',
    villain: 'The Mind Flayer (Shadow Monster)',
    importantLocations: ['Palace Arcade', 'Pumpkin Patch tunnels', 'Hopper\'s Cabin', 'Hawkins Lab'],
    majorEvents: [
      'Will suffers post-traumatic visions of a massive shadow spider in the crimson sky.',
      'Dustin discovers and adopts D\'Artagnan, a baby Demodog.',
      'Dr. Owens takes charge of containment at Hawkins National Laboratory.',
      'Eleven travels to Chicago, unlocking the deeper potential of her psychic rage.'
    ],
    characterDevelopments: [
      'Steve Harrington transforms into the ultimate protective babysitter.',
      'Max Mayfield arrives in Hawkins, stirring curiosity and rivalry.',
      'Jim Hopper adopts Eleven under federal quarantine protection.'
    ],
    colorGrade: 'from-purple-950 via-zinc-950 to-black',
    accentColor: '#a855f7',
    imagery: '/images/archive/season2.png'
  },
  {
    year: '1985',
    season: 'Season 3',
    title: 'The Battle of Starcourt',
    villain: 'The Spider Monster & Soviet Operatives',
    importantLocations: ['Starcourt Mall', 'Scoops Ahoy Parlor', 'Brimborn Steel Works', 'Russian Bunker'],
    majorEvents: [
      'Starcourt Mall consolidates tourist traffic, acting as a facade for a deep Soviet drilling installation.',
      'Billy Hargrove is possessed by the Flayed hive mind in the industrial ruins.',
      'Robin, Steve, and Dustin intercept secret Russian military radio signals.',
      'The final battle tears Starcourt apart, burning the flayed beast in a spectacular fireworks clash.'
    ],
    characterDevelopments: [
      'Robin Buckley comes out to Steve, sealing a legendary friendship.',
      'Billy Hargrove sacrifices his life to save Eleven from the monster.',
      'Joyce and Hopper team up to overload the Soviet key machine.'
    ],
    colorGrade: 'from-[#1a0a2a] via-zinc-950 to-black',
    accentColor: '#ec4899',
    imagery: '/images/archive/season3.png'
  },
  {
    year: '1986',
    season: 'Season 4',
    title: 'The Curse of Vecna',
    villain: 'Vecna (Henry Creel / One)',
    importantLocations: ['Creel House', 'Hawkins High Gym', 'Kamchatka Prison', 'The Creel Attic'],
    majorEvents: [
      'Chrissy Cunningham and other students suffer tragic, contorted executions.',
      'Eddie Munson of the Hellfire Club goes on the run, framed by suburban panic.',
      'Max listens to "Running Up That Hill" to escape Vecna\'s dark mind choke.',
      'The gang infiltrates Creel House simultaneously across two dimensional planes.',
      'Eddie performs a legendary guitar solo on the trailer roof in the Upside Down.'
    ],
    characterDevelopments: [
      'Max Mayfield battles deep trauma and survivor guilt with heroic bravery.',
      'Eddie Munson becomes the tragic, non-conforming hero who doesn\'t run.',
      'Dustin bears the immense weight of witnessing his mentor\'s final stand.'
    ],
    colorGrade: 'from-red-950 via-zinc-950 to-black',
    accentColor: '#ef4444',
    imagery: '/images/archive/season4.png'
  },
  {
    year: '1987',
    season: 'Season 5',
    title: 'The Final Confrontation',
    villain: 'The Final Merged Shadow Reality',
    importantLocations: ['Hawkins Downtown Ruins', 'Deep Rift Boundary', 'The Floating Fortress'],
    majorEvents: [
      'The giant rifts torn through central Hawkins expand, merging our world with the decaying landscape.',
      'The military evacuates local citizens under strict biological containment rules.',
      'The combined party orchestrates a ultimate assault to sever the Mind Flayer\'s root core once and for all.',
      'Eleven and One duel in a psychic reality collage of memory and sheer willpower.'
    ],
    characterDevelopments: [
      'The original party reunites, fighting side-by-side as they did in the basement.',
      'Eleven achieves absolute integration of her past, mastering her human identity.',
      'Hawkins heals as the portal seals, leaving behind a legendary resilient legacy.'
    ],
    colorGrade: 'from-amber-950 via-zinc-950 to-black',
    accentColor: '#f59e0b',
    imagery: '/images/archive/season5.png'
  }
];

// ----------------------------------------------------
// Data for the Interactive Map Module
// ----------------------------------------------------
interface MapLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage offsets for clean responsive placement
  dangerLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SECURE';
  dangerClass: string; // colors
  description: string;
  surveillanceFile: string;
  sensorFrequency: string;
  intelNotes: string;
  image: string;
}

const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'loc-lab',
    name: 'Hawkins National Laboratory',
    coordinates: { x: 74, y: 35 },
    dangerLevel: 'CRITICAL',
    dangerClass: 'text-red-500 border-red-500 shadow-red-950',
    description: 'The classified, high-security federal installation where Dr. Martin Brenner conducted psychoenergetic research. Ground zero for the original 1983 Dimensional Rift.',
    surveillanceFile: 'DOE-HAW-LAB-83',
    sensorFrequency: '432.88 MHz',
    intelNotes: 'Rift gate sealed of concrete but electromagnetic noise leakage continues in Sub-Level 4. Highly contaminated by spores.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-creel',
    name: 'The Creel House',
    coordinates: { x: 22, y: 72 },
    dangerLevel: 'CRITICAL',
    dangerClass: 'text-red-500 border-red-500 shadow-red-955',
    description: 'An abandoned Victorian residence on the outskirts of Hawkins with a horrific, cursed history. The focal staging point of Vecna\'s modern real-world anchor gates.',
    surveillanceFile: 'CREEL-RES-86',
    sensorFrequency: '911.04 MHz',
    intelNotes: 'Grandfather clock chiming is audited on radio bands at precise intervals. Direct psychic transmission node confirmed.',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-upside-gate',
    name: 'The Mother Gate Bypass',
    coordinates: { x: 50, y: 50 },
    dangerLevel: 'CRITICAL',
    dangerClass: 'text-red-500 shadow-[0_0_20px_#ef4444]',
    description: 'The monumental tear in the fabric of spacetime, located directly underneath Hawkins Lab, stretching down deep corridors. It anchors the collective hivemind network.',
    surveillanceFile: 'RIFT-MAIN-STABLE',
    sensorFrequency: '1004.22 MHz',
    intelNotes: 'Magnetic fields fluctuate wildly. Spores are actively breeding outside the containment shield.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-mall',
    name: 'Starcourt Mall',
    coordinates: { x: 80, y: 65 },
    dangerLevel: 'HIGH',
    dangerClass: 'text-orange-500 border-orange-500 shadow-orange-950',
    description: 'The glamorous commercial shopping mall built in 1985 to cover a secret Soviet fortress constructed deep inside Hawkins bedrock to pry open the Rift.',
    surveillanceFile: 'MALL-SOVIET-KEY',
    sensorFrequency: '108.90 MHz',
    intelNotes: 'Ruined structure is under state guard. Industrial concrete sealing hides massive structural damage from spider aberration.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-wheeler',
    name: 'The Wheeler Residence',
    coordinates: { x: 38, y: 38 },
    dangerLevel: 'SECURE',
    dangerClass: 'text-emerald-500 border-emerald-500 shadow-emerald-950',
    description: 'A cozy house on Maple Street. The wood-paneled walkout basement served as the literal tactical command post for Mike, Dustin, Lucas, and Will throughout their campaigns.',
    surveillanceFile: 'WHL-HOME-BASE',
    sensorFrequency: '462.56 MHz (Ch.14)',
    intelNotes: 'TRC-12 shortwave radio setups monitored regularly. Safe house, though occasionally monitored by surveillance sedans.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-byers',
    name: 'The Byers House',
    coordinates: { x: 90, y: 20 },
    dangerLevel: 'HIGH',
    dangerClass: 'text-orange-500 border-orange-500 shadow-orange-950',
    description: 'A modest, dilapidated woodland cottage outside the central grid. Site of Joyce Byers\' Christmas light communication matrix and multiple dimensional breaches.',
    surveillanceFile: 'BYR-WOOD-BYPASS',
    sensorFrequency: '27.12 MHz',
    intelNotes: 'High magnetic disturbances on telephone wires. House is empty, though wall structures show residue of organic decay particles.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-hopper',
    name: 'Hopper\'s Forest Cabin',
    coordinates: { x: 58, y: 80 },
    dangerLevel: 'MEDIUM',
    dangerClass: 'text-blue-400 border-blue-400 shadow-blue-950',
    description: 'Tucked deep in the state park forest bypass. A heavily fortified structure where Jim Hopper raised and protected Eleven during her months of isolation.',
    surveillanceFile: 'HOP-CABIN-SEC',
    sensorFrequency: '462.65 MHz',
    intelNotes: 'Equipped with tripwire alarms and lead-lined insulation walls. High structural privacy index.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-high',
    name: 'Hawkins High School',
    coordinates: { x: 45, y: 22 },
    dangerLevel: 'MEDIUM',
    dangerClass: 'text-blue-400 border-blue-400 shadow-blue-950',
    description: 'The local high school, housing the Tigers gym and sensory deprivation facilities constructed inside the swimming pool area to amplify Eleven.',
    surveillanceFile: 'SCH-HAW-TIGERS',
    sensorFrequency: '88.30 MHz',
    intelNotes: 'Site of multiple team clashes. Science classrooms contain chemicals of significant utility index (sodium chloride compounds).',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'loc-hellfire',
    name: 'The Hellfire Club Attic/Basement',
    coordinates: { x: 28, y: 15 },
    dangerLevel: 'MEDIUM',
    dangerClass: 'text-blue-400 border-blue-400 shadow-blue-950',
    description: 'The unauthorized D&D gaming sanctuary chaired by Eddie Munson, where young outcasts simulated high-fantasy tabletop warfare while real threats loomed below.',
    surveillanceFile: 'CLUB-HELLFIRE-86',
    sensorFrequency: '20.00 MHz',
    intelNotes: 'Outcast assembly point. Subjected to local vigilante sweeps. Extreme levels of polyhedral dice clusters recorded.',
    image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=400'
  }
];

export default function ArchiveSection({ mode, setMode }: ArchiveSectionProps) {
  // Global States
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(3); // Default to Season 4
  const [selectedMapLoc, setSelectedMapLoc] = useState<MapLocation>(MAP_LOCATIONS[0]);
  const [portalActive, setPortalActive] = useState(mode === 'UpsideDown');
  const [vhsEffect, setVhsEffect] = useState(true);
  const [activeTab, setActiveTab ] = useState<'timeline' | 'map' | 'portal'>('timeline');

  // Interactive Oscilloscope frequency animation helper
  const [freqSweep, setFreqSweep] = useState(432);

  // Portal Interaction States
  const [sporeCount, setSporeCount] = useState<Array<{ id: number; left: number; top: number; size: number; duration: number; delay: number }>>([]);
  const pulseAudioRef = useRef<AudioContext | null>(null);

  // Synchronize state with outer dimensional mode changes
  useEffect(() => {
    setPortalActive(mode === 'UpsideDown');
  }, [mode]);

  // Generate synthetic random spores once portal coordinates update
  useEffect(() => {
    const spores = Array.from({ length: 45 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5
    }));
    setSporeCount(spores);
  }, []);

  // Play creepy synthesizer drone sound when switching pages or turning on Portal
  const playCursedDrone = (isOn: boolean) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      if (isOn) {
        osc.frequency.setValueAtTime(65, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      } else {
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch(e) {}
  };

  const handlePortalToggle = () => {
    const nextPortalState = !portalActive;
    setPortalActive(nextPortalState);
    playCursedDrone(nextPortalState);
    if (setMode) {
      setMode(nextPortalState ? 'UpsideDown' : 'RealWorld');
    }
  };

  return (
    <section id="intelligence-archive-section" className="relative py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Immersive Scope Custom Styles */}
      <style>{`
        @keyframes drift-slow {
          0% { transform: translateY(100%) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-30%) translateX(15px); opacity: 0; }
        }
        @keyframes lightning-flash {
          0%, 94%, 98%, 100% { opacity: 0; }
          95%, 97% { opacity: 0.15; }
        }
        .animate-spore {
          animation: drift-slow linear infinite;
        }
        .lightning-overlay {
          animation: lightning-flash 7s infinite;
        }
        .archive-neon-glow {
          text-shadow: 0 0 10px rgba(226, 29, 38, 0.4), 0 0 20px rgba(226, 29, 38, 0.2);
        }
        .map-line-dashed {
          background-image: linear-gradient(to right, rgba(239, 68, 68, 0.3) 50%, transparent 50%);
          background-size: 15px 1px;
        }
        .vhs-lines-overlay {
          pointer-events: none;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.22) 50%
          );
          background-size: 100% 4px;
        }
        .screen-glass-grid {
          background-image: 
            linear-gradient(to right, rgba(239, 68, 68, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.02) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      {/* Global Grain & Scanlines */}
      <div className="absolute inset-0 vhs-lines-overlay z-[1] opacity-75 pointer-events-none" />
      <div className="absolute inset-0 screen-glass-grid z-[1] pointer-events-none" />

      {/* Portal Active Chilling Atmosphere distortion */}
      <AnimatePresence>
        {portalActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/15 mix-blend-color-burn z-30 pointer-events-none"
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <div className="text-center space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-950/20 border border-red-900/60 rounded px-3 py-1">
          <span className="w-1.5 h-1.5 bg-red-650 rounded-full animate-ping" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 font-black">
            UNITED STATES DEPARTMENT OF ENERGY // CLASSIFIED ACCESS LEVEL 5
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-black uppercase tracking-widest leading-none">
          HAWKINS <span className="text-red-650 archive-neon-glow">INTELLIGENCE</span> ARCHIVE
        </h2>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-400 font-mono tracking-wide leading-relaxed">
          COMBINED SECTOR INTELLIGENCE REPORT. MONITORED ELECTROMAGNETIC RIFT PHASES, GEOGRAPHIC TARGETS, AND TRANS-DIMENSIONAL PORT DATA SHEETS.
        </p>

        {/* Tactical View mode select */}
        <div className="max-w-3xl mx-auto flex justify-center pt-4">
          <div className="inline-flex p-1.5 bg-zinc-950/95 border border-zinc-900 rounded-xl max-w-full overflow-x-auto gap-2">
            
            <button
              id="archive-tab-timeline-btn"
              onClick={() => { setActiveTab('timeline'); playCursedDrone(false); }}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-red-950/30 text-red-400 border border-red-900/70 shadow-[0_0_12px_rgba(220,38,38,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              1. Project Timeline
            </button>

            <button
              id="archive-tab-map-btn"
              onClick={() => { setActiveTab('map'); playCursedDrone(false); }}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-red-950/30 text-red-400 border border-red-900/70 shadow-[0_0_12px_rgba(220,38,38,0.3)] font-black'
                  : 'text-zinc-500 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              2. Interactive Hawkins Map
            </button>

            <button
              id="archive-tab-portal-btn"
              onClick={() => { setActiveTab('portal'); playCursedDrone(true); }}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'portal'
                  ? 'bg-red-950/50 text-red-500 border border-red-650/80 shadow-[0_0_20px_rgba(220,38,38,0.5)] font-black'
                  : 'text-zinc-500 hover:text-red-400/90 border border-transparent'
              }`}
            >
              <Skull className="w-3.5 h-3.5 animate-pulse" />
              3. Portal Chamber Experience
            </button>

          </div>
        </div>
      </div>

      {/* Main Core Widgets switcher */}
      <div className="relative z-20">
        <AnimatePresence mode="wait">
          
          {/* ==================================================== */}
          {/* 1. INTERACTIVE STRANGER THINGS SEASONAL TIMELINE    */}
          {/* ==================================================== */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline-widget-module"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="space-y-8"
            >
              {/* Header inside the timeline */}
              <div className="bg-[#0b0b0e] border border-zinc-900 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#E21D26] font-bold">MONITORED INCIDENT LOGS</span>
                  <h3 className="text-xl font-serif text-zinc-100 uppercase font-black tracking-wider">HAWKINS DECOHERENCE CHRONOLOGY</h3>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5">
                  {TIMELINE_DATA.map((t, idx) => (
                    <button
                      key={t.year}
                      onClick={() => { setActiveTimelineIdx(idx); playCursedDrone(false); }}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase border tracking-widest rounded-md cursor-pointer transition-all duration-300 ${
                        activeTimelineIdx === idx
                          ? 'bg-red-950/30 border-[#E21D26] text-[#E21D26] font-black shadow-[0_0_10px_rgba(226,29,38,0.25)]'
                          : 'bg-zinc-950/80 border-zinc-900 text-zinc-500 hover:text-zinc-200'
                      }`}
                    >
                      {t.year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Horizontal Step Line display */}
              <div className="hidden md:flex justify-between items-center relative py-6 px-10 bg-zinc-950/80 rounded-xl border border-zinc-900/40">
                <div className="absolute h-0.5 inset-x-20 bg-zinc-900 z-0" />
                <div 
                  className="absolute h-0.5 left-20 bg-gradient-to-r from-red-650 to-red-500 z-0 transition-all duration-700" 
                  style={{ width: `${(activeTimelineIdx / (TIMELINE_DATA.length - 1)) * 75}%` }}
                />

                {TIMELINE_DATA.map((t, idx) => {
                  const isActive = idx === activeTimelineIdx;
                  return (
                    <div 
                      key={t.year} 
                      className="relative z-10 flex flex-col items-center cursor-pointer group"
                      onClick={() => setActiveTimelineIdx(idx)}
                    >
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.25 : 1,
                          borderColor: isActive ? '#ef4444' : '#27272a'
                        }}
                        className={`w-10 h-10 rounded-full bg-black border-2 flex items-center justify-center transition-all ${
                          isActive ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'group-hover:border-zinc-700'
                        }`}
                      >
                        <span className={`font-mono text-xs font-black ${isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                          0{idx + 1}
                        </span>
                      </motion.div>
                      <span className={`font-mono text-[9px] uppercase tracking-wider mt-2.5 transition-colors ${isActive ? 'text-red-400 font-black' : 'text-zinc-600'}`}>
                        {t.season}
                      </span>
                      <span className="font-serif text-[10px] text-zinc-400/80">{t.year}</span>
                    </div>
                  );
                })}
              </div>

              {/* Active Season Information Card Visual */}
              {(() => {
                const s = TIMELINE_DATA[activeTimelineIdx];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#040406] rounded-2xl border border-zinc-900/60 overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                    
                    {/* Background tint based on colorGrade */}
                    <div className={`absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-transparent via-red-650 to-transparent`} />
                    
                    {/* Left: Cinematic Cinematic Display Media */}
                    <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[300px] bg-black overflow-hidden group select-none">
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#040406] via-transparent to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-red-950/15 mix-blend-color-burn z-10 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 z-20 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E21D26] font-black bg-black/80 border border-zinc-850 px-2 py-0.5 rounded">
                          SIGNAL ACTIVE // {s.year}
                        </span>
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{s.season}</h4>
                      </div>

                      <img
                        src={s.imagery}
                        alt={s.season}
                        className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-108 filter contrast-110 saturate-75 brightness-75"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Right: Technical dossier grid information */}
                    <div className="lg:col-span-8 p-6 lg:p-8 space-y-6 flex flex-col justify-between">
                      
                      {/* Top Header */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#E21D26] font-bold">
                            // PRIMARY THREAT RECORDING
                          </span>
                          <span className="font-mono text-[10px] uppercase text-zinc-500">HAW-CHRON-{s.year}</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-serif text-white font-black uppercase tracking-wider">
                          {s.title}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/15 border border-red-950 text-red-500 rounded text-xs font-mono">
                          <Skull className="w-4 h-4 animate-pulse" />
                          <span>PRIMARY ADVERSARY: <span className="font-black uppercase tracking-widest font-sans">{s.villain}</span></span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Major story events */}
                        <div className="space-y-3 bg-zinc-950/65 p-4 rounded-xl border border-zinc-900/50">
                          <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 font-extrabold flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                            <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            MAJOR DECOHERENCE INCIDENTS
                          </h4>
                          <ul className="space-y-2.5">
                            {s.majorEvents.map((evt, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-[#E21D26] rounded-full flex-shrink-0 mt-1" />
                                <span>{evt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Character Developments */}
                        <div className="space-y-3 bg-zinc-950/65 p-4 rounded-xl border border-zinc-900/50">
                          <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 font-extrabold flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                            <User className="w-3.5 h-3.5 text-red-500" />
                            INTEL LOGS // CHARACTER PATH
                          </h4>
                          <ul className="space-y-2.5">
                            {s.characterDevelopments.map((char, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full flex-shrink-0 mt-1" />
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Important locations metadata */}
                      <div className="pt-4 border-t border-zinc-900/60 flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono text-zinc-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          <span>KEY CONFLICT GEOMETRIES:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {s.importantLocations.map((loc) => (
                              <span key={loc} className="px-2 py-0.5 bg-zinc-900 rounded text-zinc-300 text-[8px] uppercase">
                                {loc}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="uppercase text-[8px] tracking-wider text-red-750">RECORDING_STAINLESS_REEL</span>
                      </div>

                    </div>
                  </div>
                );
              })()}

            </motion.div>
          )}

          {/* ==================================================== */}
          {/* 2. INTERACTIVE HAWKINS BLUEPRINT INTELLIGENCE MAP   */}
          {/* ==================================================== */}
          {activeTab === 'map' && (
            <motion.div
              key="map-widget-module"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Side: Tactile Blueprint Map Canvas (7 cols) */}
              <div className="lg:col-span-7 bg-[#050508] border border-zinc-900 rounded-2xl p-4 space-y-4 relative overflow-hidden shadow-2xl">
                
                {/* Vintage Map header stamp */}
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 uppercase pb-2 border-b border-zinc-900/60">
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span>SIGNAL SCANNER GRID: ACTIVE</span>
                  </div>
                  <span>SCALE: 1:24,000 // DEPT_ENERGY</span>
                </div>

                {/* Main Map Container Box */}
                <div className="relative aspect-[4/3] w-full rounded-lg border border-zinc-900 bg-black overflow-hidden group select-none">
                  
                  {/* Decorative Blueprint Vector Circle and Lines */}
                  <div className="absolute inset-0 border border-zinc-900/30 flex items-center justify-center pointer-events-none">
                    <div className="w-[180px] h-[180px] rounded-full border border-zinc-900 flex items-center justify-center" />
                    <div className="w-[380px] h-[380px] rounded-full border border-dashed border-red-950/10 flex items-center justify-center" />
                    <div className="absolute w-full h-px bg-zinc-900/30" />
                    <div className="absolute h-full w-px bg-zinc-900/30" />
                  </div>

                  {/* Decorative diagonal alignment bypass markers */}
                  <div className="absolute left-6 top-6 text-[8px] font-mono text-zinc-700 tracking-widest uppercase">
                    SECTOR_NW // A80
                  </div>
                  <div className="absolute right-6 bottom-6 text-[8px] font-mono text-zinc-700 tracking-widest uppercase text-right">
                    SECTOR_SE // E11
                  </div>

                  {/* Pulsant RED Gateway Ring in center representing Upside Down Rift */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-red-550/10 bg-radial-gradient from-red-900/5 via-transparent to-transparent pointer-events-none animate-pulse" />

                  {/* Dynamic interactive coordinate lines pointing to selectedMapLoc */}
                  <div 
                    className="absolute h-px border-t border-dashed border-red-700/20 pointer-events-none transition-all duration-500"
                    style={{ 
                      top: `${selectedMapLoc.coordinates.y}%`, 
                      left: 0, 
                      right: 0 
                    }}
                  />
                  <div 
                    className="absolute w-px border-l border-dashed border-red-700/20 pointer-events-none transition-all duration-500"
                    style={{ 
                      left: `${selectedMapLoc.coordinates.x}%`, 
                      top: 0, 
                      bottom: 0 
                    }}
                  />

                  {/* Interactive Map Pin Node Markers */}
                  {MAP_LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedMapLoc.id;
                    const isCritical = loc.dangerLevel === 'CRITICAL';
                    return (
                      <button
                        key={loc.id}
                        onClick={() => { setSelectedMapLoc(loc); playCursedDrone(false); }}
                        className="absolute group/pin -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20"
                        style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                      >
                        {/* Glowing ring under critical/high danger locations */}
                        <span className={`absolute -inset-3 rounded-full blur-sm transition-all duration-300 ${
                          isSelected 
                            ? 'bg-red-650/20' 
                            : 'bg-transparent group-hover/pin:bg-red-950/15'
                        }`} />

                        {/* Real-time pulse animation for active nodes */}
                        {isCritical && (
                          <span className="absolute -inset-2.5 rounded-full border border-red-650/40 animate-ping opacity-75 pointer-events-none" />
                        )}

                        {/* Interactive Dot */}
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 relative ${
                          isSelected
                            ? 'bg-red-550 border-white scale-125 shadow-[0_0_12px_rgba(239,68,68,0.7)]'
                            : isCritical
                              ? 'bg-black border-red-650 text-red-500 group-hover/pin:bg-red-950'
                              : 'bg-black border-zinc-700 text-zinc-400 group-hover/pin:border-zinc-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-black' : 'bg-current'}`} />
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-5 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-black/95 text-white text-[8px] font-mono tracking-widest uppercase border border-zinc-800 rounded py-0.5 px-2 whitespace-nowrap z-30 pointer-events-none">
                          {loc.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-level console diagnostic oscilloscope */}
                <div className="bg-[#020204] border border-zinc-900 rounded-xl p-3 flex flex-col justify-between sm:flex-row items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                    <span className="text-[10px] uppercase">Rift Frequency Decoupler:</span>
                    <span className="text-zinc-200 font-bold">{selectedMapLoc.sensorFrequency}</span>
                  </div>
                  <div className="text-[9px] text-[#E21D26] uppercase animate-pulse">
                    CURRENT HAZARD CODE: {selectedMapLoc.dangerLevel}_LEVEL_ALERT
                  </div>
                </div>

              </div>

              {/* Right Side: Map Location dossier sheet card (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6 relative">
                
                {/* Visual grid watermark inside container */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/5 via-transparent to-transparent pointer-events-none" />

                {/* Title and Hazard Grade status */}
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span>SECTOR_LOG: {selectedMapLoc.surveillanceFile}</span>
                    <span className={`px-2.5 py-0.5 rounded border border-current font-black tracking-widest text-[8px] ${selectedMapLoc.dangerClass}`}>
                      {selectedMapLoc.dangerLevel} THREAT
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E21D26] font-extrabold block">
                      SURVEILLANCE DOSSIER
                    </span>
                    <h3 className="text-2xl font-serif text-white uppercase font-black tracking-wider leading-none">
                      {selectedMapLoc.name}
                    </h3>
                  </div>
                </div>

                {/* Real photo display */}
                <div className="relative aspect-video rounded-lg border border-zinc-900 overflow-hidden group select-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent z-10" />
                  <img
                    src={selectedMapLoc.image}
                    alt={selectedMapLoc.name}
                    className="w-full h-full object-cover filter brightness-90 saturate-75 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-zinc-400 z-20">
                    REALTIME_SURVEILLANCE_STREAM
                  </div>
                </div>

                {/* Descriptions details text */}
                <div className="space-y-4 text-xs tracking-normal relative z-10 leading-relaxed">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-widest">// GEOGRAPHIC SITE RECORD</span>
                    <p className="text-zinc-300 font-sans">
                      {selectedMapLoc.description}
                    </p>
                  </div>

                  <div className="p-3.5 bg-black/90 border border-zinc-900 rounded-lg space-y-1">
                    <span className="text-[8px] font-mono text-[#E21D26] uppercase font-black block tracking-widest">// COMBAT INTEL FILES (AUTHORIZED EX_4)</span>
                    <p className="text-zinc-400 font-mono text-[11px] leading-relaxed">
                      {selectedMapLoc.intelNotes}
                    </p>
                  </div>
                </div>

                {/* Extra status parameters */}
                <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[9px] font-mono text-zinc-500 relative z-10">
                  <span>LAT: {selectedMapLoc.coordinates.x * 0.44}° N</span>
                  <span>LON: {selectedMapLoc.coordinates.y * 0.88}° W</span>
                  <span>EST: DOE_HAW_MONITOR</span>
                </div>

              </div>

            </motion.div>
          )}

          {/* ==================================================== */}
          {/* 3. CLASSIFIED UPSIDE DOWN PORTAL EXPERIENCE        */}
          {/* ==================================================== */}
          {activeTab === 'portal' && (
            <motion.div
              key="portal-widget-module"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.45 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              
              {/* Outer Portal chamber viewport framed with warning indicators */}
              <div className={`relative border rounded-2xl p-6 sm:p-10 overflow-hidden bg-black flex flex-col items-center justify-center text-center transition-all duration-1000 select-none ${
                portalActive
                  ? 'border-red-650/70 shadow-[0_0_60px_rgba(239,68,68,0.25)]'
                  : 'border-zinc-900 shadow-2xl'
              }`}>
                
                {/* 1. Heavy Red and Crimson Ambient Overlay inside portal active */}
                <div className={`absolute inset-0 bg-radial-gradient from-red-950/20 via-transparent to-transparent pointer-events-none transition-opacity duration-1000 ${
                  portalActive ? 'opacity-100' : 'opacity-20'
                }`} />

                {/* 2. VHS static scanlines */}
                <div className="absolute inset-0 vhs-lines-overlay opacity-30 pointer-events-none" />

                {/* 3. Interactive Floating Spores Particles */}
                {portalActive && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 transition-opacity">
                    {sporeCount.map((s) => (
                      <div
                        key={s.id}
                        className="absolute bg-zinc-300 rounded-full animate-spore"
                        style={{
                          left: `${s.left}%`,
                          top: `${s.top}%`,
                          width: `${s.size}px`,
                          height: `${s.size}px`,
                          animationDuration: `${s.duration}s`,
                          animationDelay: `${s.delay}s`,
                          opacity: 0.35 + Math.random() * 0.45,
                          filter: 'blur(1px)'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* 4. Haunted lightning background blink simulation */}
                {portalActive && (
                  <div className="absolute inset-0 bg-red-600/10 pointer-events-none z-10 lightning-overlay" />
                )}

                {/* 5. Giant Portal opening graphic in the center */}
                <div className="relative py-12 px-6 flex flex-col items-center justify-center z-20">
                  
                  {/* Rotating dimensional gate container */}
                  <div className="relative w-72 h-72 rounded-full flex items-center justify-center">
                    
                    {/* Ring aura background */}
                    <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${
                      portalActive ? 'border-red-600/30 animate-spin' : 'border-zinc-900'
                    }`} style={{ animationDuration: '40s' }} />

                    <div className={`absolute -inset-4 rounded-full border border-dotted transition-all duration-1000 ${
                      portalActive ? 'border-red-800/40 animate-spin' : 'border-transparent'
                    }`} style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

                    {/* Highly interactive center warp gate */}
                    <motion.div
                      animate={portalActive ? {
                        scale: [1, 1.05, 0.98, 1.03, 1],
                        rotate: 360,
                        boxShadow: [
                          '0 0 40px rgba(239, 68, 68, 0.4)',
                          '0 0 65px rgba(220, 38, 38, 0.65)',
                          '0 0 40px rgba(239, 68, 68, 0.4)'
                        ]
                      } : {
                        scale: 1,
                        rotate: 0,
                        boxShadow: '0 0 0px rgba(0,0,0,0)'
                      }}
                      transition={portalActive ? {
                        scale: { duration: 4, repeat: Infinity, ease: 'linear' },
                        rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                        boxShadow: { duration: 3, repeat: Infinity, ease: 'linear' }
                      } : {}}
                      className={`relative w-56 h-56 rounded-full overflow-hidden flex flex-col items-center justify-center border cursor-pointer select-none transition-all duration-1000 ${
                        portalActive
                          ? 'border-red-650 bg-gradient-to-br from-red-950 via-zinc-950 to-black scale-105'
                          : 'border-zinc-800 bg-[#060608] hover:border-zinc-600'
                      }`}
                      onClick={handlePortalToggle}
                    >
                      {/* Deep internal portal visual rendering content */}
                      {portalActive ? (
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-3 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950 via-[#040406] to-black">
                          
                          {/* Beautiful central dark nucleus */}
                          <div className="absolute w-28 h-28 rounded-full bg-black border border-red-900/40 z-10 flex items-center justify-center shadow-inner blur-xs" />
                          
                          <div className="text-center space-y-1 relative z-20">
                            <Skull className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse mx-auto" />
                            <span className="font-mono text-[9px] tracking-[0.25em] h-auto uppercase text-red-400 font-extrabold block">
                              GATE OPEN
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-2 p-4">
                          <Radio className="w-10 h-10 text-zinc-600 mx-auto animate-pulse" />
                          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-bold block">
                            GATE OF HAWKINS
                          </div>
                          <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-sans">
                            CLICK TO INITIATE COHERENCE
                          </span>
                        </div>
                      )}

                      {/* Organic crawl overlay indicators inside ring */}
                      {portalActive && (
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-red-950/20 to-black pointer-events-none" />
                      )}
                    </motion.div>

                  </div>

                </div>

                {/* Controlled warning parameters and interactive triggers */}
                <div className="max-w-xl space-y-4 pt-4">
                  <div className="inline-flex gap-2 items-center bg-black/95 border border-zinc-900 py-1.5 px-3.5 rounded-lg">
                    <span className={`w-2 h-2 rounded-full ${portalActive ? 'bg-red-500 animate-ping' : 'bg-zinc-600'}`} />
                    <span className="font-mono text-[10px] uppercase text-zinc-400">
                      Rift Stabilizer Field Status: <span className={portalActive ? 'text-red-500 font-bold' : 'text-zinc-500'}>{portalActive ? 'DECOHERENCE_CRITICAL_ALPHA' : 'GATEWAY_CONTAINED_STANDBY'}</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-white font-black uppercase tracking-wider">
                      {portalActive ? 'THE VOID ATMOSPHERE UNLEASHED' : 'UPSIDE DOWN RIFT EXPERIMENT'}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {portalActive
                        ? 'Spore containment levels breached. Electromagnetic feedback measuring over 1000 MHz. Audio streams may experience deep spatial feedback. Entire background system is tuned to the Upside Down dimension.'
                        : 'Simulate the activation of the U.S. Department of Energy trans-dimensional portal. Open the rift to unleash biological particles, spore-falls, structural red electric lightning, and Vecna-inspired telemetry parameters.'}
                    </p>
                  </div>

                  {/* Manual trigger panel button action */}
                  <div className="pt-4 flex justify-center">
                    <button
                      id="dimension-gate-manual-switch-btn"
                      onClick={handlePortalToggle}
                      className={`px-6 py-3 font-mono text-[10px] tracking-widest rounded border uppercase cursor-pointer transition-all duration-300 font-bold ${
                        portalActive
                          ? 'bg-red-950 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                          : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-650 hover:text-white'
                      }`}
                    >
                      {portalActive ? 'CLOSE PORTAL CONTAINER // SEALGATE' : 'ARM PORTAL SWITCH // SECURE INITIATION'}
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Extra telemetry logs widget */}
              <div className="bg-[#040407] border border-zinc-900 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-4">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-zinc-600" />
                  <span>EM_WAVE OSCILLATOR:</span>
                  <span className="text-[#E21D26] animate-pulse">
                    {portalActive ? 'STABLE_OVERHEAT_1044Hz' : 'READY_STANDBY_432Hz'}
                  </span>
                </div>
                <div>PROJECT REFERENCE: DIRECT_CONTACT SECURE // DOE // SUB_45_E</div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </section>
  );
}
