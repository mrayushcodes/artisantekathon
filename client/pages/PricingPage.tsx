import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  IndianRupee,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockPricingRecommendation } from '@/services/aiServices';

export const PricingPage: React.FC = () => {
  const { t, language } = useApp();

  const [craftType, setCraftType] = useState('Phulkari Textiles');
  const [materialCost, setMaterialCost] = useState(500);
  const [labourCost, setLabourCost] = useState(400);
  const [packagingCost, setPackagingCost] = useState(50);
  const [desiredMargin, setDesiredMargin] = useState(30);

  const [recommendedPrice, setRecommendedPrice] = useState(1499);
  const [range, setRange] = useState<[number, number]>([1299, 1699]);
  const [b2bRange, setB2bRange] = useState<[number, number]>([1120, 1250]);
  const [confidence, setConfidence] = useState(87);

  useEffect(() => {
    const calc = async () => {
      const res = await mockPricingRecommendation({
        material: materialCost,
        labour: labourCost,
        packaging: packagingCost,
        desiredMargin,
      });
      setRecommendedPrice(res.recommendedPrice);
      setRange(res.suggestedRange);
      setB2bRange(res.b2bWholesaleRange);
      setConfidence(res.confidenceScore);
    };

    calc();
  }, [materialCost, labourCost, packagingCost, desiredMargin, craftType]);

  const totalCost = materialCost + labourCost + packagingCost;
  const estimatedProfit = Math.max(0, recommendedPrice - totalCost);

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
          <Sparkles size={14} /> AI Pricing Intelligence
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t('pricingStepTitle')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl">
          {t('pricingStepSubtitle')} Protect your artisanal skills and avoid under-pricing your hard work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Calculator Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="font-extrabold text-base text-stone-900">
              Craft & Cost Calculator
            </h3>

            {/* Craft Category Picker */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Craft Tradition
              </label>
              <select
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs sm:text-sm font-bold text-stone-800 focus:border-amber-500 focus:outline-none"
              >
                <option>Phulkari Textiles & Embroidery</option>
                <option>Handloom Tant & Chanderi Sarees</option>
                <option>Jaipur Blue Pottery</option>
                <option>Assam Bamboo & Cane Basketry</option>
                <option>Terracotta Pottery</option>
                <option>Kashmiri Needlework Shawls</option>
              </select>
            </div>

            {/* Cost Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{t('materialCost')}</span>
                  <span className="font-mono text-amber-600">₹{materialCost}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{t('labourCost')} (Needlework / Weaving Hours)</span>
                  <span className="font-mono text-amber-600">₹{labourCost}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{t('packagingCost')}</span>
                  <span className="font-mono text-amber-600">₹{packagingCost}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{t('desiredMargin')}</span>
                  <span className="font-mono text-amber-600">{desiredMargin}%</span>
                </div>
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

            {/* Total Cost Summary */}
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400 block">Total Production Cost</span>
                <span className="text-stone-600">Base outlay per item</span>
              </div>
              <span className="text-lg font-black text-stone-900">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendation Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border-2 border-amber-400 bg-stone-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 px-4 py-1 text-[10px] font-black text-stone-950 uppercase tracking-widest rounded-bl-xl">
              {t('aiEstimateBadge')}
            </div>

            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Recommended Retail Price
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-stone-800 pb-6">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-amber-400">
                  ₹{recommendedPrice.toLocaleString('en-IN')}
                </span>
                <span className="block text-xs text-stone-400 mt-1">
                  Direct B2C consumer price
                </span>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="text-xs text-stone-300">
                  {t('suggestedRange')}:{' '}
                  <strong className="text-white">
                    ₹{range[0]} — ₹{range[1]}
                  </strong>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  <span>Confidence: {confidence}%</span>
                </div>
              </div>
            </div>

            {/* Why This Price Explanation */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                {t('whyThisPrice')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Based on your material cost (₹{materialCost}), estimated labour (₹{labourCost}), craft category and comparable handcrafted textile products, ₹{recommendedPrice.toLocaleString('en-IN')} provides a competitive margin while remaining market-friendly.
              </p>
            </div>

            {/* Financial Breakdown */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 border-t border-stone-800 text-xs">
              <div className="rounded-xl bg-stone-800/80 p-2.5">
                <span className="text-stone-400 block">{t('materialBreakdown')}</span>
                <strong className="text-white text-sm">₹{materialCost}</strong>
              </div>
              <div className="rounded-xl bg-stone-800/80 p-2.5">
                <span className="text-stone-400 block">{t('labourBreakdown')}</span>
                <strong className="text-white text-sm">₹{labourCost}</strong>
              </div>
              <div className="rounded-xl bg-stone-800/80 p-2.5">
                <span className="text-stone-400 block">{t('packagingBreakdown')}</span>
                <strong className="text-white text-sm">₹{packagingCost}</strong>
              </div>
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-2.5">
                <span className="text-emerald-300 block">{t('estimatedProfit')}</span>
                <strong className="text-emerald-400 text-sm">₹{estimatedProfit}</strong>
              </div>
            </div>

            {/* Wholesale B2B Recommendation */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-800/50 p-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-stone-400 font-bold block">B2B Wholesale Price Recommendation</span>
                  <span className="text-[11px] text-stone-500">For orders of 50+ units to retail boutiques</span>
                </div>
                <span className="text-base font-black text-amber-300">
                  ₹{b2bRange[0]} — ₹{b2bRange[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
