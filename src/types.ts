export interface Character {
  id: string;
  name: string;
  alterEgo: string;
  actor: string;
  seasonIntroduced: number;
  status: 'Alive' | 'Deceased' | 'Missing' | 'Trapped in Upside Down' | 'Under Mind Flayer Control';
  quotes: string[];
  description: string;
  ability: string;
  powerLevel: number; // 1-100%
  dangerLevel: number; // 1-100%
  backgroundRealWorld: string; // Tailwind bg color or class
  backgroundUpsideDown: string; // Tailwind bg color or class
  image: string;
  fallbackImage?: string;
}

export interface Episode {
  id: string;
  title: string;
  episodeNum: number;
  season: number;
  synopsis: string;
  duration: string;
  airDate: string;
  director: string;
  ratingPv: number; // custom retro popular vote out of 10
  image?: string;
  thumbnail?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface AtmosphereSound {
  name: string;
  url: string;
}

export interface TrailerData {
  season: number;
  title: string;
  youtubeId: string;
  thumbnail: string;
  description?: string;
}
