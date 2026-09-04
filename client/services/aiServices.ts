// Mock AI Services Abstraction for KarigarSetu
// Separate from UI components for clean architecture and future live AI/Gemini integration.

export interface ImageEnhancementResult {
  originalUrl: string;
  enhancedUrl: string;
  studioUrl: string;
  detectedCraft: string;
  confidence: number;
  checks: {
    backgroundRemoved: boolean;
    lightingImproved: boolean;
    colorsCorrected: boolean;
    productCentered: boolean;
    ecommerceFormatCreated: boolean;
  };
}

export interface SpeechToTextResult {
  audioDurationSeconds: number;
  hindiTranscript: string;
  englishTranslation: string;
  languageDetected: string;
  entities: {
    productName: string;
    material: string;
    craft: string;
    origin: string;
    productionTime: string;
    category: string;
  };
}

export interface ProductCatalogResult {
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  details: {
    craft: string;
    material: string;
    origin: string;
    productionTime: string;
    category: string;
    care: string;
  };
  keywords: string[];
}

export interface PricingRecommendationResult {
  recommendedPrice: number;
  suggestedRange: [number, number];
  b2bWholesaleRange: [number, number];
  confidenceScore: number;
  breakdown: {
    material: number;
    labour: number;
    packaging: number;
    estimatedProfit: number;
  };
  marginPercent: number;
  rationale: string;
  marketComparables: {
    title: string;
    avgPrice: number;
  }[];
}

export const mockImageEnhancement = async (
  rawImageUrl?: string
): Promise<ImageEnhancementResult> => {
  // Realistic simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const fallbackRaw = 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80';
  const enhanced = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80';

  return {
    originalUrl: rawImageUrl || fallbackRaw,
    enhancedUrl: enhanced,
    studioUrl: enhanced,
    detectedCraft: 'Phulkari Floral Needlecraft',
    confidence: 0.94,
    checks: {
      backgroundRemoved: true,
      lightingImproved: true,
      colorsCorrected: true,
      productCentered: true,
      ecommerceFormatCreated: true,
    },
  };
};

export const mockSpeechToText = async (): Promise<SpeechToTextResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    audioDurationSeconds: 18,
    hindiTranscript:
      'यह हाथ से बनी हुई फुलकारी दुपट्टा है। इसे पंजाब के कारीगरों ने बनाया है। इसमें कॉटन का कपड़ा इस्तेमाल हुआ है और इसे बनाने में तीन दिन लगे।',
    englishTranslation:
      'This is a hand-crafted Phulkari dupatta made by Punjabi artisans. Pure cotton fabric has been used and it took three days to complete.',
    languageDetected: 'Hindi (Gurmukhi accent)',
    entities: {
      productName: 'Phulkari Dupatta',
      material: 'Cotton',
      craft: 'Phulkari',
      origin: 'Punjab',
      productionTime: '3 days',
      category: 'Textiles',
    },
  };
};

export const mockProductCatalog = async (
  extractedData?: Partial<SpeechToTextResult['entities']>
): Promise<ProductCatalogResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  return {
    titleEn: 'Handcrafted Phulkari Cotton Dupatta',
    titleHi: 'हस्तनिर्मित फुलकारी कॉटन दुपट्टा',
    descriptionEn:
      'An authentic hand-embroidered Phulkari dupatta crafted with dedication by women artisans from Punjab. Made on pure, breathable handloom cotton, it features vibrant geometric Bagh and Chope patterns stitched with untreated silk thread. Perfect for festive celebrations, weddings, and traditional elegance.',
    descriptionHi:
      'पंजाब की महिला कारीगरों द्वारा पूरी निष्ठा से तैयार किया गया प्रामाणिक हस्तनिर्मित फुलकारी दुपट्टा। शुद्ध, हवादार हैंडलूम कॉटन पर जीवंत ज्यामितीय बाग और चोप डिज़ाइन की सुंदर सुई-कशीदाकारी। त्योहारों, विवाह उत्सवों और पारंपरिक परिधान के लिए उत्तम।',
    details: {
      craft: extractedData?.craft || 'Phulkari',
      material: extractedData?.material || '100% Pure Cotton with Silk Floss',
      origin: extractedData?.origin || 'Punjab, India',
      productionTime: extractedData?.productionTime || '3 days',
      category: extractedData?.category || 'Textiles',
      care: 'Dry clean recommended or gentle cold water handwash.',
    },
    keywords: [
      'Phulkari Dupatta',
      'Punjabi Handicraft',
      'Handmade Dupatta',
      'Indian Textile',
      'Cotton Dupatta',
      'Ethnic Scarf',
    ],
  };
};

