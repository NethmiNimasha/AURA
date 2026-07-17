import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '../data/products';

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    wishlistItems: Product[];
    onRemoveItem: (productId: string) => void;
    onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
    isOpen,
    onClose,
    wishlistItems,
    onRemoveItem,
    onAddToCart
}) => {
    if (!isOpen) return null;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">

                {/* Drawer Content */}
                <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col h-full shadow-2xl relative z-10 animate-in slide-in-from-right duration-350">

                    {/* Header */}
                    <div className="px-6 py-6 border-b border-neutral-900 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
                                My Boutique Wishlist
                            </h2>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white p-1 rounded-full border border-neutral-900 bg-neutral-900/50 hover:bg-neutral-900"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {wishlistItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-80 text-center">
                                <Heart className="h-10 w-10 text-neutral-600 mb-4 stroke-1" />
                                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                                    Wishlist Empty
                                </h3>
                                <p className="text-xs text-neutral-600 font-light mt-2 max-w-[240px]">
                                    Add custom designs or heirloom gems to compile your favorites.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-6 rounded-full border border-neutral-800 bg-neutral-900/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-500 transition"
                                >
                                    Explore Showcase
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {wishlistItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/80"
                                    >
                                        <div className="h-16 w-16 rounded-lg overflow-hidden border border-neutral-900 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs font-serif font-bold text-white line-clamp-1">
                                                    {item.name}
                                                </h4>
                                                <span className="block text-[9px] text-amber-500/80 font-bold uppercase mt-1">
                                                    {item.material} • {item.category}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mt-2.5">
                                                <span className="text-xs font-semibold text-neutral-200">
                                                    {formatPrice(item.price)}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            onAddToCart(item);
                                                            onRemoveItem(item.id);
                                                        }}
                                                        className="flex h-8 items-center gap-1 rounded-full bg-neutral-900 border border-neutral-800 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-500 transition"
                                                    >
                                                        <ShoppingBag className="h-3 w-3" />
                                                        Add
                                                    </button>

                                                    <button
                                                        onClick={() => onRemoveItem(item.id)}
                                                        className="text-neutral-500 hover:text-red-400 p-1"
                                                        aria-label="Delete wishlist item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};
