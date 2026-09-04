import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Package,
  Eye,
  Users,
  IndianRupee,
  Sparkles,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { stats, t, language } = useApp();

  const monthlyData = [
    { month: 'Apr', sales: 18400, views: 620 },
    { month: 'May', sales: 22100, views: 810 },
    { month: 'Jun', sales: 26500, views: 940 },
    { month: 'Jul', sales: 27500, views: 1050 },
    { month: 'Aug', sales: 32450, views: 1240 },
  ];

  const maxSales = Math.max(...monthlyData.map((d) => d.sales));

  const topProducts = [
    { name: 'Handcrafted Phulkari Dupatta', craft: 'Phulkari Textiles', views: 342, sales: 14, rate: '+28%' },
    { name: 'Handmade Phulkari Tote Bag', craft: 'Applique & Needlecraft', views: 281, sales: 11, rate: '+19%' },
    { name: 'Traditional Cotton Stole', craft: 'Handloom & Needlecraft', views: 194, sales: 8, rate: '+12%' },
    { name: 'Embroidered Punjabi Shawl', craft: 'Winter Woolens', views: 245, sales: 6, rate: '+15%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
          <BarChart3 size={14} /> Business Intelligence
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t('analytics')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          Clear, simple insights into your craft sales and customer interest.
        </p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t('salesOverview')}
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
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t('productsSold')}
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Package size={16} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-stone-900">
            27
          </div>
          <div className="mt-1 text-xs text-stone-500">
            Direct & B2B orders
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t('productViews')}
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600">
              <Eye size={16} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-stone-900">
            {stats.totalViews}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-stone-500">
            Across store and ONDC
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t('avgOrderValue')}
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-stone-900">
            ₹1,202
          </div>
          <div className="mt-1 text-xs text-stone-500">
            Healthy craft ticket size
          </div>
        </div>
      </div>

      {/* Visual Chart & AI Recommendation Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sales Growth Chart */}
        <div className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-stone-900">
                Monthly Revenue Growth
              </h3>
              <p className="text-xs text-stone-500">
                Last 5 months craft earnings (Direct & Wholesale)
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              Steady Growth
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6">
            <div className="flex items-end justify-between gap-4 h-52 px-2 border-b border-stone-200 pb-2">
              {monthlyData.map((item) => {
                const heightPercent = (item.sales / maxSales) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-stone-500 opacity-0 group-hover:opacity-100 transition">
                      ₹{(item.sales / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full max-w-[48px] rounded-t-xl bg-amber-500 hover:bg-amber-400 transition-all duration-300 shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-bold text-stone-700">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Strategic Recommendation Box */}
        <div className="lg:col-span-5 rounded-3xl border-2 border-amber-300 bg-amber-50/70 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-stone-950 font-bold shadow-xs">
                <Lightbulb size={18} />
              </div>
              <h3 className="font-black text-base text-stone-900">
                {t('aiRecommendation')}
              </h3>
            </div>

            <p className="mt-4 text-sm text-stone-800 leading-relaxed font-medium">
              "{t('aiRecommendationText')}"
            </p>

            <div className="mt-5 space-y-2 text-xs text-stone-700">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Dupatta listings with 3+ photos have <strong>42% higher inquiry rates</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>B2B buyers in Delhi and Mumbai are actively seeking autumn festive stock.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Keeping ₹1,499 retail price maintained your 87% pricing confidence.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/80">
            <span className="text-[11px] font-bold text-amber-900 block mb-2">
              Recommended Next Action:
            </span>
            <a
              href="/studio"
              className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition"
            >
              Add New Phulkari Variation in Studio →
            </a>
          </div>
        </div>
      </div>

      {/* Top Performing Products Table */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-stone-900">
            {t('topProducts')}
          </h3>
          <span className="text-xs text-stone-500 font-semibold">
            Ranked by buyer interest
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Craft Category</th>
                <th className="pb-3 text-center">Total Views</th>
                <th className="pb-3 text-center">Units Sold</th>
                <th className="pb-3 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {topProducts.map((p, idx) => (
                <tr key={idx} className="hover:bg-stone-50/60 transition">
                  <td className="py-3 font-bold text-stone-900">
                    <span className="mr-2 text-stone-400">{idx + 1}.</span>
                    {p.name}
                  </td>
                  <td className="py-3 text-stone-600">{p.craft}</td>
                  <td className="py-3 text-center font-bold text-stone-800">{p.views} views</td>
                  <td className="py-3 text-center font-bold text-emerald-700">{p.sales} units</td>
                  <td className="py-3 text-right font-black text-emerald-600">{p.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
