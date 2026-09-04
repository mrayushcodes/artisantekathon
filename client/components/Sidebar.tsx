import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Sparkles,
  IndianRupee,
  Users,
  BarChart3,
  Settings,
  Bot,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Sidebar: React.FC = () => {
  const { artisan, language, t, setIsAiDrawerOpen } = useApp();

  const navItems = [
    { to: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { to: '/products', label: t('myProducts'), icon: Package },
    {
      to: '/studio',
      label: t('aiStudio'),
      icon: Sparkles,
      highlight: true,
    },
    { to: '/pricing', label: t('smartPricing'), icon: IndianRupee },
    { to: '/buyers', label: t('findBuyers'), icon: Users },
    { to: '/analytics', label: t('analytics'), icon: BarChart3 },
    { to: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex h-screen w-72 flex-col justify-between border-r border-stone-200 bg-white p-5 sticky top-0">
      {/* Brand Header */}
      <div>
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-stone-900">
                Artisan<span className="text-amber-600">Ai</span>
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              {language === 'hi' ? 'हुनर से व्यापार तक' : 'From Craft to Commerce'}
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? item.highlight
                        ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'bg-stone-900 text-white shadow-md'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-900 hover:bg-amber-100/70 border border-amber-200/60'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? item.highlight
                              ? 'text-stone-950'
                              : 'text-amber-400'
                            : item.highlight
                            ? 'text-amber-600'
                            : 'text-stone-500 group-hover:text-stone-900'
                        }
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.highlight && !isActive && (
                      <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-stone-950">
                        AI
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Quick AI Assistant Trigger in Nav */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50/60 px-3.5 py-3 text-sm font-bold text-stone-700 hover:border-amber-400 hover:bg-amber-50/50 hover:text-stone-900 transition"
          >
            <div className="flex items-center gap-3">
              <Bot size={19} className="text-amber-600" />
              <span>{t('aiAssistant')}</span>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          </button>
        </nav>
      </div>

      {/* Bottom Profile Card */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3.5">
        <div className="flex items-center justify-between">
          <Link to="/settings" className="flex items-center gap-3 min-w-0">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-stone-200">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-white">
                <BadgeCheck size={11} strokeWidth={3} />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="truncate text-xs font-black text-stone-900">
                  {language === 'hi' ? artisan.hindiName : artisan.name}
                </span>
              </div>
              <p className="truncate text-[11px] font-semibold text-stone-500">
                {language === 'hi' ? artisan.hindiCraft : artisan.craft}
              </p>
              <p className="text-[10px] text-amber-700 font-bold">
                {artisan.location}
              </p>
            </div>
          </Link>
          <Link
            to="/settings"
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition"
            title="Account Settings"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
};
