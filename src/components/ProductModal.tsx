import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Truck, Clock, RefreshCw } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice, formatPriceAdjustment } from '../utils/currency';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('7');
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  useEffect(() => {
    if (product) {
      setSelectedMetal(product.material);
      setActiveTab('details');
    }
  }, [product]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const metalsList = [
    { name: '18k Yellow Gold', value: 'Yellow Gold', colorBg: 'bg-[#E3C16F]' },
    { name: '18k White Gold', value: 'White Gold', colorBg: 'bg-[#EAF1F2]' },
    { name: '18k Rose Gold', value: 'Rose Gold', colorBg: 'bg-[#E0A899]' },
    { name: 'Platinum 950', value: 'Platinum', colorBg: 'bg-[#D2D2D0]' },
  ];

  const ringSizes = ['5', '6', '7', '8', '9', '10'];

  const priceAdjustment =
    selectedMetal !== product.material
      ? selectedMetal === 'Platinum'
        ? +800
        : product.material === 'Platinum'
          ? -800
          : 0
      : 0;

  const adjustedPrice = product.price + priceAdjustment;
  const formattedAdjustedPrice = formatPrice(adjustedPrice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div onClick={onClose} className="absolute inset-0 bg-neutral-900/60 dark:bg-neutral-950/80 backdrop-blur-md" />

      <div className="relative w-full max-w-5xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 md:p-8 text-left shadow-2xl overflow-y-auto max-h-[90vh] z-10 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-900">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'GIA Certified' },
                { icon: Clock, label: 'Insured Delivery' },
                { icon: RefreshCw, label: 'Luxe Packaging' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-900/60 bg-neutral-50 dark:bg-neutral-900/10 p-3 text-center"
                >
                  <Icon className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-300 dark:text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl font-normal text-neutral-900 dark:text-white tracking-wide">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-amber-600 dark:text-amber-300">
                    {formattedAdjustedPrice}
                  </span>
                  {priceAdjustment !== 0 && (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      Metal adjustment: {formatPriceAdjustment(priceAdjustment)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-3">
                  Precious Metal
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {metalsList.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => setSelectedMetal(m.value)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                        selectedMetal === m.value
                          ? 'border-amber-500 text-neutral-900 dark:text-white bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 rounded-full ${m.colorBg} border border-neutral-300 dark:border-neutral-900`} />
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {product.category === 'Rings' && (
                <div>
                  <label className="block text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-3">
                    Ring Size (US)
                  </label>
                  <div className="flex gap-2">
                    {ringSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
                          selectedSize === size
                            ? 'border-amber-500 bg-amber-500/10 text-neutral-900 dark:text-white'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-neutral-200 dark:border-neutral-900 pt-4">
                <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-900 pb-2">
                  {(['details', 'shipping', 'care'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                        activeTab === tab
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                      }`}
                    >
                      {tab === 'details' && 'Gemstone Details'}
                      {tab === 'shipping' && 'Shipping & Returns'}
                      {tab === 'care' && 'Care & Warranty'}
                    </button>
                  ))}
                </div>

                <div className="mt-4 min-h-[90px]">
                  {activeTab === 'details' && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-light text-neutral-600 dark:text-neutral-400 list-disc pl-4">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="leading-tight">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="text-xs font-light text-neutral-600 dark:text-neutral-400 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        <span>
                          <strong>Free Insured Shipping:</strong> FedEx Priority Overnight delivery.
                        </span>
                      </div>
                      <p>Discreet packaging with signature required on delivery.</p>
                      <p>
                        <strong>Returns:</strong> 30-day complimentary resizing and returns on original items.
                      </p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <p className="text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Every AURA creation includes lifelong checking, polishing, and stone-tightening services.
                      We recommend routine cleanings with a fine jewellery solution or an annual in-boutique spa
                      consultation.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-900">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                {product.category === 'Rings'
                  ? `Selected: ${selectedMetal}, Size ${selectedSize}`
                  : `Selected: ${selectedMetal}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
