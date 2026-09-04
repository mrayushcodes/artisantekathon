import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Mic,
  MicOff,
  Wand2,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  Volume2,
  Globe,
  IndianRupee,
  Package,
  Layers,
  Star,
  ShoppingBag,
  ExternalLink,
  Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  mockImageEnhancement,
  mockSpeechToText,
  mockProductCatalog,
  mockPricingRecommendation,
} from '@/services/aiServices';
import { Product } from '@/types';

const SAMPLE_RAW_IMAGE =
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80';
const SAMPLE_ENHANCED_IMAGE =
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80';

export const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addProduct, t, language, setLanguage } = useApp();

  // Wizard Step (0: Photo, 1: Describe, 2: Price, 3: Review)
  const initialStep = parseInt(searchParams.get('step') || '0', 10);
  const [step, setStep] = useState(initialStep);

  // Step 1: Image Studio State
  const [imageTab, setImageTab] = useState<'enhanced' | 'original' | 'studio'>('enhanced');
  const [selectedRawImage, setSelectedRawImage] = useState<string | null>(SAMPLE_RAW_IMAGE);
  const [enhancedImage, setEnhancedImage] = useState<string>(SAMPLE_ENHANCED_IMAGE);
  const [isEnhancingImage, setIsEnhancingImage] = useState(false);
  const [imageProcessingChecks, setImageProcessingChecks] = useState({
    backgroundRemoved: true,
    lightingImproved: true,
    colorsCorrected: true,
    productCentered: true,
    ecommerceFormatCreated: true,
  });

  // Step 2: Voice Auto-Cataloger State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptReady, setTranscriptReady] = useState(true);
  const [catalogLanguage, setCatalogLanguage] = useState<'en' | 'hi'>('en');
  const [titleEn, setTitleEn] = useState('Handcrafted Phulkari Cotton Dupatta');
  const [titleHi, setTitleHi] = useState('हस्तनिर्मित फुलकारी कॉटन दुपट्टा');
  const [descEn, setDescEn] = useState(
    'An authentic hand-embroidered Phulkari dupatta crafted with dedication by women artisans from Punjab. Made on pure, breathable handloom cotton, it features vibrant geometric Bagh and Chope patterns stitched with untreated silk thread. Perfect for festive celebrations, weddings, and traditional elegance.'
  );
  const [descHi, setDescHi] = useState(
    'पंजाब की महिला कारीगरों द्वारा पूरी निष्ठा से तैयार किया गया प्रामाणिक हस्तनिर्मित फुलकारी दुपट्टा। शुद्ध, हवादार हैंडलूम कॉटन पर जीवंत ज्यामितीय बाग और चोप डिज़ाइन की सुंदर सुई-कशीदाकारी। त्योहारों, विवाह उत्सवों और पारंपरिक परिधान के लिए उत्तम।'
  );
  const [craft, setCraft] = useState('Phulkari');
  const [material, setMaterial] = useState('100% Pure Cotton with Silk Floss');
  const [origin, setOrigin] = useState('Patiala, Punjab');
  const [productionTime, setProductionTime] = useState('3 days');
  const [category, setCategory] = useState('Textiles');
  const [keywords, setKeywords] = useState([
    'Phulkari Dupatta',
    'Punjabi Handicraft',
    'Handmade Dupatta',
    'Indian Textile',
    'Cotton Dupatta',
  ]);

  // Step 3: Smart Pricing State
  const [materialCost, setMaterialCost] = useState(500);
  const [labourCost, setLabourCost] = useState(400);
  const [packagingCost, setPackagingCost] = useState(50);
  const [desiredMargin, setDesiredMargin] = useState(30);
  const [recommendedPrice, setRecommendedPrice] = useState(1499);
  const [priceRange, setPriceRange] = useState<[number, number]>([1299, 1699]);
  const [confidenceScore, setConfidenceScore] = useState(87);
  const [isRecalculatingPrice, setIsRecalculatingPrice] = useState(false);

  // Step 4: Final Product & Publish State
  const [stock, setStock] = useState(12);
  const [isPublished, setIsPublished] = useState(false);
  const [newlyCreatedProduct, setNewlyCreatedProduct] = useState<Product | null>(null);

  // Sync step if search param changes
  useEffect(() => {
    const paramStep = searchParams.get('step');
    if (paramStep !== null) {
      setStep(parseInt(paramStep, 10));
    }
  }, [searchParams]);

  // Recalculate price whenever costs change
  useEffect(() => {
    const updatePricing = async () => {
      setIsRecalculatingPrice(true);
      const res = await mockPricingRecommendation({
        material: materialCost,
        labour: labourCost,
        packaging: packagingCost,
        desiredMargin,
      });
      setRecommendedPrice(res.recommendedPrice);
      setPriceRange(res.suggestedRange);
      setConfidenceScore(res.confidenceScore);
      setIsRecalculatingPrice(false);
    };

    updatePricing();
  }, [materialCost, labourCost, packagingCost, desiredMargin]);

  // Simulate Image Processing
  const handleEnhanceImage = async () => {
    setIsEnhancingImage(true);
    const res = await mockImageEnhancement(selectedRawImage || undefined);
    setEnhancedImage(res.enhancedUrl);
    setImageProcessingChecks(res.checks);
    setIsEnhancingImage(false);
  };

  // Simulate Voice Recording
  const toggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 6) {
            clearInterval(timer);
            setIsRecording(false);
            setTranscriptReady(true);
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setTranscriptReady(true);
    }
  };

  // Publish Listing
  const handlePublish = () => {
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: titleEn,
      hindiName: titleHi,
      craft,
      category,
      price: recommendedPrice,
      marketRange: priceRange,
      stock,
      status: 'Published',
      rawImage: selectedRawImage || SAMPLE_RAW_IMAGE,
      enhancedImage,
      studioImage: enhancedImage,
      activeImage: enhancedImage,
      views: 1,
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 1,
      material,
      origin,
      productionTime,
      description: descEn,
      hindiDescription: descHi,
      keywords,
      costs: {
        material: materialCost,
        labour: labourCost,
        packaging: packagingCost,
        desiredMargin,
      },
      aiInsight: 'Newly published via ArtisanAi Studio! ONDC sync active.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    addProduct(newProduct);
    setNewlyCreatedProduct(newProduct);
    setIsPublished(true);
  };

  // Confetti / Celebration View if Published
  if (isPublished) {
    return (
      <div className="mx-auto max-w-2xl py-12 px-4 text-center animate-in zoom-in-95 duration-300">
        <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 size={54} strokeWidth={2.5} />
        </div>

        <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-black uppercase tracking-widest text-emerald-800">
          🎉 {t('productPublished')}
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {titleEn}
        </h1>
        <p className="mt-2 text-lg text-amber-600 font-bold">
          {titleHi} · ₹{recommendedPrice.toLocaleString('en-IN')}
        </p>

        <p className="mx-auto mt-4 max-w-md text-sm text-stone-600 leading-relaxed">
          {t('productPublishedSub')} AI has generated bilingual catalog copy, high-resolution imagery, and enabled ONDC and B2B visibility.
        </p>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
            Digital Readiness Summary
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl bg-stone-50 p-2.5">
              <span className="text-stone-400 block">Pricing</span>
              <strong className="text-stone-900 text-sm">₹{recommendedPrice}</strong>
            </div>
            <div className="rounded-xl bg-stone-50 p-2.5">
              <span className="text-stone-400 block">Stock Ready</span>
              <strong className="text-stone-900 text-sm">{stock} units</strong>
            </div>
            <div className="rounded-xl bg-stone-50 p-2.5">
              <span className="text-stone-400 block">ONDC Status</span>
              <strong className="text-emerald-700 text-sm font-bold">Synced ✓</strong>
            </div>
            <div className="rounded-xl bg-stone-50 p-2.5">
              <span className="text-stone-400 block">B2B Match</span>
              <strong className="text-amber-700 text-sm font-bold">4 Buyers</strong>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="rounded-full bg-stone-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-stone-800 transition shadow-md"
          >
            {t('viewInCatalog')}
          </Link>
          <Link
            to="/buyers"
            className="rounded-full bg-amber-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-950 hover:bg-amber-400 transition shadow-md flex items-center gap-2"
          >
            <Users size={16} />
            <span>{t('findBuyersForThis')}</span>
          </Link>
          <button
            onClick={() => {
              setIsPublished(false);
              setStep(0);
            }}
            className="rounded-full border border-stone-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-stone-700 hover:bg-stone-50 transition"
          >
            + Create Another Product
          </button>
        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: t('stepPhoto'), desc: 'AI Image Studio' },
    { num: 2, label: t('stepDescribe'), desc: 'Voice Auto-Catalog' },
    { num: 3, label: t('stepPrice'), desc: 'Smart Pricing' },
    { num: 4, label: t('stepReview'), desc: 'Final Review & Publish' },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in duration-200">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-1">
            <Link to="/dashboard" className="hover:text-stone-900">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-amber-600">AI Product Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {t('aiStudio')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {step === 0 && t('photoStepSubtitle')}
            {step === 1 && t('voicePromptSub')}
            {step === 2 && t('pricingStepSubtitle')}
            {step === 3 && t('finalPreviewSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            Step {step + 1} of 4
          </span>
        </div>
      </div>

      {/* Wizard Progress Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-2">
          {stepsList.map((item, idx) => {
            const isCompleted = idx < step;
            const isCurrent = idx === step;
            return (
              <button
                key={item.num}
                onClick={() => setStep(idx)}
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 rounded-xl p-2 sm:p-2.5 text-left transition ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-stone-100 text-stone-900 font-semibold'
                    : 'text-stone-400 hover:bg-stone-50'
                }`}
              >
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${
                    isCurrent
                      ? 'bg-stone-950 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : item.num}
                </div>
                <div className="hidden sm:block min-w-0">
                  <div className="text-xs font-black truncate">{item.label}</div>
                  <div className={`text-[10px] truncate ${isCurrent ? 'text-stone-900' : 'text-stone-500'}`}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================== */}
      {/* STEP 1: AI IMAGE STUDIO */}
      {/* ========================================================== */}
      {step === 0 && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Image Preview & Enhancement Display */}
            <div className="lg:col-span-7 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md">
                {/* Visual Mode Tabs */}
                <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-4 py-2.5 text-xs">
                  <span className="font-bold text-stone-700">Display View</span>
                  <div className="flex rounded-lg bg-stone-200/80 p-0.5">
                    <button
                      onClick={() => setImageTab('original')}
                      className={`rounded-md px-3 py-1 font-bold transition ${
                        imageTab === 'original'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {t('originalTab')}
                    </button>
                    <button
                      onClick={() => setImageTab('enhanced')}
                      className={`rounded-md px-3 py-1 font-bold transition ${
                        imageTab === 'enhanced'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {t('enhancedTab')}
                    </button>
                    <button
                      onClick={() => setImageTab('studio')}
                      className={`rounded-md px-3 py-1 font-bold transition ${
                        imageTab === 'studio'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {t('studioTab')}
                    </button>
                  </div>
                </div>

                {/* Main Viewport */}
                <div className="relative aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden">
                  {isEnhancingImage ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-500 text-stone-950 animate-bounce">
                        <Wand2 size={28} />
                      </div>
                      <span className="text-base font-black text-stone-900">
                        AI Processing Image...
                      </span>
                      <span className="text-xs text-stone-500 max-w-xs">
                        Removing cluttered background, calibrating fabric colors & centering craft product
                      </span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={
                          imageTab === 'original'
                            ? selectedRawImage || SAMPLE_RAW_IMAGE
                            : enhancedImage
                        }
                        alt="Product preview"
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute bottom-3 left-3 rounded-lg bg-stone-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                        {imageTab === 'original' ? 'Raw Artisan Photo' : 'Studio E-commerce Enhanced'}
                      </div>
                      {imageTab !== 'original' && (
                        <div className="absolute top-3 right-3 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-black text-white shadow-md">
                          ✓ E-commerce Ready (300 DPI)
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Upload Controls Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedRawImage(SAMPLE_RAW_IMAGE)}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-50 transition"
                >
                  {t('useSamplePhoto')}
                </button>
                <label className="cursor-pointer rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-50 transition flex items-center gap-1.5">
                  <Upload size={14} />
                  <span>{t('uploadPhoto')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedRawImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                <button
                  onClick={handleEnhanceImage}
                  disabled={isEnhancingImage}
                  className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Re-run AI Enhancement</span>
                </button>
              </div>
            </div>

            {/* AI Diagnostics & Analysis Side Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-700">
                      <Sparkles size={16} />
                    </div>
                    <h3 className="font-extrabold text-base text-stone-900">
                      AI Image Checklist
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase">
                    Optimal Quality
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                    <span className="text-stone-700 font-medium">Background removed</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={14} strokeWidth={3} /> Done
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                    <span className="text-stone-700 font-medium">Lighting & shadows balanced</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={14} strokeWidth={3} /> Done
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                    <span className="text-stone-700 font-medium">Thread colors & contrast restored</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={14} strokeWidth={3} /> Done
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                    <span className="text-stone-700 font-medium">Product centered & squared</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={14} strokeWidth={3} /> Done
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
                    <span className="text-stone-700 font-medium">E-commerce format created</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={14} strokeWidth={3} /> Done
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 block mb-0.5">Important Artisan Rule:</strong>
                  The product itself remains 100% authentic and unaltered. AI only cleans the background and improves presentation lighting for digital buyers.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* STEP 2: VOICE AUTO-CATALOGER */}
      {/* ========================================================== */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Voice Recording Area */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs text-center flex flex-col items-center justify-between min-h-[380px]">
                <div className="w-full flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-amber-600">Voice Assistant</span>
                  <span>Audio Language: Hindi / Punjabi</span>
                </div>

                <div className="my-6 flex flex-col items-center">
                  <h3 className="text-xl font-black text-stone-900">
                    "{t('voicePromptHindi')}"
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 max-w-xs">
                    Tap the microphone and speak naturally about the craft, fabric, and time taken.
                  </p>

                  {/* Pulsing Mic Button */}
                  <button
                    onClick={toggleRecording}
                    className={`mt-6 grid h-24 w-24 place-items-center rounded-full transition-all shadow-xl ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-200'
                        : 'bg-amber-500 text-stone-950 hover:bg-amber-400 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
                  </button>

                  <div className="mt-4 text-xs font-bold text-stone-700">
                    {isRecording ? (
                      <span className="text-red-600 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                        {t('listening')} (00:0{recordingSeconds})
                      </span>
                    ) : (
                      <span>{t('tapToSpeak')}</span>
                    )}
                  </div>

                  {/* Simulated Waveform Display */}
                  <div className="mt-4 flex items-center gap-1 h-8">
                    {[16, 28, 40, 22, 34, 18, 42, 30, 20, 36, 24, 16].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isRecording ? 'bg-amber-500' : 'bg-stone-300'
                        }`}
                        style={{ height: isRecording ? `${h}px` : '8px' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Transcribed Raw Hindi Note */}
                <div className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3.5 text-left text-xs">
                  <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">
                    Simulated Voice Input (Hindi)
                  </div>
                  <p className="text-stone-800 italic">
                    "यह हाथ से बनी हुई फुलकारी दुपट्टा है। इसे पंजाब के कारीगरों ने बनाया है। इसमें कॉटन का कपड़ा इस्तेमाल हुआ है और इसे बनाने में तीन दिन लगे।"
                  </p>
                </div>
              </div>

              {/* AI Understanding Extracted Entities */}
              <div className="rounded-2xl border border-stone-200 bg-amber-50/70 p-4 text-xs">
                <div className="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} /> {t('aiUnderstanding')}
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="text-stone-400 block">Product:</span>
                    <strong>Phulkari Dupatta</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Material:</span>
                    <strong>Cotton</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Craft:</span>
                    <strong>Phulkari</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Origin:</span>
                    <strong>Punjab</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Production Time:</span>
                    <strong>3 days</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Category:</span>
                    <strong>Textiles</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Generated Listing (Bilingual & Editable) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-700 font-bold text-xs">
                      AI
                    </span>
                    <h3 className="font-extrabold text-base text-stone-900">
                      {t('productDetailTitle')}
                    </h3>
                  </div>

                  {/* Language switch for preview */}
                  <div className="flex rounded-lg bg-stone-100 p-0.5 text-xs">
                    <button
                      onClick={() => setCatalogLanguage('en')}
                      className={`rounded-md px-3 py-1 font-bold transition ${
                        catalogLanguage === 'en'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-500'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setCatalogLanguage('hi')}
                      className={`rounded-md px-3 py-1 font-bold transition ${
                        catalogLanguage === 'hi'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'text-stone-500'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                {/* Editable Title */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">
                    Product Title ({catalogLanguage === 'en' ? 'English' : 'हिन्दी'})
                  </label>
                  <input
                    type="text"
                    value={catalogLanguage === 'en' ? titleEn : titleHi}
                    onChange={(e) =>
                      catalogLanguage === 'en'
                        ? setTitleEn(e.target.value)
                        : setTitleHi(e.target.value)
                    }
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm font-bold text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Editable Description */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">
                    E-Commerce Description ({catalogLanguage === 'en' ? 'English' : 'हिन्दी'})
                  </label>
                  <textarea
                    rows={4}
                    value={catalogLanguage === 'en' ? descEn : descHi}
                    onChange={(e) =>
                      catalogLanguage === 'en'
                        ? setDescEn(e.target.value)
                        : setDescHi(e.target.value)
                    }
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Specifications Grid */}
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-2">
                    Extracted Product Specifications
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Material</label>
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-semibold text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Craft Tradition</label>
                      <input
                        type="text"
                        value={craft}
                        onChange={(e) => setCraft(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-semibold text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Origin / State</label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-semibold text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Production Time</label>
                      <input
                        type="text"
                        value={productionTime}
                        onChange={(e) => setProductionTime(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-semibold text-stone-800"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Keywords Chips */}
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-2">
                    SEO Keywords for Marketplace Visibility
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* STEP 3: AI SMART PRICING */}
      {/* ========================================================== */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Cost Input Fields */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
                <div>
                  <h3 className="text-lg font-black text-stone-900">
                    {t('pricingStepTitle')}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    Enter your real costs. ArtisanAi calculates a competitive price that protects your craft labour.
                  </p>
                </div>

                {/* Cost Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                      <span>{t('materialCost')}</span>
                      <span className="font-mono text-amber-700">₹{materialCost}</span>
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={materialCost}
                      onChange={(e) => setMaterialCost(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[11px] text-stone-400">
                      Cotton fabric, pat silk floss, dyes
                    </span>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                      <span>{t('labourCost')} (3 Days Handcraft)</span>
                      <span className="font-mono text-amber-700">₹{labourCost}</span>
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="1500"
                      step="50"
                      value={labourCost}
                      onChange={(e) => setLabourCost(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[11px] text-stone-400">
                      Fair artisanal needlecraft compensation
                    </span>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                      <span>{t('packagingCost')}</span>
                      <span className="font-mono text-amber-700">₹{packagingCost}</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={packagingCost}
                      onChange={(e) => setPackagingCost(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[11px] text-stone-400">
                      Eco-friendly butter paper, craft tag
                    </span>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                      <span>{t('desiredMargin')}</span>
                      <span className="font-mono text-amber-700">{desiredMargin}%</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={desiredMargin}
                      onChange={(e) => setDesiredMargin(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-stone-50 p-3 text-xs text-stone-600 flex items-center justify-between">
                  <span>Total Direct Cost:</span>
                  <strong className="text-stone-900 text-sm">
                    ₹{materialCost + labourCost + packagingCost}
                  </strong>
                </div>
              </div>
            </div>

            {/* Right Column: AI Recommended Price Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl border-2 border-amber-400 bg-stone-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 px-4 py-1 text-[10px] font-black text-stone-950 uppercase tracking-widest rounded-bl-xl">
                  {t('aiEstimateBadge')}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Sparkles size={14} /> AI Valuation Engine
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-stone-800 pb-6">
                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">
                      {t('recommendedPrice')}
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                      ₹{recommendedPrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <div className="text-xs text-stone-300">
                      {t('suggestedRange')}:{' '}
                      <strong className="text-white">
                        ₹{priceRange[0]} — ₹{priceRange[1]}
                      </strong>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                      <span>{t('confidence')}: {confidenceScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Why this price explanation */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    {t('whyThisPrice')}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Based on your material cost (₹{materialCost}), estimated labour (₹{labourCost}), craft category and comparable handcrafted textile products, ₹{recommendedPrice.toLocaleString('en-IN')} provides a competitive margin while remaining market-friendly.
                  </p>
                </div>

                {/* Breakdown Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-800 text-xs">
                  <div className="rounded-xl bg-stone-800/80 p-3">
                    <span className="text-stone-400 block">{t('materialBreakdown')}</span>
                    <strong className="text-white text-sm">₹{materialCost}</strong>
                  </div>
                  <div className="rounded-xl bg-stone-800/80 p-3">
                    <span className="text-stone-400 block">{t('labourBreakdown')}</span>
                    <strong className="text-white text-sm">₹{labourCost}</strong>
                  </div>
                  <div className="rounded-xl bg-stone-800/80 p-3">
                    <span className="text-stone-400 block">{t('packagingBreakdown')}</span>
                    <strong className="text-white text-sm">₹{packagingCost}</strong>
                  </div>
                  <div className="rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-3">
                    <span className="text-emerald-300 block">{t('estimatedProfit')}</span>
                    <strong className="text-emerald-400 text-sm">
                      ₹{Math.max(0, recommendedPrice - (materialCost + labourCost + packagingCost))}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* STEP 4: FINAL PRODUCT PREVIEW */}
      {/* ========================================================== */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-md">
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Product Visual Gallery */}
              <div className="lg:col-span-5 space-y-3">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100 border border-stone-200">
                  <img
                    src={enhancedImage}
                    alt={titleEn}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-14 w-14 rounded-xl border-2 border-amber-500 overflow-hidden">
                    <img src={enhancedImage} alt="thumbnail" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-14 w-14 rounded-xl border border-stone-200 overflow-hidden opacity-60">
                    <img src={selectedRawImage || SAMPLE_RAW_IMAGE} alt="thumbnail" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Product Marketplace Details */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                      {craft}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs font-semibold text-stone-500">{origin}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                    {titleEn}
                  </h2>
                  <p className="text-sm font-bold text-amber-700 mt-0.5">
                    {titleHi}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-amber-500">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-600">
                    5.0 (New Listing Ready)
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-stone-900">
                    ₹{recommendedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    ₹{Math.round(recommendedPrice * 1.25)}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                    Fair Craft Pricing
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200 pt-3">
                  {descEn}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs border-t border-stone-200 pt-3">
                  <div>
                    <span className="text-stone-400 block">Material</span>
                    <strong className="text-stone-800">{material}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Production Time</span>
                    <strong className="text-stone-800">{productionTime}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Initial Stock</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="w-16 rounded border border-stone-300 px-2 py-0.5 text-xs font-bold"
                      />
                      <span className="text-stone-400">units</span>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer Buttons */}
      <div className="flex items-center justify-between border-t border-stone-200 pt-6">
        <button
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="rounded-full border border-stone-300 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-30 transition"
        >
          ← {t('editStep')} Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => Math.min(3, prev + 1))}
            className="rounded-full bg-stone-900 px-8 py-3 text-xs sm:text-sm font-black text-white hover:bg-amber-500 hover:text-stone-950 transition flex items-center gap-2 shadow-md"
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="rounded-full bg-amber-500 px-8 py-3 text-xs sm:text-sm font-black text-stone-950 hover:bg-amber-400 transition flex items-center gap-2 shadow-xl shadow-amber-500/20"
          >
            <Sparkles size={16} />
            <span>{t('publishListing')}</span>
          </button>
        )}
      </div>
    </div>
  );
};
