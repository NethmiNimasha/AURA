import React, { useState } from 'react';
import { Crown, Sparkles, Check, ChevronRight, Calculator } from 'lucide-react';

export const DesignStudio = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        metal: 'Platinum',
        carat: '2.0ct',
        shape: 'Brilliant Round',
        contactName: '',
        contactEmail: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const metals = [
        { name: '18k Yellow Gold', value: 'Yellow Gold', basePrice: 1200, desc: 'Classic, warm luxury look' },
        { name: '18k White Gold', value: 'White Gold', basePrice: 1300, desc: 'Sleek, modern rhodium-plated finish' },
        { name: '18k Rose Gold', value: 'Rose Gold', basePrice: 1250, desc: 'Romantic, blush pink gold tone' },
        { name: 'Platinum 950', value: 'Platinum', basePrice: 2200, desc: 'Purest, dense metal with heavy feel' }
    ];

    const carats = [
        { size: '1.0ct', value: '1.0ct', premium: 3500 },
        { size: '1.5ct', value: '1.5ct', premium: 6800 },
        { size: '2.0ct', value: '2.0ct', premium: 11000 },
        { size: '2.5ct', value: '2.5ct', premium: 17500 },
        { size: '3.0ct', value: '3.0ct', premium: 25000 }
    ];

    const shapes = [
        { name: 'Brilliant Round', value: 'Brilliant Round', factor: 1.0, icon: '◯' },
        { name: 'Cushion Cut', value: 'Cushion', factor: 0.9, icon: '▢' },
        { name: 'Emerald Cut', value: 'Emerald', factor: 0.95, icon: '▭' },
        { name: 'Marquise Cut', value: 'Marquise', factor: 0.85, icon: '◇' },
        { name: 'Oval Cut', value: 'Oval', factor: 0.92, icon: '⬯' },
        { name: 'Pear Cut', value: 'Pear', factor: 0.88, icon: '💧' }
    ];

    const handleSelectMetal = (val) => {
        setSelections({ ...selections, metal: val });
    };

    const handleSelectCarat = (val) => {
        setSelections({ ...selections, carat: val });
    };

    const handleSelectShape = (val) => {
        setSelections({ ...selections, shape: val });
    };

    const getEstimatedCost = () => {
        const chosenMetal = metals.find(m => m.value === selections.metal);
        const chosenCarat = carats.find(c => c.value === selections.carat);
        const chosenShape = shapes.find(s => s.value === selections.shape);

        const metalVal = chosenMetal ? chosenMetal.basePrice : 1500;
        const caratVal = chosenCarat ? chosenCarat.premium : 5000;
        const shapeMultiplier = chosenShape ? chosenShape.factor : 1.0;

        return Math.round((metalVal + caratVal) * shapeMultiplier);
    };

    const handleConsultSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <section id="design" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-neutral-900">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-[0.34em] text-amber-500 uppercase">
                    Bespoke Customizer
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide mt-2">
                    AURA Design Lab
                </h2>
                <p className="text-sm font-light text-neutral-400 leading-relaxed mt-4">
                    Unleash your imagination. Select customized precious metals, diamond carat counts, and certified stone profiles. Instantly review cost indicators before planning your session.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-left">

                {/* Left Hand: Step Selector Panels */}
                <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 relative min-h-[480px]">

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
                        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                            Step {step} of 4: {step === 1 && 'Precious Band Metal'}
                            {step === 2 && 'Diamond Carat Weight'}
                            {step === 3 && 'Center Diamond Cut'}
                            {step === 4 && 'Design Submission Queue'}
                        </span>
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => s <= step && setStep(s)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-amber-400' : s < step ? 'w-2.5 bg-amber-500/50' : 'w-2.5 bg-neutral-800'
                                        }`}
                                    aria-label={`Go to step ${s}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Active Step Panels */}
                    <div className="flex-1 my-2">

                        {/* Step 1: Band Metal */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <p className="text-xs text-neutral-400 font-light mb-4">
                                    Precious metal weight dictate structural stability and durability. Choose from our four hand-melted alloy standards.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {metals.map((m) => (
                                        <button
                                            key={m.value}
                                            onClick={() => handleSelectMetal(m.value)}
                                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition h-32 ${selections.metal === m.value
                                                ? 'border-amber-500 bg-amber-500/5'
                                                : 'border-neutral-900 bg-neutral-950 hover:border-neutral-800'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-sm font-semibold text-white uppercase tracking-wider">{m.name}</span>
                                                {selections.metal === m.value && <Check className="h-4 w-4 text-amber-400 text-right" />}
                                            </div>
                                            <p className="text-[11px] text-neutral-500 font-light leading-relaxed my-1">
                                                {m.desc}
                                            </p>
                                            <span className="text-xs font-bold text-amber-500/80 uppercase">
                                                Cost multiplier: +{formatPrice(m.basePrice)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Carat Weight */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <p className="text-xs text-neutral-400 font-light mb-4">
                                    Our raw loose diamonds are conflict-free sourced and laser-inscribed. Select your preferred carat size weight.
                                </p>
                                <div className="space-y-2.5">
                                    {carats.map((c) => (
                                        <button
                                            key={c.value}
                                            onClick={() => handleSelectCarat(c.value)}
                                            className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${selections.carat === c.value
                                                ? 'border-amber-500 bg-amber-500/5'
                                                : 'border-neutral-900 bg-neutral-950 hover:border-neutral-800'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-bold text-white uppercase tracking-wider w-16">{c.size}</span>
                                                <div className="h-1 bg-neutral-900 w-32 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-amber-400 h-full"
                                                        style={{ width: `${(Number(c.size.replace('ct', '')) / 3.0) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-neutral-400 uppercase font-semibold">Value: {formatPrice(c.premium)}</span>
                                                {selections.carat === c.value && <span className="h-2 w-2 rounded-full bg-amber-400" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Diamond Cut */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <p className="text-xs text-neutral-400 font-light mb-4">
                                    The cut shapes determine reflection brilliance. Choose from our vintage or modern proprietary diamond cuts.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {shapes.map((s) => (
                                        <button
                                            key={s.value}
                                            onClick={() => handleSelectShape(s.value)}
                                            className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center transition gap-2 ${selections.shape === s.value
                                                ? 'border-amber-500 bg-amber-500/5'
                                                : 'border-neutral-900 bg-neutral-950 hover:border-neutral-800'
                                                }`}
                                        >
                                            <span className="text-2xl">{s.icon}</span>
                                            <span className="text-xs font-semibold text-white uppercase tracking-wider">{s.name}</span>
                                            <span className="text-[10px] text-neutral-500 font-medium">Factor: {s.factor}x</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Submission Form */}
                        {step === 4 && (
                            <div className="space-y-4">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-6 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/40 mb-4">
                                            <Sparkles className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <h4 className="font-serif text-xl font-bold text-white mb-2">Bespoke Fitting Saved</h4>
                                        <p className="text-xs text-neutral-400 font-light max-w-sm">
                                            We have put a lock on this custom stone layout. Representative will call you shortly to invite you to our showroom.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleConsultSubmit} className="space-y-4">
                                        <p className="text-xs text-neutral-400 font-light mb-4">
                                            Review estimates in step details. Provide contact details to queue design consulting with our master goldsmiths.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Your Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3.5 text-xs text-white outline-none focus:border-amber-500/50"
                                                    placeholder="Lord Kensington"
                                                    value={selections.contactName}
                                                    onChange={(e) => setSelections({ ...selections, contactName: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Your Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3.5 text-xs text-white outline-none focus:border-amber-500/50"
                                                    placeholder="kensington@castle.com"
                                                    value={selections.contactEmail}
                                                    onChange={(e) => setSelections({ ...selections, contactEmail: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">Design Notes (Opt)</label>
                                            <textarea
                                                rows={2}
                                                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 p-3.5 text-xs text-white outline-none focus:border-amber-500/50"
                                                placeholder="E.g., I'd love a hidden halo underneath the main cushion crown..."
                                                value={selections.notes}
                                                onChange={(e) => setSelections({ ...selections, notes: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:opacity-95"
                                        >
                                            Secure Free VIP Consultation
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Nav Buttons */}
                    {step < 4 && (
                        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-950">
                            <button
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-1.5 rounded-full bg-neutral-900 border border-neutral-800 px-6 py-3 text-xs font-bold tracking-widest uppercase text-white hover:border-amber-500/30 transition"
                            >
                                Continue Setting
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                </div>

                {/* Right Hand: Interactive Estimator Billing Spec */}
                <div className="lg:col-span-4 rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-neutral-900 pb-4">
                            <Calculator className="h-4 w-4 text-amber-500" />
                            <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                                Bespoke Specifications
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {/* Item Specs checklist */}
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-neutral-500 font-medium">Bespoke Metal</span>
                                <span className="text-white font-semibold">{selections.metal}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-neutral-500 font-medium">Loose Carat Count</span>
                                <span className="text-white font-semibold">{selections.carat}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-neutral-500 font-medium">Diamond Cut Style</span>
                                <span className="text-white font-semibold">{selections.shape}</span>
                            </div>

                            <div className="pt-4 border-t border-neutral-900 flex justify-between items-baseline">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Est. Cost</span>
                                <span className="text-xl font-bold text-amber-400">{formatPrice(getEstimatedCost())}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-neutral-900/60 text-xs text-neutral-500 font-light space-y-2.5">
                        <div className="flex gap-2">
                            <Crown className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            <p className="leading-tight">All bespoke orders are handcrafted over 4-6 weeks.</p>
                        </div>
                        <div className="flex gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            <p className="leading-tight">Prices exclude state sales tax. GIA certificates accompanying stone delivery.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};
