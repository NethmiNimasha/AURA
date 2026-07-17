import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '../data/products';

interface CartItem {
    id: string; // Unique configuration id, e.g. productId-metal-size
    product: Product;
    quantity: number;
    metal: string;
    size?: string;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (id: string, newQty: number) => void;
    onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem
}) => {
    const [promoCode, setPromoCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'complete'>('cart');
    const [shippingForm, setShippingForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: 'United States'
    });

    if (!isOpen) return null;

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (promoCode.trim().toUpperCase() === 'AURA10') {
            setDiscountPercent(10);
            setPromoApplied(true);
        } else {
            alert('Invalid promo code. Try: AURA10 for 10% off.');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = Math.round(subtotal * (discountPercent / 100));
    const shipping = subtotal > 5000 ? 0 : 150;
    const grandTotal = subtotal - discount + shipping;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep('complete');
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
                <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col h-full shadow-2xl relative z-10 animate-in slide-in-from-right duration-300">

                    {/* Header */}
                    <div className="px-6 py-6 border-b border-neutral-900 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-amber-500" />
                            <h2 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
                                Heirloom Cart
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

                        {checkoutStep === 'cart' && (
                            <>
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-80 text-center">
                                        <ShoppingBag className="h-10 w-10 text-neutral-600 mb-4 stroke-1" />
                                        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                                            Your Cart is Empty
                                        </h3>
                                        <p className="text-xs text-neutral-600 font-light mt-2 max-w-[240px]">
                                            Select an heirloom piece to begin customization.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="mt-6 rounded-full border border-neutral-800 bg-neutral-900/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-neutral-950 hover:border-amber-500 transition"
                                        >
                                            Browse Catalog
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/80"
                                            >
                                                <div className="h-16 w-16 rounded-lg overflow-hidden border border-neutral-900 flex-shrink-0">
                                                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-xs font-serif font-bold text-white line-clamp-1">
                                                            {item.product.name}
                                                        </h4>
                                                        <span className="block text-[9px] text-amber-500/80 font-bold uppercase mt-1">
                                                            {item.metal} {item.size && `• Size ${item.size}`}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-2.5">
                                                        <span className="text-xs font-semibold text-neutral-200">
                                                            {formatPrice(item.product.price)}
                                                        </span>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center border border-neutral-800 rounded-full px-2 py-0.5 bg-neutral-900/30">
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                                className="text-neutral-500 hover:text-white p-0.5"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="px-2.5 text-xs font-semibold text-neutral-200">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                                className="text-neutral-500 hover:text-white p-0.5"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>

                                                        {/* Trash button */}
                                                        <button
                                                            onClick={() => onRemoveItem(item.id)}
                                                            className="text-neutral-500 hover:text-red-400 p-1"
                                                            aria-label="Remove item"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Promo Code area */}
                                        <form onSubmit={handleApplyPromo} className="pt-4 border-t border-neutral-900/60">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Promo Code (e.g. AURA10)"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    disabled={promoApplied}
                                                    className="flex-1 rounded-full border border-neutral-800 bg-neutral-900/20 px-4 py-2 text-xs text-neutral-300 placeholder-neutral-600 outline-none focus:border-amber-500/40"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={promoApplied}
                                                    className="rounded-full bg-neutral-900 border border-neutral-800 px-5 text-xs font-semibold text-amber-300 uppercase hover:bg-neutral-800 transition disabled:opacity-50"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                            {promoApplied && (
                                                <p className="mt-2 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                                                    ✓ Promo Code Applied: 10% Discount
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                )}
                            </>
                        )}

                        {checkoutStep === 'shipping' && (
                            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                                <h3 className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
                                    Luxe Delivery Details
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                                            placeholder="Constance Vanderbilt"
                                            value={shippingForm.name}
                                            onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">Email (For Insured tracking)</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                                            placeholder="constance@vanderbilt.com"
                                            value={shippingForm.email}
                                            onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">Street Address</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                                            placeholder="740 Park Avenue"
                                            value={shippingForm.address}
                                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">City</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                                                placeholder="New York"
                                                value={shippingForm.city}
                                                onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">Country</label>
                                            <select
                                                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3 text-xs text-white outline-none focus:border-amber-500/50"
                                                value={shippingForm.country}
                                                onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                                            >
                                                <option value="United States">United States</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Japan">Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mt-6 text-xs text-amber-300 font-light space-y-1">
                                    <p><strong>Note on Payments:</strong> As a luxury jeweler, we process mock payments securely off-site. Proceeding will trigger high-jewelry priority queue booking.</p>
                                </div>

                                <div className="flex gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setCheckoutStep('cart')}
                                        className="w-1/3 rounded-full border border-neutral-800 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:opacity-95"
                                    >
                                        Confirm & Complete
                                    </button>
                                </div>
                            </form>
                        )}

                        {checkoutStep === 'complete' && (
                            <div className="flex flex-col items-center justify-center text-center h-full py-10">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 mb-6">
                                    <Sparkles className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h3 className="font-serif text-2xl font-semibold text-white mb-3">
                                    Reservation Successful
                                </h3>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-[280px] mb-8">
                                    Your luxury request for <strong>{shippingForm.name}</strong> has been prioritised. A private designer at AURA will contact you at <strong>{shippingForm.email}</strong> shortly.
                                </p>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-600 bg-neutral-900 border border-neutral-800/80 px-4 py-2 rounded-lg">
                                    Booking ref: #AU-{Math.floor(100000 + Math.random() * 900000)}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCheckoutStep('cart');
                                        onClose();
                                    }}
                                    className="mt-10 rounded-full border border-amber-500/30 hover:border-amber-500 bg-amber-500/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-neutral-950 hover:bg-amber-500 transition"
                                >
                                    Continue Browsing
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Footer - Only visible during Cart step if cart is not empty */}
                    {checkoutStep === 'cart' && cartItems.length > 0 && (
                        <div className="px-6 py-6 border-t border-neutral-900 bg-neutral-950/60 sticky bottom-0">
                            <div className="space-y-2 mb-4 text-xs">
                                <div className="flex justify-between text-neutral-500">
                                    <span>Bag Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-emerald-400">
                                        <span>Promo Discount (10%)</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-neutral-500">
                                    <span>Delivery & Insured Transport</span>
                                    <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                                </div>
                                <div className="pt-2 border-t border-neutral-900 flex justify-between text-sm font-semibold text-white">
                                    <span>Total Est.</span>
                                    <span className="text-amber-400">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={() => setCheckoutStep('shipping')}
                                    className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 shadow-lg hover:opacity-95"
                                >
                                    Proceed to Secure Queue
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <div className="flex items-center justify-center gap-1.5 text-[9px] text-neutral-500 tracking-wider uppercase">
                                    <ShieldCheck className="h-3.5 w-3.5 text-amber-500/80" />
                                    Fully Insured 30-Day Resizing Guarantee
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};
