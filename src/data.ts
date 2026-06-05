import { Character, Episode, GalleryItem } from './types';

const RAW_CHARACTERS: Character[] = [
  {
    id: 'mike',
    name: 'Mike Wheeler',
    alterEgo: 'The Paladin',
    actor: 'Finn Wolfhard',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "If anyone asks where I am, I've left the country.",
      "It's not about being stupid, it's about being friends.",
      "El, I love you."
    ],
    description: 'The brave and determined leader of the pack. He maintains an unshakable devotion to Eleven and his friends, serving as the group\'s emotional core through endless supernatural crises.',
    ability: 'Strategic Leadership, High Morale, Walkie-Talkie Coordinator',
    powerLevel: 55,
    dangerLevel: 25,
    backgroundRealWorld: 'from-blue-950/20 to-indigo-950/20 border-blue-500/10 shadow-blue-500/5',
    backgroundUpsideDown: 'from-red-950/20 to-neutral-950 border-red-500/10 shadow-red-950/10',
    image: '/images/characters/mike.jpg'
  },
  {
    id: 'eleven',
    name: 'Eleven',
    alterEgo: 'Jane Hopper (011)',
    actor: 'Millie Bobby Brown',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "Friends don't lie.",
      "I make my own rules.",
      "Bitchin'."
    ],
    description: 'Abducted and raised in Hawkins National Laboratory, she possessed powerful psychokinetic and telepathic abilities. After escaping, she found friendship, love, and a family in Hawkins, repeatedly defending the town from interdimensional monstrosities.',
    ability: 'Telekinesis, Telepathy, Sensory Deprivation Projection',
    powerLevel: 98,
    dangerLevel: 45,
    backgroundRealWorld: 'from-amber-900/10 to-blue-900/10 border-blue-500/20 shadow-blue-500/10',
    backgroundUpsideDown: 'from-red-950/30 to-black border-red-600/30 shadow-red-600/20',
    image: '/images/characters/eleven.jpg'
  },
  {
    id: 'max',
    name: 'Max Mayfield',
    alterEgo: 'MadMax',
    actor: 'Sadie Sink',
    seasonIntroduced: 2,
    status: 'Trapped in Upside Down',
    quotes: [
      "There's more to life than stupid boys.",
      "I'm still here.",
      "Running up that hill... with no road."
    ],
    description: 'A skateboarder, gamer, and fierce skeptic who became an integral member of the party. After the traumatic loss of her stepbrother Billy, she became Vecna\'s core target, escaping his curse once through the power of friendship and Kate Bush.',
    ability: 'Incredible Resilience, Skateboard Agility, High Pain Tolerance',
    powerLevel: 45,
    dangerLevel: 30,
    backgroundRealWorld: 'from-orange-900/10 to-blue-900/10 border-amber-500/20 shadow-amber-500/10',
    backgroundUpsideDown: 'from-red-950/35 to-rose-950/20 border-red-500/30 shadow-rose-950/30',
    image: '/images/characters/max.jpg'
  },
  {
    id: 'steve',
    name: 'Steve Harrington',
    alterEgo: 'The Babysitter / King Steve',
    actor: 'Joe Keery',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "I'm a damn good babysitter.",
      "Yeah, the hair is my thing. Always has been.",
      "Always the goddamn babysitter."
    ],
    description: 'An arrogant high school popular jock who redeemed himself to became the ultimate protective protector, sibling figure, and bat-wielding guardian of the younger kids. He has survived multiple Demodog and Demobat bites.',
    ability: 'Spiked Bat Combat, Babysitting Tactics, Dynamic Hair Styling',
    powerLevel: 65,
    dangerLevel: 60,
    backgroundRealWorld: 'from-[#0f172a] to-[#1e1b4b] border-[#4338ca]/30 shadow-[#4338ca]/10',
    backgroundUpsideDown: 'from-red-950/25 to-zinc-950 border-red-700/20 shadow-red-900/10',
    image: '/images/characters/steve.jpg'
  },
  {
    id: 'will',
    name: 'Will Byers',
    alterEgo: 'Will the Wise',
    actor: 'Noah Schnapp',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "He likes it cold.",
      "Sometimes, I still feel him. Like a cold feeling on the back of my neck.",
      "Should I stay or should I go?"
    ],
    description: 'The catalyst of the Hawkins crisis whose abduction to the Upside Down in 1983 opened the town\'s eyes to the horrors. Overcoming possession by the Mind Flayer left him with a permanent extrasensory connection to the alternate dimension.',
    ability: 'Mind Flayer Sensory Connection, Artistic Clairvoyance, Fireball Spells',
    powerLevel: 72,
    dangerLevel: 55,
    backgroundRealWorld: 'from-emerald-950/10 to-[#172554]/20 border-emerald-500/20 shadow-emerald-500/10',
    backgroundUpsideDown: 'from-red-950/30 to-purple-950/20 border-red-600/30 shadow-purple-600/10',
    image: '/images/characters/will.jpg'
  },
  {
    id: 'lucas',
    name: 'Lucas Sinclair',
    alterEgo: 'The Ranger',
    actor: 'Caleb McLaughlin',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "When they come, we'll be ready.",
      "We're fighting for our lives.",
      "Max! Wake up!"
    ],
    description: 'The pragmatic, level-headed defender of the pack. Athletic and strategic, he is never afraid to utilize physical defense—like his Wrist Rocket slingshot—to protect his community and those he loves.',
    ability: 'Wrist Rocket Combat, Strategic Sentinel, Physical Endurance',
    powerLevel: 58,
    dangerLevel: 35,
    backgroundRealWorld: 'from-amber-950/10 to-stone-900/20 border-amber-500/15 shadow-amber-500/5',
    backgroundUpsideDown: 'from-red-950/20 to-zinc-950 border-red-600/10 shadow-red-900/10',
    image: '/images/characters/lucas.jpg'
  },
  {
    id: 'dustin',
    name: 'Dustin Henderson',
    alterEgo: 'Radio Handy / Dusty-bun',
    actor: 'Gaten Matarazzo',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "Compass magic! Gravity is being compromised!",
      "I am on a curiosity voyage and I need my paddles!",
      "Suzie, do you copy?"
    ],
    description: 'The science-loving, high-IQ compass of the party. He possesses incredible analytical foresight and mechanical competence. Dustin was the first to adopt a Demodog (Dart) and solved the Russian radio code alongside Steve and Robin.',
    ability: 'Deep Science Lore, High-frequency Radio Comms, Cryptography',
    powerLevel: 60,
    dangerLevel: 25,
    backgroundRealWorld: 'from-sky-950/10 to-indigo-950/10 border-sky-500/20 shadow-sky-500/10',
    backgroundUpsideDown: 'from-red-950/20 to-neutral-950 border-red-500/20 shadow-red-950/20',
    image: '/images/characters/dustin.jpg'
  },
  {
    id: 'vecna',
    name: 'Vecna',
    alterEgo: 'Henry Creel / One (001)',
    actor: 'Jamie Campbell Bower',
    seasonIntroduced: 4,
    status: 'Alive',
    quotes: [
      "Your time is come.",
      "Join me.",
      "Hawkins will burn. It is time for you to watch."
    ],
    description: 'The primordial horror who coordinates all Upside Down invasions. Born Henry Creel, he became Dr. Brenner\'s first test subject, One. Banished to the Upside Down by Eleven, he mutated into Vecna, feeding on trauma to breach the boundary.',
    ability: 'Mind Invasion, Eldritch Telekinesis, Spore Telepathy, Bone Crushing Curse',
    powerLevel: 100,
    dangerLevel: 100,
    backgroundRealWorld: 'from-purple-950/20 to-black border-purple-500/20 shadow-purple-950/20',
    backgroundUpsideDown: 'from-red-950/50 to-red-900/10 border-red-500 shadow-red-500/40 animate-pulse',
    image: '/images/characters/vecna.jpg'
  },
  {
    id: 'nancy',
    name: 'Nancy Wheeler',
    alterEgo: 'The Wheeler Investigator',
    actor: 'Natalia Dyer',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "I'm going. I'm going to find him.",
      "We can defeat him. We did it before.",
      "Always follow your instincts."
    ],
    description: 'An aspiring journalist and exceptional marksman. What started as high school romance turned into deep-rooted detective work, uncovering the truths of Hawkins and the dark coverups of the Hawkins Lab.',
    ability: 'Investigative Journalism, Firearm Proficiency, Tenacious Determination',
    powerLevel: 68,
    dangerLevel: 45,
    backgroundRealWorld: 'from-fuchsia-950/20 to-indigo-950/20 border-fuchsia-500/10 shadow-fuchsia-500/5',
    backgroundUpsideDown: 'from-red-950/20 to-neutral-950 border-red-500/10 shadow-red-950/10',
    image: '/images/characters/nancy.jpg'
  },
  {
    id: 'jonathan',
    name: 'Jonathan Byers',
    alterEgo: 'The Photographer',
    actor: 'Charlie Heaton',
    seasonIntroduced: 1,
    status: 'Alive',
    quotes: [
      "Sometimes people don't really say what they're really thinking.",
      "You shouldn't like things because people tell you you're supposed to.",
      "I've got your back, always."
    ],
    description: 'Quiet, artistic, and deeply protective of his family. Jonathan\'s camera lens captured some of Hawkins\' first anomalous activities, and he stood alongside Nancy in defending the younger teens.',
    ability: 'Photography Intel, Spiked Club Combat, Defensive Coordination',
    powerLevel: 62,
    dangerLevel: 40,
    backgroundRealWorld: 'from-amber-950/10 to-stone-900 border-[#78350f]/30',
    backgroundUpsideDown: 'from-red-900/20 to-neutral-950 border-red-500/10',
    image: '/images/characters/jonathan.jpg'
  },
  {
    id: 'robin',
    name: 'Robin Buckley',
    alterEgo: 'The Codebreaker',
    actor: 'Maya Hawke',
    seasonIntroduced: 3,
    status: 'Alive',
    quotes: [
      "We all have secrets, Steve. Yours is just... simpler.",
      "I feel like my whole life is a code I can't write.",
      "Russian transmission decoded!"
    ],
    description: 'Steve\'s quick-witted Scoops Ahoy coworker. Highly linguistic and analytical, Robin helped translate highly confidential Russian codes, navigating secret military layouts beneath Starcourt Mall.',
    ability: 'Linguistic translation, Cross-reference Cryptography, High Verbal Output',
    powerLevel: 64,
    dangerLevel: 30,
    backgroundRealWorld: 'from-teal-950/20 to-slate-900 border-teal-500/20 shadow-teal-500/5',
    backgroundUpsideDown: 'from-red-950/20 to-cyan-950 border-red-500/10',
    image: '/images/characters/robin.jpg'
  },
  {
    id: 'eddie',
    name: 'Eddie Munson',
    alterEgo: 'Dungeon Master / Metal Leader',
    actor: 'Joseph Quinn',
    seasonIntroduced: 4,
    status: 'Deceased',
    quotes: [
      "Chrissy, this is for you!",
      "This is music!",
      "I didn't run away this time, right?"
    ],
    description: 'Leader of the Hellfire Club and rebel guitarist of Hawkins High. Blamed for supernatural crimes, he showed ultimate courage by playing the most metal concert in history to defend Hawkins from the bat swarm.',
    ability: 'Extreme Guitar Shredding, Hellfire Campaign Planning, Decoy distraction',
    powerLevel: 70,
    dangerLevel: 65,
    backgroundRealWorld: 'from-purple-950/15 to-[#1e1b4b] border-purple-500/30 shadow-purple-500/10',
    backgroundUpsideDown: 'from-red-950/40 to-black border-red-500/40 shadow-red-500/20',
    image: '/images/characters/eddie.jpg'
  },
  {
    id: 'billy',
    name: 'Billy Hargrove',
    alterEgo: 'The Mind Flayer Vanguard',
    actor: 'Dacre Montgomery',
    seasonIntroduced: 2,
    status: 'Deceased',
    quotes: [
      "I am the one who rules.",
      "You let me in, and now you have to let me stay.",
      "I'm sorry, Max."
    ],
    description: 'Max\'s volatile, aggressive older stepbrother. Chosen as the Mind Flayer\'s central physical host, he fought off the interdimensional control in his final moments to save Eleven and Max at Starcourt Mall.',
    ability: 'Physical Brutality, Host Hivemind Link, Ultimate Redemption Sacrifice',
    powerLevel: 80,
    dangerLevel: 85,
    backgroundRealWorld: 'from-amber-950/10 to-stone-900 border-[#b45309]/30 shadow-[#b45309]/5',
    backgroundUpsideDown: 'from-red-900/45 to-black border-red-500/40 shadow-red-700/20',
    image: '/images/characters/billy.jpg'
  }
];

