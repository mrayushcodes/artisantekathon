import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  Sparkles,
  Bot,
  Menu,
  X,
  BadgeCheck,
  Trophy,
  Package,
  LayoutDashboard,
  IndianRupee,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    setShowLanguageModal,
    setIsAiDrawerOpen,
    artisan,
    t,
  } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navLinks = [
    { to: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { to: '/products', label: t('myProducts'), icon: Package },
    { to: '/studio', label: t('aiStudio'), icon: Sparkles, highlight: true },
    { to: '/pricing', label: t('smartPricing'), icon: IndianRupee },
    { to: '/buyers', label: t('findBuyers'), icon: Users },
    { to: '/analytics', label: t('analytics'), icon: BarChart3 },
    { to: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left Section (Mobile brand & page title) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl border border-stone-200 p-2 text-stone-700 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex lg:hidden items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500 text-stone-950 font-black">
              <Sparkles size={16} />
            </div>
            <span className="text-lg font-black tracking-tight text-stone-900">
              Karigar<span className="text-amber-600">Setu</span>
            </span>
          </Link>

          {/* Hackathon Badge (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-amber-900">
            <Trophy size={13} className="text-amber-600" />
            <span>SIH Prototype Demo</span>
            <span className="text-stone-300">•</span>
            <span className="text-[11px] font-bold text-stone-600">Patiala, Punjab</span>
          </div>
        </div>

        {/* Right Section Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-800 hover:border-amber-400 hover:bg-amber-50 transition"
            title="Toggle Hindi / English"
          >
            <Globe size={14} className="text-amber-600" />
            <span>{language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
          </button>

          {/* More Languages Dialog Trigger */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="hidden sm:flex text-xs font-semibold text-stone-500 hover:text-stone-900 underline underline-offset-2"
          >
            +5 Languages
          </button>

          {/* Floating AI Business Assistant button */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-stone-800 transition shadow-sm"
          >
            <Bot size={15} className="text-amber-400" />
            <span className="hidden sm:inline">Karigar</span>
            <span>AI</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* User Profile avatar */}
          <Link
            to="/settings"
            className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 p-1 pr-3 hover:bg-stone-100 transition"
          >
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="hidden md:inline text-xs font-bold text-stone-800 truncate max-w-[100px]">
              {language === 'hi' ? artisan.hindiName : artisan.name}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white p-4 space-y-2 shadow-lg animate-in slide-in-from-top-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl p-3 text-sm font-bold ${
                  isActive
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{link.label}</span>
                </div>
                {link.highlight && (
                  <span className="rounded bg-stone-900 px-1.5 py-0.5 text-[10px] text-white">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
