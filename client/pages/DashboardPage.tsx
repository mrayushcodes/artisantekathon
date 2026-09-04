import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Package,
  CheckCircle2,
  IndianRupee,
  Users,
  Eye,
  ShoppingBag,
  Clock,
  ChevronRight,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { artisan, products, stats, t, language } = useApp();

  const recentProducts = products.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {t('greeting')}
            </h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              Verified Master Artisan
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-600">
            {t('greetingSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/studio"
            className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-black text-stone-950 hover:bg-amber-400 transition shadow-md"
          >
            <Sparkles size={15} />
            <span>{t('startWithAi')}</span>
          </Link>
        </div>
      </div>

      {/* Large Primary Action Card */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 mb-3">
              <Sparkles size={13} /> {t('aiStudio')} Centerpiece
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t('createNewProduct')}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-xl">
              {t('createNewProductSub')} Just take a photo, speak in Hindi or your own language, and let AI do the rest.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="rounded-full bg-amber-500 px-6 py-3 text-xs sm:text-sm font-black text-stone-950 hover:bg-amber-400 transition flex items-center gap-2 shadow-lg"
              >
                <span>{t('startWithAi')}</span>
                <ArrowRight size={16} />
              </Link>
              <div className="text-xs text-stone-400">
                ⚡ Takes only ~2 minutes per craft item
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="rounded-2xl border border-stone-700 bg-stone-800/80 p-4 w-full max-w-xs backdrop-blur-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Simulated AI Demo Pipeline
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>1. Photo Background Removal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>2. Hindi Voice Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>3. Cost-based Smart Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>4. Instant Multi-market Publish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Overview Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-stone-900 tracking-tight">
            {t('businessOverview')}
          </h3>
          <span className="text-xs font-semibold text-stone-500">
            Current Month (August - September 2026)
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t('productsTotal')}
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600">
                <Package size={16} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-stone-900">
              {stats.totalProducts}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
              <span className="font-semibold text-emerald-600">8 online</span>
              <span>· 16 in workshop</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t('publishedTotal')}
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-stone-900">
              {stats.publishedProducts}
            </div>
            <div className="mt-1 text-xs text-stone-500">
              Active across store & ONDC
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t('salesTotal')}
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-orange-50 text-orange-600">
                <IndianRupee size={16} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-stone-900">
              ₹{stats.estimatedSales.toLocaleString('en-IN')}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp size={13} />
              <span>+18% this month</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t('buyerInterests')}
              </span>
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <Users size={16} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-stone-900">
              {stats.buyerInterests}
            </div>
            <Link
              to="/buyers"
              className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              <span>View B2B Leads</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* AI Business Tip Card */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500 text-stone-950 font-bold shadow-xs">
            <Lightbulb size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-stone-900">
              {t('aiTipTitle')}
            </h4>
            <p className="mt-1 text-sm text-stone-700 leading-relaxed">
              {t('aiTipContent')}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                to="/studio"
                className="rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-stone-800 transition"
              >
                Create New Textile Design
              </Link>
              <Link
                to="/analytics"
                className="rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-50 transition"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-stone-900 tracking-tight">
            {t('recentProducts')}
          </h3>
          <Link
            to="/products"
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            <span>View All ({products.length})</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.activeImage || product.enhancedImage}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                        product.status === 'Published'
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : product.status === 'Draft'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'bg-stone-600 text-white'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 rounded-md bg-stone-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                    {product.craft}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-extrabold text-sm text-stone-900 line-clamp-1">
                    {language === 'hi' ? product.hindiName : product.name}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-black text-amber-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 p-3 bg-stone-50/50 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {product.views} views
                </span>
                <Link
                  to={`/products?id=${product.id}`}
                  className="font-bold text-stone-900 hover:text-amber-600"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