const UNSPLASH_FALLBACKS: Record<string, string> = {
  mike: '/images/characters/mike.jpg',
  eleven: '/images/characters/eleven.jpg',
  max: '/images/characters/max.jpg',
  steve: '/images/characters/steve.jpg',
  will: '/images/characters/will.jpg',
  lucas: '/images/characters/lucas.jpg',
  dustin: '/images/characters/dustin.jpg',
  vecna: '/images/characters/vecna.jpg',
  nancy: '/images/characters/nancy.jpg',
  jonathan: '/images/characters/jonathan.jpg',
  robin: '/images/characters/robin.jpg',
  eddie: '/images/characters/eddie.jpg',
  billy: '/images/characters/billy.jpg'
};

export const CHARACTERS: Character[] = RAW_CHARACTERS.map(char => {
  const fallbackUnsplash = UNSPLASH_FALLBACKS[char.id] || UNSPLASH_FALLBACKS.eleven;
  return {
    ...char,
    image: char.image,
    fallbackImage: fallbackUnsplash
  };
});

export const EPISODES: Episode[] = [
  // --- SEASON 1 ---
  {
    id: 's1e1',
    title: 'Chapter One: The Vanishing of Will Byers',
    episodeNum: 1,
    season: 1,
    synopsis: 'On his way home from a D&D campaign, young Will Byers encounters a shadowy interdimensional predator. Nearby, a secret government laboratory accidentally punctures a hole in reality, and a mysterious girl with shaved hair escapes from captivity.',
    duration: '48m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 8.9,
    thumbnail: '/images/episodes/s1e1.jpg'
  },
  {
    id: 's1e2',
    title: 'Chapter Two: The Weirdo on Maple Street',
    episodeNum: 2,
    season: 1,
    synopsis: 'Lucas, Dustin, and Mike attempt to talk to the mysterious girl they found in the woods. They discover her name is Eleven and she possesses incredible telekinetic powers. Meanwhile, Joyce Byers receives a terrifying, static-filled phone call.',
    duration: '55m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 8.4,
    thumbnail: '/images/episodes/s1e2.jpg'
  },
  {
    id: 's1e3',
    title: 'Chapter Three: Holly, Jolly',
    episodeNum: 3,
    season: 1,
    synopsis: 'An increasingly frantic Joyce Byers attempts to make contact with her missing son Will through a series of Christmas lights hung across her living room wall. Barbara goes missing under mysterious circumstances at Steve\'s pool party.',
    duration: '51m',
    airDate: 'July 15, 2016',
    director: 'Shawn Levy',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s1e3.jpg'
  },
  {
    id: 's1e4',
    title: 'Chapter Four: The Body',
    episodeNum: 4,
    season: 1,
    synopsis: 'Refusing to believe her son is dead despite a body being pulled from the local quarry, Joyce attempts to prove Will is speaking to her from a different dimension. The boys give Eleven a suburban makeover so she can sneak into the high school.',
    duration: '50m',
    airDate: 'July 15, 2016',
    director: 'Shawn Levy',
    ratingPv: 8.8,
    thumbnail: '/images/episodes/s1e4.jpg'
  },
  {
    id: 's1e5',
    title: 'Chapter Five: The Flea and the Acrobat',
    episodeNum: 5,
    season: 1,
    synopsis: 'The local science teacher Mr. Clarke explains the theoretical existence of parallel dimensions to the boys. Armed with compasses that point abnormally away from magnetic north, Dustin, Lucas, and Mike set out to find the portal\'s gate.',
    duration: '53m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 8.7,
    thumbnail: '/images/episodes/s1e5.jpg'
  },
  {
    id: 's1e6',
    title: 'Chapter Six: The Monster',
    episodeNum: 6,
    season: 1,
    synopsis: 'Jonathan and Nancy go on a joint investigation into the woods and locate an unsettling organic portal embedded inside a tree stump. Eleven recalls her time in the sensory deprivation bath, where she first grazed the Demogorgon.',
    duration: '46m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 9.0,
    thumbnail: '/images/episodes/s1e6.jpg'
  },
  {
    id: 's1e7',
    title: 'Chapter Seven: The Bathtub',
    episodeNum: 7,
    season: 1,
    synopsis: 'With government agents swarming Hawkins, the kids seek refuge. Eleven helps them construct a makeshift sensory deprivation tank using a public pool and bags of road salt to boost her telepathic compass and pinpoint Will Byers.',
    duration: '41m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s1e7.jpg'
  },
  {
    id: 's1e8',
    title: 'Chapter Eight: The Upside Down',
    episodeNum: 8,
    season: 1,
    synopsis: 'Jim Hopper and Joyce Byers venture through the gate into the dark toxically decaying Upside Down to salvage Will. Meanwhile, Steve helps Nancy and Jonathan battle the Demogorgon at the Byers residence while Eleven confronts her creators.',
    duration: '54m',
    airDate: 'July 15, 2016',
    director: 'The Duffer Brothers',
    ratingPv: 9.3,
    thumbnail: '/images/episodes/s1e8.jpg'
  },
 
  // --- SEASON 2 ---
  {
    id: 's2e1',
    title: 'Chapter One: MADMAX',
    episodeNum: 1,
    season: 2,
    synopsis: 'A year after Will\'s return, a competitive skater girl named Max joins the class, sparking immediate interest from Dustin and Lucas. Will experiences terrifying, vivid hallucinations of a massive spindly storm creature in the sky.',
    duration: '48m',
    airDate: 'October 27, 2017',
    director: 'The Duffer Brothers',
    ratingPv: 8.7,
    thumbnail: '/images/episodes/s2e1.jpg'
  },
  {
    id: 's2e2',
    title: 'Chapter Two: Trick or Treat, Freak',
    episodeNum: 2,
    season: 2,
    synopsis: 'On Halloween, Will encounters a giant, shadowy Mind Flayer looming in the skies. Mike longs to contact Eleven, unaware that Hopper has been keeping her safely hidden inside a remote cabin in the woods.',
    duration: '56m',
    airDate: 'October 27, 2017',
    director: 'The Duffer Brothers',
    ratingPv: 8.5,
    thumbnail: '/images/episodes/s2e2.jpg'
  },
  {
    id: 's2e3',
    title: 'Chapter Three: The Pollywog',
    episodeNum: 3,
    season: 2,
    synopsis: 'Dustin discovers a bizarre, small slug-like creature inside his trash can and names it Dart. At the same time, Eleven becomes increasingly frustrated by her isolation and sneaks out of the woods cabin to seek out Mike.',
    duration: '51m',
    airDate: 'October 27, 2017',
    director: 'Shawn Levy',
    ratingPv: 8.6,
    thumbnail: '/images/episodes/s2e3.jpg'
  },
  {
    id: 's2e4',
    title: 'Chapter Four: Will the Wise',
    episodeNum: 4,
    season: 2,
    synopsis: 'A possessed Will Byers reports his thoughts are bound to the giant Shadow Monster. He begins scribbling a vast, interconnected mesh of vine diagrams that Joyce and Hopper realize represents an underground fungal map.',
    duration: '46m',
    airDate: 'October 27, 2017',
    director: 'Shawn Levy',
    ratingPv: 8.8,
    thumbnail: '/images/episodes/s2e4.jpg'
  },
  {
    id: 's2e5',
    title: 'Chapter Five: Dig Dug',
    episodeNum: 5,
    season: 2,
    synopsis: 'Hopper becomes trapped in a deep, subterranean tunnel choked with vines and toxic spores. Armed with Will\'s maps, Bob Newby uses his logic to find Hopper\'s coordinates, while Eleven sets off on a journey to find her mother.',
    duration: '58m',
    airDate: 'October 27, 2017',
    director: 'Andrew Stanton',
    ratingPv: 8.9,
    thumbnail: '/images/episodes/s2e5.jpg'
  },
  {
    id: 's2e6',
    title: 'Chapter Six: The Spy',
    episodeNum: 6,
    season: 2,
    synopsis: 'The scientists discover the underground vines are connected as a biological hivemind. Dustin and Steve Harrington strike up an unlikely friendship and create a meat-baited trap for the rapidly growing Demodogs in the local junkyard.',
    duration: '51m',
    airDate: 'October 27, 2017',
    director: 'Andrew Stanton',
    ratingPv: 9.2,
    thumbnail: '/images/episodes/s2e6.jpg'
  },
  {
    id: 's2e7',
    title: 'Chapter Seven: The Lost Sister',
    episodeNum: 7,
    season: 2,
    synopsis: 'Eleven travels to Chicago, tracking down another surviving laboratory escapee, Eight (Kali), who can cast realistic mental illusions. Together, they embark on a vigilante crusade against key laboratory operators.',
    duration: '47m',
    airDate: 'October 27, 2017',
    director: 'Rebecca Thomas',
    ratingPv: 6.8,
    thumbnail: '/images/episodes/s2e7.jpg'
  },
  {
    id: 's2e8',
    title: 'Chapter Eight: The Mind Flayer',
    episodeNum: 8,
    season: 2,
    synopsis: 'A power failure traps the main cast inside Hawkins Lab with hungry Demodogs roaming the halls. Bob Newby bravely volunteers to navigate the computer terminal to override security systems, leading to a tragic sacrifice.',
    duration: '47m',
    airDate: 'October 27, 2017',
    director: 'The Duffer Brothers',
    ratingPv: 9.4,
    thumbnail: '/images/episodes/s2e8.jpg'
  },
  {
    id: 's2e9',
    title: 'Chapter Nine: The Gate',
    episodeNum: 9,
    season: 2,
    synopsis: 'Eleven makes a triumphant return and channels all of her locked telekinetic trauma to seal the colossal interdimensional Gate, while Steve leads the children into the tunnels under Hawkins to ignite the Mind Flayer\'s organic network.',
    duration: '1h 02m',
    airDate: 'October 27, 2017',
    director: 'The Duffer Brothers',
    ratingPv: 9.4,
    thumbnail: '/images/episodes/s2e9.jpg'
  },
 
  // --- SEASON 3 ---
  {
    id: 's3e1',
    title: 'Chapter One: Suzie, Do You Copy?',
    episodeNum: 1,
    season: 3,
    synopsis: 'The summer of 1985 brings a shiny new Starcourt Mall to Hawkins. Dustin builds an ultra-powerful ham radio tower to contact his new girlfriend Suzie, accidentally intercepting an encrypted secret Soviet military transmission.',
    duration: '50m',
    airDate: 'July 4, 2019',
    director: 'The Duffer Brothers',
    ratingPv: 8.8,
    thumbnail: '/images/episodes/s3e1.jpg'
  },
  {
    id: 's3e2',
    title: 'Chapter Two: The Mall Rats',
    episodeNum: 2,
    season: 3,
    synopsis: 'Nancy and Jonathan investigate reports of diseased rats eating chemical fertilizer. Eleven and Max enjoy a shopping spree at Starcourt, and Steve and Robin work to decipher the static Soviet code from a secret recording.',
    duration: '50m',
    airDate: 'July 4, 2019',
    director: 'The Duffer Brothers',
    ratingPv: 8.5,
    thumbnail: '/images/episodes/s3e2.jpg'
  },
  {
    id: 's3e3',
    title: 'Chapter Three: The Case of the Missing Lifeguard',
    episodeNum: 3,
    season: 3,
    synopsis: 'Eleven uses her telepathic powers and notices a local lifeguard, Billy\'s coworker Heather, has vanished. Concurrently, Will feels the familiar icy physical sensation of the Mind Flayer returning to Hawkins.',
    duration: '49m',
    airDate: 'July 4, 2019',
    director: 'Shawn Levy',
    ratingPv: 8.6,
    thumbnail: '/images/episodes/s3e3.jpg'
  },
  {
    id: 's3e4',
    title: 'Chapter Four: The Sauna Test',
    episodeNum: 4,
    season: 3,
    synopsis: 'Suspicious that Billy Hargrove has been possessed by the Mind Flayer, the kids lure him into the local public pool\'s steam sauna room to test if high heat triggers the interdimensional parasite\'s violent resistance.',
    duration: '53m',
    airDate: 'July 4, 2019',
    director: 'Shawn Levy',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s3e4.jpg'
  },
  {
    id: 's3e5',
    title: 'Chapter Five: The Flayed',
    episodeNum: 5,
    season: 3,
    synopsis: 'The scope of the Mind Flayer\'s possession expands to several local citizens who are drinking industrial chemicals. Dustin, Steve, Robin, and Erica are trapped inside a high-speed elevator descending into a massive Soviet base.',
    duration: '52m',
    airDate: 'July 4, 2019',
    director: 'Uta Briesewitz',
    ratingPv: 8.8,
    thumbnail: '/images/episodes/s3e5.jpg'
  },
  {
    id: 's3e6',
    title: 'Chapter Six: E Pluribus Unum',
    episodeNum: 6,
    season: 3,
    synopsis: 'Steve and Robin are captured and interrogated by Soviet guards deep in the tunnels, while Eleven explores Billy\'s traumatic childhood memories using her telepathic touch, discovering how the Mind Flayer seized control.',
    duration: '57m',
    airDate: 'July 4, 2019',
    director: 'Uta Briesewitz',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s3e6.jpg'
  },
  {
    id: 's3e7',
    title: 'Chapter Seven: The Bite',
    episodeNum: 7,
    season: 3,
    synopsis: 'With the Mind Flayer\'s colossal fleshy avatar tracking them, the kids take cover inside a hardware store to treat Eleven, who has suffered an organic bite. Dustin\'s group escapes the subterranean facility with foreign tech.',
    duration: '55m',
    airDate: 'July 4, 2019',
    director: 'The Duffer Brothers',
    ratingPv: 9.0,
    thumbnail: '/images/episodes/s3e7.jpg'
  },
  {
    id: 's3e8',
    title: 'Chapter Eight: The Battle of Starcourt',
    episodeNum: 8,
    season: 3,
    synopsis: 'The massive fleshy avatar of the Mind Flayer attacks the Starcourt Mall. Billy sacrifices himself to protect Eleven, while Hopper and Joyce trigger the key in the subterranean Soviet base, sacrificing Hopper into a Russian gulag.',
    duration: '1h 17m',
    airDate: 'July 4, 2019',
    director: 'The Duffer Brothers',
    ratingPv: 9.5,
    thumbnail: '/images/episodes/s3e8.jpg'
  },
 
  // --- SEASON 4 ---
  {
    id: 's4e1',
    title: 'Chapter One: The Hellfire Club',
    episodeNum: 1,
    season: 4,
    synopsis: 'High school brings new challenges to Hawkins. Dustin and Mike join the Hellfire Club, a local D&D society led by charismatic metalhead Eddie Munson, unaware of a horrific psychic entity beginning to haunt a local cheerleader.',
    duration: '1h 16m',
    airDate: 'May 27, 2022',
    director: 'The Duffer Brothers',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s4e1.jpg'
  },
  {
    id: 's4e2',
    title: 'Chapter Two: Vecna\'s Curse',
    episodeNum: 2,
    season: 4,
    synopsis: 'The police investigate the gruesome, bone-crushing murder of Chrissy Cunningham inside Eddie\'s trailer. In Russia, a frozen hopper fights to survive in a maximum security gulag while Eddie goes into hiding.',
    duration: '1h 17m',
    airDate: 'May 27, 2022',
    director: 'The Duffer Brothers',
    ratingPv: 8.9,
    thumbnail: '/images/episodes/s4e2.jpg'
  },
  {
    id: 's4e3',
    title: 'Chapter Three: The Monster and the Superhero',
    episodeNum: 3,
    season: 4,
    synopsis: 'Dr. Owens warns Eleven that a severe war is brewing between the human world and the Upside Down. He offers her a way to rebuild her telekinetic powers through a classified psychological protocol called the NINA project.',
    duration: '1h 03m',
    airDate: 'May 27, 2022',
    director: 'Shawn Levy',
    ratingPv: 8.7,
    thumbnail: '/images/episodes/s4e3.jpg'
  },
  {
    id: 's4e4',
    title: 'Chapter Four: Dear Billy',
    episodeNum: 4,
    season: 4,
    synopsis: 'Max Mayfield finds herself trapped inside Vecna\'s red psychological domain, ready to be murdered. Supported by Dustin, Lucas, and Steve spinning her favorite vinyl song, she runs for her life toward her friends and breaks the curse.',
    duration: '1h 17m',
    airDate: 'May 27, 2022',
    director: 'Shawn Levy',
    ratingPv: 9.8,
    thumbnail: '/images/episodes/s4e4.jpg'
  },
  {
    id: 's4e5',
    title: 'Chapter Five: The Nina Project',
    episodeNum: 5,
    season: 4,
    synopsis: 'Eleven is immersed in an underground Nevada missile silo where she relives her long-buried memories of her early years in Hawkins lab. In Hawkins, the gang identifies Vecna\'s portals are located at his victims\' death sites.',
    duration: '1h 14m',
    airDate: 'May 27, 2022',
    director: 'Nimród Antal',
    ratingPv: 8.9,
    thumbnail: '/images/episodes/s4e5.jpg'
  },
  {
    id: 's4e6',
    title: 'Chapter Six: The Dive',
    episodeNum: 6,
    season: 4,
    synopsis: 'Steve, Nancy, Robin, and Eddie locate a watergate portal at the bottom of Lovers\' Lake. Steve dives in to investigate and gets dragged into the Upside Down, promptly followed by his friends to pull off a daring rescue.',
    duration: '1h 13m',
    airDate: 'May 27, 2022',
    director: 'Nimród Antal',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s4e6.jpg'
  },
  {
    id: 's4e7',
    title: 'Chapter Seven: The Massacre at Hawkins Lab',
    episodeNum: 7,
    season: 4,
    synopsis: 'Eleven faces her past memories of the kind orderly, Henry Creel, discovering that he was Brenner\'s Subject One. He reveals he orchestrated the lab massacre, prompting Eleven to banish him which mutated him into Vecna.',
    duration: '1h 38m',
    airDate: 'May 27, 2022',
    director: 'The Duffer Brothers',
    ratingPv: 9.7,
    thumbnail: '/images/episodes/s4e7.jpg'
  },
  {
    id: 's4e8',
    title: 'Chapter Eight: Papa',
    episodeNum: 8,
    season: 4,
    synopsis: 'As military troops close in on the secret Nevada bunker, Eleven leverages her telekinetic powers to destroy a combat helicopter. Meanwhile, the Hawkins crew prepares an ultimate three-phase plan to infiltrate Vecna\'s Creel house.',
    duration: '1h 25m',
    airDate: 'May 27, 2022',
    director: 'The Duffer Brothers',
    ratingPv: 9.2,
    thumbnail: '/images/episodes/s4e8.jpg'
  },
  {
    id: 's4e9',
    title: 'Chapter Nine: The Piggyback',
    episodeNum: 9,
    season: 4,
    synopsis: 'In an ultimate coordinated offensive spanning Hawkins, a Russian prison, and Nevada, Eddie Munson plays a legendary metal concert in the Upside Down to distract the demobats as Eleven fights Vecna inside Max\'s consciousness.',
    duration: '2h 30m',
    airDate: 'July 1, 2022',
    director: 'The Duffer Brothers',
    ratingPv: 9.6,
    thumbnail: '/images/episodes/s4e9.jpg'
  },
 
  // --- SEASON 5 (FINAL SEASON) ---
  {
    id: 's5e1',
    title: 'Chapter One: The Crawl',
    episodeNum: 1,
    season: 5,
    synopsis: 'The final battle for Hawkins begins as the group rallies together near the massive reality rift tear. Meanwhile, remnants of the Upside Down leak directly into the physical streets of the town.',
    duration: '1h 15m',
    airDate: 'To Be Released',
    director: 'The Duffer Brothers',
    ratingPv: 9.4,
    thumbnail: '/images/episodes/s5e1.jpg'
  },
  {
    id: 's5e2',
    title: 'Chapter Two: The Vanishing of Holly Wheeler',
    episodeNum: 2,
    season: 5,
    synopsis: 'Panic spreads through Hawkins as Mike\'s younger sister Holly Wheeler vanishes under suspicious, supernatural coordinates, suggesting Vecna\'s lingering grip has targeted a new innocent victim.',
    duration: '1h 12m',
    airDate: 'To Be Released',
    director: 'The Duffer Brothers',
    ratingPv: 9.2,
    thumbnail: '/images/episodes/s5e2.jpg'
  },
  {
    id: 's5e3',
    title: 'Chapter Three: The Turnbow Trap',
    episodeNum: 3,
    season: 5,
    synopsis: 'Dustin and the Hellfire club leftovers track strange energy anomalies to a local scrapyard known as Turnbow, setting a complex trap to capture information from the Upside Down\'s hivemind.',
    duration: '1h 18m',
    airDate: 'To Be Released',
    director: 'Shawn Levy',
    ratingPv: 9.5,
    thumbnail: '/images/episodes/s5e3.jpg'
  },
  {
    id: 's5e4',
    title: 'Chapter Four: Sorcerer',
    episodeNum: 4,
    season: 5,
    synopsis: 'Eleven undergoes intense telepathic testing to unlock her absolute psychic ceiling. Will Byers discovers a terrifying mental bridge linking his own thoughts back to the grand sorcerer behind the dark realm.',
    duration: '1h 20m',
    airDate: 'To Be Released',
    director: 'Shawn Levy',
    ratingPv: 9.5,
    thumbnail: '/images/episodes/s5e4.jpg'
  },
  {
    id: 's5e5',
    title: 'Chapter Five: Shock Jock',
    episodeNum: 5,
    season: 5,
    synopsis: 'An emergency radio transmission on local Hawkins airwaves turns into a psychic weapon, spreading Vecna\'s lethal chime through the radios and television screens of unsuspecting town residents.',
    duration: '1h 10m',
    airDate: 'To Be Released',
    director: 'Frank Darabont',
    ratingPv: 9.1,
    thumbnail: '/images/episodes/s5e5.jpg'
  },
  {
    id: 's5e6',
    title: 'Chapter Six: Escape from Camazotz',
    episodeNum: 6,
    season: 5,
    synopsis: 'Steve, Nancy, and Robin orchestrate a deep, high-stakes military rescue through the rotting networks of the subterranean void, fleeing an army of newly bred monstrosities.',
    duration: '1h 25m',
    airDate: 'To Be Released',
    director: 'The Duffer Brothers',
    ratingPv: 9.3,
    thumbnail: '/images/episodes/s5e6.jpg'
  },
  {
    id: 's5e7',
    title: 'Chapter Seven: The Bridge',
    episodeNum: 7,
    season: 5,
    synopsis: 'All vectors align as a monumental bridge of electromagnetic psychic energy is built to close the boundary. Realities collide, forcing members of the crew to make irreversible decisions.',
    duration: '1h 45m',
    airDate: 'To Be Released',
    director: 'The Duffer Brothers',
    ratingPv: 9.8,
    thumbnail: '/images/episodes/s5e7.jpg'
  },
  {
    id: 's5e8',
    title: 'Chapter Eight: The Rightside Up',
    episodeNum: 8,
    season: 5,
    synopsis: 'The breathtaking final stand. Eleven, Mike, Will, and the survivors throw everything into an absolute climax to banish Vecna once and for all, healing reality and closing the Hawkins gate forever.',
    duration: '2h 45m',
    airDate: 'To Be Released',
    director: 'The Duffer Brothers',
    ratingPv: 9.9,
    thumbnail: '/images/episodes/s5e8.jpg'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- Hawkins Town ---
  {
    id: 'g1',
    title: 'The Forest Bypass',
    category: 'Hawkins Town',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
    description: 'The thick, dense Indiana woods adjacent to Mirkwood road where Will Byers\' bicycle was recovered, slick with midnight dew and mist.'
  },
  {
    id: 'g2',
    title: 'Maple Street Sleepy Suburb',
    category: 'Hawkins Town',
    imageUrl: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=800',
    description: 'A quiet suburban street in Hawkins as night descends, lit by solitary mercury-vapor streetlamps during a heavy autumn storm.'
  },
  {
    id: 'g3',
    title: 'The Wheeler Basement',
    category: 'Hawkins Town',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
    description: 'The iconic wood-paneled subterranean sanctuary. Safe from the world above, where four young friends plotted campaigns and safe-harbored the mysterious Eleven.'
  },

  // --- Hawkins National Laboratory ---
  {
    id: 'g4',
    title: 'Rift Chamber Entrance',
    category: 'Hawkins National Laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    description: 'A sterile concrete containment corridor where researchers in protective hazmat suits descend to study the expanding magnetic anomaly.'
  },
  {
    id: 'g5',
    title: 'Mainframe Telemetry Grid',
    category: 'Hawkins National Laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c30d74?auto=format&fit=crop&q=80&w=800',
    description: 'Soviet decoding hardware and state-of-the-art monitor desks logging thermal anomalies deep in Hawkins Lab Sub-Level 4.'
  },
  {
    id: 'g6',
    title: 'The Hazmat Gate',
    category: 'Hawkins National Laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800',
    description: 'Armed security details and researchers preparing to descend directly into the high-risk, quarantined rift zone.'
  },

  // --- Upside Down ---
  {
    id: 'g7',
    title: 'The Crimson Void',
    category: 'Upside Down',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    description: 'A terrifying view of the rotten alternate dimension. Blood-red lightning illuminates spore-filled clouds and dead tree skeletons.'
  },
  {
    id: 'g8',
    title: 'Pulsing Bio-Organic Vines',
    category: 'Upside Down',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    description: 'Interlocking organic roots and decaying hive-minds breathing rhythmically under toxic subterranean spores.'
  },
  {
    id: 'g9',
    title: 'The Forgotten Woods',
    category: 'Upside Down',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    description: 'The ghost-like silhouette of Mirkwood inside the decay dimension, choked with eternal falling dark charcoal embers.'
  },

  // --- Creel House ---
  {
    id: 'g10',
    title: 'Grandfather Clock Chamber',
    category: 'Creel House',
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=800',
    description: 'The antique 1950s pendulum clock lodged in the plaster wall of Creel House, chiming four times to mark Vecna\'s countdown.'
  },
  {
    id: 'g11',
    title: 'The Dilapidated Creel Mansion',
    category: 'Creel House',
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
    description: 'The once-majestic Victorian home, now rotting in overgrown forest weeds and sealed by Hawkins Police hazard boards.'
  },
  {
    id: 'g12',
    title: 'Creel Attic Shattered Windows',
    category: 'Creel House',
    imageUrl: 'https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?auto=format&fit=crop&q=80&w=800',
    description: 'Moonlight filtering through shattered attic glass, where dust is suspended in air as a focal node of Vecna\'s mental reach.'
  },

  // --- Starcourt Mall ---
  {
    id: 'g13',
    title: 'The Neon Mall Atrium',
    category: 'Starcourt Mall',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    description: 'Bright hot-pink neon pillars and vintage storefronts under the massive Starcourt Mall multi-level glass skylight dome.'
  },
  {
    id: 'g14',
    title: 'Palace Arcade Rows',
    category: 'Starcourt Mall',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    description: 'Lines of illuminated cabinet systems casting synthwave glow on retro carpet floors, where MadMax took the Dig Dug crown.'
  },
  {
    id: 'g21',
    title: 'Scoops Ahoy Parlor Sign',
    category: 'Starcourt Mall',
    imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800',
    description: 'The maritime-themed ice-cream parlor where Steve Harrington and Robin Buckley deciphered secret Russian encrypted broadcasts from sub-levels.'
  },

  // --- Hellfire Club ---
  {
    id: 'g15',
    title: 'The Campaign Quest Table',
    category: 'Hellfire Club',
    imageUrl: 'https://images.unsplash.com/photo-1593814681262-71550947ff9f?auto=format&fit=crop&q=80&w=800',
    description: 'A dark wooden basement desk set with hand-painted lead miniatures, map sheets, and ready d20 polyhedral dice.'
  },
  {
    id: 'g16',
    title: 'The Dungeon Master\'s Screen',
    category: 'Hellfire Club',
    imageUrl: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=800',
    description: 'Eddie Munson\'s custom-crafted wooden DM reference barrier, surrounded by melting tallow candles in glass bottles.'
  },
  {
    id: 'g22',
    title: 'Eddie\'s Metal Guitar Solo',
    category: 'Hellfire Club',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    description: 'His prized red B.C. Rich Warlock guitar, tuned to shred a legendary metal solo to distract the demobat swarms.'
  },

  // --- Demogorgon & Creatures ---
  {
    id: 'g17',
    title: 'The Shedding Predator',
    category: 'Demogorgon & Creatures',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    description: 'A terrifying glimpse of a five-petaled face silhouette, fully open in the dark as it tracks the scent of blood.'
  },
  {
    id: 'g18',
    title: 'Junkyard Demodog Pack',
    category: 'Demogorgon & Creatures',
    imageUrl: 'https://images.unsplash.com/photo-1536846862558-b80d25f0dbae?auto=format&fit=crop&q=80&w=800',
    description: 'The foggy visual of Hawkins junkyard as Dustin\'s trap triggers, surrounded by rabid quadrupedal killers.'
  },
  {
    id: 'g23',
    title: 'The Mind Flayer Silhouette',
    category: 'Demogorgon & Creatures',
    imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800',
    description: 'A towering, spindly shadow made of animated dark smoke particles, hovering menacingly over the red storm sky.'
  },

  // --- Iconic Character Moments ---
  {
    id: 'g19',
    title: 'Misty Street Bicycles',
    category: 'Iconic Character Moments',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
    description: 'The legendary silhouette of four childhood friends racing through early morning fog on vintage Schwinn bicycles.'
  },
  {
    id: 'g20',
    title: 'TRC-12 Radio Transceiver',
    category: 'Iconic Character Moments',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=85&w=800',
    description: 'Dusty Realistic walkie talkies laying side-by-side on Mike\'s basement table, crackling with distant static frequencies.'
  },
  {
    id: 'g24',
    title: 'The Christmas light Bridge',
    category: 'Iconic Character Moments',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    description: 'Joyce Byers\' hand-painted lettered communication wall, flashing and surging under supernatural energy pulses.'
  }
];

export const VECNA_QUOTES = [
  "You belong here with me.",
  "Your suffering is almost at an end.",
  "You cannot escape your past.",
  "The world is sick. A pestilence. I will cure it."
];

export const VHS_STATIC_SVG = `data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.15"/></svg>`;
