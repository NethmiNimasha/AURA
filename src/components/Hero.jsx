import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export const Hero = ({ onExploreClick }) => {
  return (
    <div className="relative min-h-[70vh] overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex items-center transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 dark:from-amber-950/20 via-neutral-100 dark:via-neutral-950 to-neutral-50 dark:to-neutral-950 z-10" />
      <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 py-20">
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 dark:bg-amber-500/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-amber-600 dark:text-amber-400 uppercase w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            Fine Jewellery Collection
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-light tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Discover{' '}
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-100 dark:to-amber-300">
                Timeless Pieces
              </span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Browse our curated catalogue of rings, necklaces, earrings, and bracelets. Search by name,
              material, or category — then view full details for every piece.
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="group relative flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 px-8 py-4 text-sm font-semibold tracking-widest text-neutral-950 uppercase shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Browse Catalogue
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-3 border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/20 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src="/gold_ring_hero.png"
              alt="Aurelia Solitaire Luxury Ring"
              className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-neutral-200/50 dark:border-white/10 bg-white/90 dark:bg-neutral-950/80 p-4 backdrop-blur-md">
              <div className="text-left">
                <span className="block text-[10px] font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                  Featured
                </span>
                <span className="block text-sm font-serif font-bold text-neutral-900 dark:text-white">
                  The Aurelia Solitaire
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/20 px-2 py-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
