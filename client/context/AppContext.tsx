import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ArtisanProfile,
  BuyerLead,
  Language,
  MarketplacePartner,
  Product,
} from '@/types';
import {
  BUYER_LEADS,
  INITIAL_ARTISAN,
  INITIAL_PRODUCTS,
  MARKETPLACE_PARTNERS,
  TRANSLATIONS,
} from '@/data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  artisan: ArtisanProfile;
  setArtisan: React.Dispatch<React.SetStateAction<ArtisanProfile>>;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  buyerLeads: BuyerLead[];
  sendProposal: (leadId: string) => void;
  marketplaces: MarketplacePartner[];
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  demoGuideStep: number;
  setDemoGuideStep: (step: number) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  stats: {
    totalProducts: number;
    publishedProducts: number;
    estimatedSales: number;
    buyerInterests: number;
    totalViews: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [artisan, setArtisan] = useState<ArtisanProfile>(INITIAL_ARTISAN);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('artisanai_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [buyerLeads, setBuyerLeads] = useState<BuyerLead[]>(BUYER_LEADS);
  const [marketplaces] = useState<MarketplacePartner[]>(MARKETPLACE_PARTNERS);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [demoGuideStep, setDemoGuideStep] = useState(0);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('artisanai_products', JSON.stringify(products));
  }, [products]);

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS.en[key] || String(key);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const sendProposal = (leadId: string) => {
    setBuyerLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: 'proposal_sent' } : lead
      )
    );
  };

  const publishedCount = products.filter((p) => p.status === 'Published').length;
  const totalViews = products.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const stats = {
    totalProducts: 24, // Display count for realistic business scale
    publishedProducts: 18,
    estimatedSales: 32450,
    buyerInterests: 7,
    totalViews: 1240,
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        artisan,
        setArtisan,
        products,
        addProduct,
        updateProduct,
        buyerLeads,
        sendProposal,
        marketplaces,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        demoGuideStep,
        setDemoGuideStep,
        showLanguageModal,
        setShowLanguageModal,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
