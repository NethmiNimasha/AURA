import React, { useState } from 'react';
import { Camera, Sparkles, AlertCircle, Check } from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';

export const VirtualTryOn: React.FC = () => {
    const tryOnProducts = PRODUCTS.slice(0, 4); // Rings, Necklaces, Earrings, Bracelets
    const [selectedProduct, setSelectedProduct] = useState<Product>(tryOnProducts[0]);
    const [skinColor, setSkinColor] = useState<'fair' | 'medium' | 'olive' | 'dark'>('medium');
    const [imageScale, setImageScale] = useState(100);
    const [activeAdjust, setActiveAdjust] = useState(0); // rotation angle
    const [snapshotTaken, setSnapshotTaken] = useState(false);

    const skinTones = [
        { label: 'Ivory/Fair', value: 'fair', class: 'bg-[#FBEBE0]' },
        { label: 'Honey/Medium', value: 'medium', class: 'bg-[#E3BA96]' },
        { label: 'Bronze/Olive', value: 'olive', class: 'bg-[#C68D5F]' },
        { label: 'Espresso/Dark', value: 'dark', class: 'bg-[#8F593C]' }
    ];

    // Helper simulated photo background for each category based on chosen skin Tone
    const getSimulatedBg = () => {
        // We will render CSS colors & geometric hands/bust outlines to simulate a highly stylized wireframe try-on!
        // Hand for Rings, Collar for Necklaces, Head for Earrings, Wrist for Bracelets
        switch (selectedProduct.category) {
            case 'Rings':
                return (
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-colors duration-500">
                        {/* Hand Wireframe Silhouette */}
                        <div className="relative w-48 h-80 flex flex-col justify-end items-center opacity-85">
                            {/* Wrist */}
                            <div
                                className="w-16 h-36 rounded-t-xl transition-colors duration-500"
                                style={{ backgroundColor: getSkinHex() }}
                            />
                            {/* Palm */}
                            <div
                                className="w-24 h-24 rounded-2xl relative -mt-6 transition-colors duration-500"
                                style={{ backgroundColor: getSkinHex() }}
                            >
                                {/* Finger stub where ring sits */}
                                <div
                                    className="absolute -top-16 left-8 w-8 h-20 rounded-t-full transition-colors duration-500"
                                    style={{ backgroundColor: getSkinHex() }}
                                >
                                    {/* Ring Position Anchor inside finger */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                        <img
                                            src={selectedProduct.image}
                                            alt=""
                                            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-300"
                                            style={{
                                                width: `${(imageScale / 100) * 80}px`,
                                                height: `${(imageScale / 100) * 80}px`,
                                                transform: `rotate(${activeAdjust}deg)`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Necklaces':
                return (
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-colors duration-500">
                        {/* Neck Bust Wireframe */}
                        <div className="relative w-64 h-64 flex flex-col items-center">
                            {/* Head Silhouette */}
                            <div className="w-16 h-20 rounded-full mb-1 bg-neutral-900/40 border border-neutral-800" />
                            {/* Neck */}
                            <div
                                className="w-14 h-20 -mt-2 transition-colors duration-500"
                                style={{ backgroundColor: getSkinHex() }}
                            />
                            {/* Collar bone chest */}
                            <div
                                className="w-48 h-32 rounded-t-[50px] transition-colors duration-500 relative"
                                style={{ backgroundColor: getSkinHex() }}
                            >
                                {/* Necklace Position Anchor */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                                    <img
                                        src={selectedProduct.image}
                                        alt=""
                                        className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] pointer-events-none transition-all duration-300"
                                        style={{
                                            width: `${(imageScale / 100) * 160}px`,
                                            height: `${(imageScale / 100) * 140}px`,
                                            transform: `rotate(${activeAdjust}deg)`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Earrings':
                return (
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-colors duration-500">
                        {/* Profile silhouette */}
                        <div className="relative w-56 h-72 flex justify-center items-center">
                            {/* Face/Ear shape */}
                            <div
                                className="w-44 h-44 rounded-full relative transition-colors duration-500"
                                style={{ backgroundColor: getSkinHex() }}
                            >
                                {/* Ear Shape */}
                                <div
                                    className="absolute right-0 top-16 w-12 h-20 rounded-full border-l border-black/10 transition-colors duration-500"
                                    style={{ backgroundColor: getSkinHex() }}
                                >
                                    {/* Earlobe Anchor point for earrings */}
                                    <div className="absolute bottom-2 left-3 z-20">
                                        <img
                                            src={selectedProduct.image}
                                            alt=""
                                            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-300"
                                            style={{
                                                width: `${(imageScale / 100) * 65}px`,
                                                height: `${(imageScale / 100) * 65}px`,
                                                transform: `rotate(${activeAdjust}deg)`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Bracelets':
                return (
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-colors duration-500">
                        {/* Wrist / arm silhouette */}
                        <div className="relative w-64 h-48 flex items-center justify-center">
                            {/* Forearm */}
                            <div
                                className="w-80 h-14 rounded-r-full rotate-[15deg] transition-colors duration-500 relative flex items-center"
                                style={{ backgroundColor: getSkinHex() }}
                            >
                                {/* Bracelet Position around wrist */}
                                <div className="absolute right-24 z-20">
                                    <img
                                        src={selectedProduct.image}
                                        alt=""
                                        className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] pointer-events-none transition-all duration-300"
                                        style={{
                                            width: `${(imageScale / 100) * 90}px`,
                                            height: `${(imageScale / 100) * 90}px`,
                                            transform: `rotate(${activeAdjust + 75}deg)` // aligned to arm
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const getSkinHex = () => {
        switch (skinColor) {
            case 'fair': return '#FBEBE0';
            case 'medium': return '#E3BA96';
            case 'olive': return '#C68D5F';
            case 'dark': return '#8F593C';
        }
    };

    const handleTakeSnapshot = () => {
        setSnapshotTaken(true);
        setTimeout(() => setSnapshotTaken(false), 3000);
    };

    return (
        <section id="tryon" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-[0.34em] text-purple-400 uppercase">
                    Augmented Preview
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide mt-2">
                    Virtual Try-On Salon
                </h2>
                <p className="text-sm font-light text-neutral-400 leading-relaxed mt-4">
                    Visualize luxury placement without stepping out. Select standard models or adjust dimensions to see how diamonds capture surrounding lighting.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                {/* Left Side: Try On Render Container */}
                <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 relative min-h-[500px]">

                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-4 z-10">
                        <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-purple-400" />
                            <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Live Try-On Canvas</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Active Simulation</span>
                        </div>
                    </div>

                    {/* Interactive Screen Display */}
                    <div className="relative flex-1 flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_#1c1917_0%,_#0a0a0a_100%)] rounded-2xl overflow-hidden my-6 border border-neutral-900">
                        {/* Background grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                        {/* Simulated Live Feed */}
                        {getSimulatedBg()}

                        {/* Snapshot Triggered Flash */}
                        {snapshotTaken && (
                            <div className="absolute inset-0 bg-white z-40 flex items-center justify-center animate-out fade-out duration-1000">
                                <div className="bg-neutral-950 border border-amber-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-2">
                                    <Check className="h-5 w-5 text-emerald-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-white">Snapshot Generated & Saved</span>
                                </div>
                            </div>
                        )}

                        {/* Prompt indicator overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-neutral-950/70 border border-neutral-800 p-3.5 rounded-xl backdrop-blur-md">
                            <AlertCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <p className="text-[10px] text-neutral-400 text-left font-light leading-relaxed">
                                This utilizes a responsive SVG wireframe model template. Live camera video integrations can be toggled in boutiques.
                            </p>
                        </div>
                    </div>

                    {/* Fine Tuning Sliders Footer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-950 z-10 text-left">
                        <div>
                            <div className="flex justify-between text-xs text-neutral-400 uppercase font-semibold mb-1">
                                <span>Scale Piece</span>
                                <span className="text-purple-300 font-bold">{imageScale}%</span>
                            </div>
                            <input
                                type="range"
                                min="60"
                                max="140"
                                value={imageScale}
                                onChange={(e) => setImageScale(Number(e.target.value))}
                                className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-neutral-400 uppercase font-semibold mb-1">
                                <span>Align Angle</span>
                                <span className="text-purple-300 font-bold">{activeAdjust}°</span>
                            </div>
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                value={activeAdjust}
                                onChange={(e) => setActiveAdjust(Number(e.target.value))}
                                className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                    </div>

                </div>

                {/* Right Side: Setup Controls */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-6">

                    {/* Section 1: Item Choices */}
                    <div className="rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 space-y-4 text-left">
                        <h3 className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                            1. Select Jewelry Piece
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {tryOnProducts.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProduct(p)}
                                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition ${selectedProduct.id === p.id
                                            ? 'border-purple-500/50 bg-purple-500/5'
                                            : 'border-neutral-900 bg-neutral-950 hover:border-neutral-800'
                                        }`}
                                >
                                    <img src={p.image} alt="" className="h-12 w-12 object-cover rounded-md mb-2 shadow" />
                                    <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-wider block line-clamp-1">
                                        {p.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Skin Tone Simulator */}
                    <div className="rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 space-y-4 text-left">
                        <h3 className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                            2. Select Model Tone
                        </h3>
                        <div className="space-y-2">
                            {skinTones.map((tone) => (
                                <button
                                    key={tone.value}
                                    onClick={() => setSkinColor(tone.value as any)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${skinColor === tone.value
                                            ? 'border-purple-500 bg-purple-500/5 text-white'
                                            : 'border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-800'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`h-6 w-6 rounded-full border border-neutral-900 ${tone.class}`} />
                                        <span className="text-xs font-semibold uppercase tracking-wider">{tone.label}</span>
                                    </div>
                                    {skinColor === tone.value && <span className="h-2 w-2 rounded-full bg-purple-400" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Final Actions */}
                    <div className="rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 space-y-3 text-left">
                        <button
                            onClick={handleTakeSnapshot}
                            className="w-full flex items-center justify-center gap-2 rounded-full bg-purple-500 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-purple-600 active:scale-95"
                        >
                            <Camera className="h-4 w-4" />
                            Capture Portrait Fit
                        </button>

                        <button
                            onClick={() => alert(`Consultation request submitted for "${selectedProduct.name}" virtual try-on configuration.`)}
                            className="w-full flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/30 py-4 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:bg-neutral-900 hover:text-white"
                        >
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            Book Diamond Fitting
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};
