export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'nigiri' | 'sashimi' | 'maki' | 'uramaki' | 'temaki' | 'zuppe' | 'bevande';
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  allergens?: string[];
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  tag?: string;
}

export interface BusinessHours {
  day: string;
  lunch: string;
  dinner: string;
  closed: boolean;
}