export const mockPricingRecommendation = async (costs: {
  material: number;
  labour: number;
  packaging: number;
  desiredMargin: number;
}): Promise<PricingRecommendationResult> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const totalCost = costs.material + costs.labour + costs.packaging;
  // Calculate recommended price based on costs & margin formula
  const marginMultiplier = 1 + (costs.desiredMargin || 30) / 100;
  let recommended = Math.round(totalCost * marginMultiplier);
  // Round to friendly Indian consumer price ending in 99 or 50 if close
  if (recommended < 1550 && recommended > 1400) {
    recommended = 1499;
  }

  const profit = Math.max(0, recommended - totalCost);

  return {
    recommendedPrice: recommended,
    suggestedRange: [Math.round(recommended * 0.86), Math.round(recommended * 1.14)],
    b2bWholesaleRange: [Math.round(recommended * 0.75), Math.round(recommended * 0.85)],
    confidenceScore: 87,
    breakdown: {
      material: costs.material,
      labour: costs.labour,
      packaging: costs.packaging,
      estimatedProfit: profit,
    },
    marginPercent: Math.round((profit / recommended) * 100),
    rationale: `Based on your material cost (₹${costs.material}), estimated labour (₹${costs.labour}), craft category and comparable handcrafted textile products, ₹${recommended.toLocaleString('en-IN')} provides a competitive margin while remaining market-friendly.`,
    marketComparables: [
      { title: 'Handmade Punjabi Phulkari Dupattas (Boutiques)', avgPrice: 1650 },
      { title: 'Craftsvilla / E-commerce Handloom Dupattas', avgPrice: 1450 },
      { title: 'Local Exhibition Direct Sales', avgPrice: 1350 },
    ],
  };
};

export const mockBuyerMatching = async (craftCategory: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      name: 'Delhi Handicraft Collective',
      targetCategory: craftCategory || 'Textiles',
      requiredQty: '50–100 units',
      score: 96,
    },
    {
      name: 'Boutique India Retail',
      targetCategory: craftCategory || 'Textiles',
      requiredQty: '25 units',
      score: 92,
    },
    {
      name: 'Heritage Home Stores',
      targetCategory: craftCategory || 'Textiles',
      requiredQty: '100+ units',
      score: 89,
    },
  ];
};

export const mockBusinessAdvisor = async (userQuery: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const queryLower = userQuery.toLowerCase();

  if (queryLower.includes('sell more') || queryLower.includes('phulkari')) {
    return 'Your Phulkari products receive the most attention (342 views). I recommend adding 2–3 new designs with festive pastel colors, improving product photography with natural daylight, and directly targeting boutique buyers in Delhi and Mumbai.';
  }

  if (queryLower.includes('charge') || queryLower.includes('price')) {
    return 'For authentic hand-embroidered dupattas taking 3 days of needlework, charging between ₹1,299 and ₹1,699 gives you a fair return. Never underprice your labour — craft buyers value verified handmade authenticity.';
  }

  if (queryLower.includes('description') || queryLower.includes('improve')) {
    return 'Great descriptions tell three things: 1) What it is made of, 2) The story and region behind the craft, and 3) How to style or care for it. Mentioning "Authentic Patiala Phulkari with untreated pat silk" increases buyer trust by 45%.';
  }

  if (queryLower.includes('buyer') || queryLower.includes('b2b')) {
    return 'You currently have 4 matching buyer leads in "Find Buyers"! The Delhi Handicraft Collective is actively looking for 50-100 Phulkari units at ₹1,150–₹1,350. You can submit your proposal directly from the portal.';
  }

  if (queryLower.includes('next') || queryLower.includes('product')) {
    return 'Based on autumn buyer demand trends, handmade tote bags and lightweight summer stoles are selling fastest with high re-orders. Consider making small accessory items using leftover Phulkari fabric.';
  }

  return 'Namaste Gurpreet! I am your digital business manager. I can help calculate prices, improve your product story, find bulk buyers, or prepare your catalog for ONDC and GeM marketplaces.';
};
