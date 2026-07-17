import React from 'react';
import { Star, Eye } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export const ProductCard = ({ product, onClick }) => {
  const formattedPrice = formatPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/40 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/5 dark:bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {product.originalPrice && (
            <span className="rounded-full bg-red-500/95 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-white uppercase shadow-md">
              Special Value
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-neutral-800 dark:bg-neutral-900 border border-neutral-600 dark:border-neutral-700 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-neutral-300 dark:text-neutral-400 uppercase shadow-md">
              Out of Stock
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 bg-white/95 dark:bg-neutral-950/90 border-t border-neutral-200 dark:border-neutral-900 py-3 px-4 flex items-center justify-center gap-1.5 transition-transform duration-300">
          <Eye className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span className="text-xs font-semibold tracking-widest text-amber-600 dark:text-amber-300 uppercase">
            View Details
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-semibold tracking-widest text-amber-600 dark:text-amber-500/80 uppercase">
            {product.material} • {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-serif text-lg font-medium text-neutral-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-900/60">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-neutral-900 dark:text-white">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            {product.carat && (
              <span className="block text-[9px] text-neutral-400 dark:text-neutral-500 font-medium uppercase mt-0.5">
                {product.carat}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex h-9 items-center justify-center rounded-full px-4 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-500"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
