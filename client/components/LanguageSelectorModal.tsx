import React from 'react';
import { useApp } from '@/context/AppContext';
import { Check, Globe, Sparkles, X } from 'lucide-react';

interface LanguageOption {
  code: 'en' | 'hi' | 'pa' | 'bn' | 'mr' | 'ta' | 'te';
  name: string;
  nativeName: string;
  active: boolean;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', active: true },
  { code: 'en', name: 'English', nativeName: 'English', active: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', active: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', active: false },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', active: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', active: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', active: false },
];

export const LanguageSelectorModal: React.FC = () => {
  const { language, setLanguage, showLanguageModal, setShowLanguageModal } = useApp();

  if (!showLanguageModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => setShowLanguageModal(false)}
          className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-600">
            <Globe size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Multilingual Access
            </span>
            <h2 className="text-2xl font-black tracking-tight text-stone-900">
              Choose your language / भाषा चुनें
            </h2>
          </div>
        </div>

        <p className="mb-6 text-sm text-stone-600">
          ArtisanAi is built for Indian artisans. Switch anytime between English and हिन्दी for voice catalogs, AI pricing, and buyer interactions.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {LANGUAGES.filter((l) => l.active).map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'hi');
                  setShowLanguageModal(false);
                }}
                className={`relative flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                    : 'border-stone-200 bg-stone-50/50 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">
                    {lang.nativeName}
                  </span>
                  {isSelected && (
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-amber-600 text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="mt-1 text-xs font-semibold text-stone-500">
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500">
            <Sparkles size={13} className="text-amber-500" /> More Indian languages coming soon
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {LANGUAGES.filter((l) => !l.active).map((lang) => (
              <span
                key={lang.code}
                className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-2xs"
              >
                <span className="mr-1 text-stone-900 font-semibold">{lang.nativeName}</span> ({lang.name})
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowLanguageModal(false)}
            className="w-full sm:w-auto rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white hover:bg-stone-800 transition"
          >
            Continue / आगे बढ़ें
          </button>
        </div>
      </div>
    </div>
  );
};
