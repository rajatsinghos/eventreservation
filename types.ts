
export interface VenueFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface PartyDetails {
  title: string;
  tagline: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  grounding?: any[];
}
