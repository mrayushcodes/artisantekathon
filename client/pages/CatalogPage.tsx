import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Eye,
  Edit2,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Plus,
  Tag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Product, ProductStatus } from '@/types';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, updateProduct, t, language } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    const id = searchParams.get('id');
    return products.find((p) => p.id === id) || null;
  });

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState<number>(0);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hindiName.includes(searchTerm) ||
      p.craft.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setNewPrice(product.price);
    setSearchParams({ id: product.id });
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setIsEditingPrice(false);
    setSearchParams({});
  };

  const handleSavePrice = () => {
    if (selectedProduct && newPrice > 0) {
      updateProduct(selectedProduct.id, { price: newPrice });
      setSelectedProduct({ ...selectedProduct, price: newPrice });
      setIsEditingPrice(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {t('myProducts')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Manage your digital craft inventory, edit prices, and view AI demand insights.
          </p>
        </div>

        <Link
          to="/studio"
          className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-black text-stone-950 hover:bg-amber-400 transition shadow-md"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-3 shadow-xs">
        {/* Search Box */}
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search products or crafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex w-full sm:w-auto overflow-x-auto gap-1">
          {['All', 'Published', 'Draft', 'Sold Out'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {status}
              {status === 'All' ? ` (${products.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-base font-bold text-stone-700">No products found</p>
          <p className="mt-1 text-xs text-stone-500">
            Try adjusting your search filter or create a new craft listing with AI.
          </p>
          <Link
            to="/studio"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-xs font-bold text-stone-950"
          >
            <Plus size={14} /> Create Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenDetails(product)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
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
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
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
                <span className="font-bold text-stone-900 group-hover:text-amber-600 transition">
                  View Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================== */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ========================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={handleCloseDetails}
              className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            >
              <X size={20} />
            </button>

            <div className="grid gap-6 md:grid-cols-12">
              {/* Product Image Gallery */}
              <div className="md:col-span-5 space-y-3">
                <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 border border-stone-200">
                  <img
                    src={selectedProduct.activeImage || selectedProduct.enhancedImage}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex gap-2">
                  <img
                    src={selectedProduct.enhancedImage}
                    alt="enhanced"
                    className="h-14 w-14 rounded-xl border-2 border-amber-500 object-cover"
                  />
                  <img
                    src={selectedProduct.rawImage}
                    alt="raw"
                    className="h-14 w-14 rounded-xl border border-stone-200 object-cover opacity-60"
                  />
                </div>
              </div>

              {/* Product Info & Controls */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                      {selectedProduct.craft}
                    </span>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="text-xs font-semibold text-stone-500">
                      {selectedProduct.origin}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                    {language === 'hi' ? selectedProduct.hindiName : selectedProduct.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 mt-0.5">
                    {selectedProduct.hindiName}
                  </p>
                </div>

                {/* Price & Stock */}
                <div className="flex items-center justify-between rounded-2xl bg-stone-50 p-3.5 border border-stone-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">
                      Current Price
                    </span>
                    {isEditingPrice ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-24 rounded border border-amber-500 px-2 py-0.5 text-sm font-black"
                        />
                        <button
                          onClick={handleSavePrice}
                          className="rounded bg-stone-900 px-2.5 py-1 text-xs font-bold text-white"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-amber-600">
                          ₹{selectedProduct.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => setIsEditingPrice(true)}
                          className="text-xs font-semibold text-stone-500 underline"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">
                      Inventory Stock
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      {selectedProduct.stock} units
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    to={`/studio?step=0`}
                    className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Enhance Image
                  </Link>
                  <Link
                    to={`/pricing`}
                    className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Recalculate Price
                  </Link>
                  <Link
                    to={`/buyers`}
                    className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800"
                  >
                    Match Buyers
                  </Link>
                </div>
              </div>
            </div>

            {/* Description & Specifications */}
            <div className="mt-6 border-t border-stone-200 pt-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Description
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="rounded-xl bg-stone-50 p-2.5">
                  <span className="text-stone-400 block">Material</span>
                  <strong className="text-stone-800">{selectedProduct.material}</strong>
                </div>
                <div className="rounded-xl bg-stone-50 p-2.5">
                  <span className="text-stone-400 block">Making Time</span>
                  <strong className="text-stone-800">{selectedProduct.productionTime}</strong>
                </div>
                <div className="rounded-xl bg-stone-50 p-2.5">
                  <span className="text-stone-400 block">Category</span>
                  <strong className="text-stone-800">{selectedProduct.category}</strong>
                </div>
                <div className="rounded-xl bg-stone-50 p-2.5">
                  <span className="text-stone-400 block">Performance</span>
                  <strong className="text-stone-800">{selectedProduct.views} views</strong>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                  <Lightbulb size={14} className="text-amber-600" />
                  <span>AI Marketplace Insight</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedProduct.aiInsight ||
                    'Your product image has strong visual quality. Adding a lifestyle photo could improve buyer engagement.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
