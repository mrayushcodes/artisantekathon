import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CreditCard,
  Bell,
  Globe,
  Store,
  HelpCircle,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const SettingsPage: React.FC = () => {
  const { artisan, language, setLanguage, t } = useApp();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t('settings')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          Manage your verified master artisan profile, regional language preferences, and payment setup.
        </p>
      </div>

      {savedNotice && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      {/* Artisan Identity Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-amber-500 shadow-md">
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center bg-emerald-600 text-white rounded-tl-lg">
              <BadgeCheck size={14} />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {language === 'hi' ? artisan.hindiName : artisan.name}
              </h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                Verified Artisan ID: {artisan.artisanId}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-700 font-bold mt-1">
              {language === 'hi' ? artisan.hindiCraft : artisan.craft} · {artisan.location}
            </p>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-xl">
              {language === 'hi' ? artisan.hindiBio : artisan.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* 1. Language Preference */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-black text-base text-stone-900">
            <Globe size={18} className="text-amber-600" />
            <span>Application & Catalog Language</span>
          </div>
          <p className="text-xs text-stone-500">
            Choose your primary display language. Voice recording supports Hindi and regional dialects.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              onClick={() => setLanguage('en')}
              className={`rounded-2xl border-2 p-3 text-left transition ${
                language === 'en'
                  ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <div className="text-sm font-black">English</div>
              <div className="text-[11px] text-stone-500">Default e-commerce view</div>
            </button>

            <button
              onClick={() => setLanguage('hi')}
              className={`rounded-2xl border-2 p-3 text-left transition ${
                language === 'hi'
                  ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold shadow-xs'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <div className="text-sm font-black">हिन्दी (Hindi)</div>
              <div className="text-[11px] text-stone-500">कारीगर सरल इंटरफेस</div>
            </button>
          </div>
        </div>

        {/* 2. Business & Artisan Verification */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-black text-base text-stone-900">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>Government & Business Credentials</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                Pehchan Artisan ID Card
              </span>
              <strong className="text-stone-900 text-sm block mt-1">
                {artisan.artisanId}
              </strong>
              <span className="text-emerald-700 font-semibold text-[11px] mt-1 inline-block">
                ✓ Ministry of Textiles Authenticated
              </span>
            </div>

            <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                MSME Udyam Aadhaar
              </span>
              <strong className="text-stone-900 text-sm block mt-1">
                {artisan.udyamId}
              </strong>
              <span className="text-emerald-700 font-semibold text-[11px] mt-1 inline-block">
                ✓ Micro Enterprise Classification
              </span>
            </div>
          </div>
        </div>

        {/* 3. Direct Benefit Transfer & Payout Bank */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-black text-base text-stone-900">
            <CreditCard size={18} className="text-amber-600" />
            <span>Direct Payout Bank Account (DBT Enabled)</span>
          </div>
          <p className="text-xs text-stone-500">
            Sales proceeds and government craft subsidies are credited directly with zero commission cuts.
          </p>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs space-y-1.5 max-w-lg">
            <div className="flex justify-between">
              <span className="text-stone-400">Account Holder:</span>
              <strong className="text-stone-800">{artisan.bankAccount.holder}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Bank Name:</span>
              <strong className="text-stone-800">{artisan.bankAccount.bankName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Account Number:</span>
              <strong className="text-stone-800 font-mono">{artisan.bankAccount.accountNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">IFSC Code:</span>
              <strong className="text-stone-800 font-mono">{artisan.bankAccount.ifsc}</strong>
            </div>
          </div>
        </div>

        {/* 4. Open Commerce (ONDC) Status */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-black text-base text-stone-900">
            <Store size={18} className="text-blue-600" />
            <span>Marketplace Synchronization</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
            <div>
              <span className="font-bold text-emerald-900 block">ONDC Network Active</span>
              <span className="text-emerald-700">All published products are synced for national buyer discovery</span>
            </div>
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white">
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
