import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Mic2,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Store,
  Trophy,
  Users,
  Wand2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { LanguageSelectorModal } from '@/components/LanguageSelectorModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setShowLanguageModal, t } = useApp();

  const handleStartDemo = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-stone-900 selection:bg-amber-400 selection:text-stone-950 font-sans">
      {/* Top Notice Bar for SIH */}
      <div className="bg-stone-900 px-4 py-2 text-center text-xs font-semibold text-stone-300 flex items-center justify-center gap-2">
        <Trophy size={14} className="text-amber-400" />
        <span>Smart India Hackathon Prototype</span>
        <span className="text-stone-500">•</span>
        <span className="text-amber-300">Empowering 200M+ Indian Artisans & Handloom Weavers</span>
        <button
          onClick={handleStartDemo}
          className="ml-2 rounded-full bg-amber-500 px-3 py-0.5 text-[11px] font-bold text-stone-950 hover:bg-amber-400 transition"
        >
          Instant Demo Mode →
        </button>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-stone-900">
                Karigar<span className="text-amber-600">Setu</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-500">
                {language === 'hi' ? 'हुनर से व्यापार तक' : 'From Craft to Commerce'}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold text-stone-600 md:flex">
            <a href="#transformation" className="hover:text-amber-600 transition">
              AI Transformation
            </a>
            <a href="#features" className="hover:text-amber-600 transition">
              Features
            </a>
            <a href="#buyers" className="hover:text-amber-600 transition">
              B2B Buyers
            </a>
            <a href="#marketplaces" className="hover:text-amber-600 transition">
              ONDC & GeM
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-bold text-stone-800 hover:border-amber-400 hover:bg-amber-50 transition"
            >
              <Globe size={14} className="text-amber-600" />
              <span>{language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
            </button>

            <button
              onClick={handleStartDemo}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-bold text-stone-900 hover:bg-stone-50 transition shadow-xs"
            >
              {t('exploreDemo')}
            </button>

            <Link
              to="/studio"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-xs font-extrabold text-white hover:bg-amber-500 hover:text-stone-950 transition shadow-md"
            >
              {t('startSelling')} <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                {language === 'hi' ? 'भारतीय कारीगरों के लिए AI मंच' : 'AI Platform for Indian Artisans'}
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
                {language === 'hi' ? (
                  <>
                    अपने हुनर को बनाएं <br />
                    <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">
                      डिजिटल व्यापार।
                    </span>
                  </>
                ) : (
                  <>
                    Turn Your Craft Into a <br />
                    <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">
                      Digital Business.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-stone-600 max-w-xl">
                {t('heroSubtitle')}
              </p>

              {/* Core Transformation Pipeline Chips */}
              <div className="mt-8 rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                  The KarigarSetu 1-Click Transformation
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-700">
                  <span className="rounded-lg bg-stone-100 px-2.5 py-1">📷 Raw Photo</span>
                  <ChevronRight size={14} className="text-stone-400" />
                  <span className="rounded-lg bg-amber-100 text-amber-800 px-2.5 py-1">✨ AI Enhancement</span>
                  <ChevronRight size={14} className="text-stone-400" />
                  <span className="rounded-lg bg-orange-100 text-orange-800 px-2.5 py-1">🎙️ Voice Note</span>
                  <ChevronRight size={14} className="text-stone-400" />
                  <span className="rounded-lg bg-emerald-100 text-emerald-800 px-2.5 py-1">₹ Smart Price</span>
                  <ChevronRight size={14} className="text-stone-400" />
                  <span className="rounded-lg bg-blue-100 text-blue-800 px-2.5 py-1">🤝 B2B Buyers</span>
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/studio"
                  className="rounded-full bg-stone-900 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-stone-950/20 hover:bg-amber-500 hover:text-stone-950 transition flex items-center gap-2"
                >
                  <span>{t('startSelling')}</span>
                  <ArrowRight size={16} />
                </Link>

                <button
                  onClick={handleStartDemo}
                  className="rounded-full border-2 border-stone-300 bg-white px-7 py-3.5 text-sm font-bold text-stone-800 hover:border-stone-900 hover:bg-stone-50 transition flex items-center gap-2 shadow-xs"
                >
                  <Sparkles size={16} className="text-amber-500" />
                  <span>{t('tryDemo')} (Gurpreet, Punjab)</span>
                </button>
              </div>

              {/* Artisan Trust Indicators */}
              <div className="mt-10 flex items-center gap-4 pt-6 border-t border-stone-200">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                    alt="Artisan"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Artisan"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Artisan"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div className="text-xs text-stone-600">
                  <strong className="text-stone-900">Pre-loaded Demo Profile:</strong> Gurpreet Kaur (Phulkari, Punjab)
                  <div className="text-[11px] text-amber-700 font-semibold">Zero English or tech literacy required</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual - Interactive Before / After */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -top-4 -right-4 z-20 rounded-2xl border border-amber-300 bg-white p-3.5 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">AI Catalog Ready</div>
                      <div className="text-xs font-black text-stone-900">₹1,499 Suggested Retail</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 z-20 rounded-2xl border border-stone-200 bg-stone-900 p-3.5 text-white shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500 text-stone-950">
                      <Mic2 size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-amber-300">Voice Transcribed (Hindi)</div>
                      <div className="text-xs font-bold text-stone-200">"यह हाथ से बनी हुई फुलकारी है..."</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Slider */}
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80"
                  afterImage="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
                  beforeLabel="Raw Workshop Photo"
                  afterLabel="AI Studio Enhancement"
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Comparison: Before AI vs KarigarSetu vs After AI */}
      <section id="transformation" className="border-y border-stone-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              The 10x Difference
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-stone-900">
              Why Traditional Artisans Need KarigarSetu
            </h2>
            <p className="mt-4 text-stone-600">
              Transforming physical handicraft skills into high-converting digital commerce without middlemen exploitation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {/* Card 1: Before AI */}
            <div className="rounded-3xl border border-red-200 bg-red-50/40 p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  Before AI
                </div>
                <h3 className="mt-4 text-xl font-black text-stone-900">
                  Traditional Struggle
                </h3>
                <ul className="mt-6 space-y-3.5 text-sm text-stone-600">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Poor product photos taken on phone with dark, cluttered backgrounds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>No English descriptions or SEO keywords for search discovery</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Unclear pricing leading to distress selling at under-valued rates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Limited to physical fairs and middlemen who take 60–70% margin</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-red-200/60 text-xs font-bold text-red-700">
                Result: Unpredictable seasonal income
              </div>
            </div>

            {/* Card 2: KarigarSetu AI (The Bridge) */}
            <div className="rounded-3xl border-2 border-amber-400 bg-stone-900 p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 px-4 py-1 text-[10px] font-black text-stone-950 uppercase tracking-widest rounded-bl-xl">
                The Engine
              </div>
              <div>
                <div className="inline-flex rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
                  KarigarSetu AI Suite
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">
                  Intelligent Manager
                </h3>
                <ul className="mt-6 space-y-3.5 text-sm text-stone-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>AI Image Studio:</strong> Auto-removes background, centers, and adjusts lighting</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Voice Cataloging:</strong> Speaks in Hindi/Punjabi, writes e-commerce specs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Smart Pricing:</strong> Transparent labour + cost formula (₹1,499)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Buyer Matching:</strong> Direct B2B wholesale orders & corporate gifting</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-800 text-xs font-bold text-amber-400">
                Action: 4 simple steps in under 3 minutes
              </div>
            </div>

            {/* Card 3: After AI */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  After AI
                </div>
                <h3 className="mt-4 text-xl font-black text-stone-900">
                  Empowered Digital Artisan
                </h3>
                <ul className="mt-6 space-y-3.5 text-sm text-stone-600">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Studio-grade product catalog ready for Amazon, Myntra, ONDC & GeM</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Fair pricing protecting artisanal labour and material margins</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Direct connections with curated boutiques and institutional buyers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Predictable, year-round orders deposited straight to bank account via DBT</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-200/60 text-xs font-bold text-emerald-800">
                Result: Sustainable 3x income growth
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Core Capabilities
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-stone-900">
              Built Specifically for Micro-Entrepreneurs
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-600 mb-5">
                <ImageIcon size={24} />
              </div>
              <h3 className="text-lg font-black text-stone-900">AI Image Studio</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Turns a raw photo taken in a village workshop into a professional studio listing with clean backgrounds and calibrated lighting.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-600 mb-5">
                <Mic2 size={24} />
              </div>
              <h3 className="text-lg font-black text-stone-900">Voice Auto-Cataloger</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                "बस बोलिए, हम लिख देंगे" — Artisans speak in Hindi or regional languages; AI translates and formats complete e-commerce specs.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 mb-5">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-black text-stone-900">Smart Pricing Engine</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Calculates transparent fair prices based on raw materials, hours of needlecraft/weaving, and regional market demand.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600 mb-5">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-black text-stone-900">B2B Buyer Discovery</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Directly matches artisans with verified boutique buyers, export houses, and corporate gifting managers seeking authentic craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONDC & Government Marketplaces Section */}
      <section id="marketplaces" className="border-t border-stone-200 bg-stone-100 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {t('expandMarketTitle')}
              </span>
              <h2 className="mt-2 text-3xl font-black text-stone-900">
                Open Commerce & National Marketplaces
              </h2>
              <p className="mt-2 text-sm text-stone-600 max-w-xl">
                {t('expandMarketSub')}
              </p>
            </div>
            <Link
              to="/buyers"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>Explore Marketplace Integrations</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌐</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Integration Ready
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black text-stone-900">ONDC Protocol</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Publish once and reach customers across Paytm, Mystore, Craftsvilla, and buyer apps across India without 30% platform fees.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏛️</span>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
                  Coming Soon
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black text-stone-900">Government e-Marketplace (GeM)</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Connecting rural artisan clusters with institutional procurement for government offices, ministries, and corporate CSR gifting.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🇮🇳</span>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
                  Coming Soon
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black text-stone-900">State Handicraft Portals</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Syncing local state emporiums (TRIFED, Punjab Phulkari Board, Mrignayani) with artisan digital inventories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="mx-6 my-20 max-w-7xl lg:mx-auto rounded-3xl bg-stone-900 px-8 py-16 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500 text-stone-950 mx-auto mb-6">
            <Store size={24} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to experience the future of Indian craft commerce?
          </h2>
          <p className="mt-4 text-stone-400 text-base">
            Launch the interactive AI Product Studio and create your first listing in under 2 minutes.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/studio"
              className="rounded-full bg-amber-500 px-8 py-4 text-sm font-extrabold text-stone-950 hover:bg-amber-400 transition shadow-lg flex items-center gap-2"
            >
              <span>{t('startSelling')}</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={handleStartDemo}
              className="rounded-full border border-stone-700 bg-stone-800 px-7 py-4 text-sm font-bold text-white hover:bg-stone-700 transition"
            >
              {t('exploreDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-6 px-6 lg:px-8 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-lg bg-amber-500 text-stone-950 font-black text-xs">
              K
            </div>
            <span className="font-bold text-stone-800">KarigarSetu</span>
            <span>· Built with respect for every Indian artisan & maker.</span>
          </div>

          <div className="flex gap-6 font-semibold">
            <Link to="/dashboard" className="hover:text-stone-900">Dashboard</Link>
            <Link to="/studio" className="hover:text-stone-900">AI Studio</Link>
            <Link to="/buyers" className="hover:text-stone-900">B2B Buyers</Link>
            <Link to="/pricing" className="hover:text-stone-900">Smart Pricing</Link>
            <Link to="/analytics" className="hover:text-stone-900">Analytics</Link>
          </div>
        </div>
      </footer>

      {/* Language Selector Modal */}
      <LanguageSelectorModal />
    </div>
  );
};
