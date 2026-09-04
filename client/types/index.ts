export type Language = 'en' | 'hi';

export interface ArtisanProfile {
  id: string;
  name: string;
  hindiName: string;
  craft: string;
  hindiCraft: string;
  location: string;
  hindiLocation: string;
  avatar: string;
  artisanId: string;
  udyamId: string;
  phone: string;
  experienceYears: number;
  bio: string;
  hindiBio: string;
  verified: boolean;
  bankAccount: {
    holder: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    verified: boolean;
  };
}

export type ProductStatus = 'Published' | 'Draft' | 'Sold Out';

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  craft: string;
  category: string;
  price: number;
  marketRange: [number, number];
  stock: number;
  status: ProductStatus;
  rawImage: string;
  enhancedImage: string;
  studioImage: string;
  activeImage: string;
  views: number;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  material: string;
  origin: string;
  productionTime: string;
  description: string;
  hindiDescription: string;
  keywords: string[];
  dimensions?: string;
  weight?: string;
  costs?: {
    material: number;
    labour: number;
    packaging: number;
    desiredMargin: number;
  };
  aiInsight?: string;
  createdAt: string;
}

export interface BuyerLead {
  id: string;
  organization: string;
  contactPerson: string;
  category: string;
  lookingFor: string;
  quantity: string;
  preferredPrice: string;
  location: string;
  matchScore: number;
  badge?: string;
  deadline: string;
  description: string;
  status: 'open' | 'proposal_sent' | 'negotiating';
}

export interface MarketplacePartner {
  id: string;
  name: string;
  shortName: string;
  type: string;
  logo: string;
  status: 'Integration Ready' | 'Coming Soon' | 'Live Pilot';
  description: string;
  benefits: string[];
  docsUrl?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: string[];
}
