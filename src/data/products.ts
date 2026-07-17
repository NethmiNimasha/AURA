export interface Product {
    id: string;
    name: string;
    category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
    price: number;
    originalPrice?: number;
    description: string;
    material: 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Platinum';
    image: string;
    rating: number;
    reviewsCount: number;
    details: string[];
    inStock: boolean;
    carat?: string;
    clarity?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 'aurelia-solitaire',
        name: 'The Aurelia Solitaire Ring',
        category: 'Rings',
        price: 12500,
        originalPrice: 14000,
        description: 'A breathtaking 2.05 carat round brilliant-cut diamond of exceptional purity, set on a polished 18k yellow gold band adorned with delicate micro-pave diamonds along the shoulders.',
        material: 'Yellow Gold',
        image: '/gold_ring_hero.png',
        rating: 4.9,
        reviewsCount: 42,
        details: [
            'GIA Certified: Report #249817',
            'Center Stone: 2.05 Carat Round Brilliant',
            'Color Grade: D (Colorless)',
            'Clarity Grade: VVS1 (Very, Very Slightly Included)',
            'Cut Grade: Excellent',
            'Metal: 18k Solid Yellow Gold'
        ],
        inStock: true,
        carat: '2.05ct',
        clarity: 'VVS1'
    },
    {
        id: 'royal-sapphire',
        name: 'Royal Sapphire Diamond Necklace',
        category: 'Necklaces',
        price: 28900,
        description: 'A stellar showcase of high jewelry, featuring a magnificent pear-cut Royal Blue Ceylon sapphire suspended from a cascading collar of round and marquise diamonds set in pure platinum.',
        material: 'Platinum',
        image: '/necklace_category.png',
        rating: 5.0,
        reviewsCount: 18,
        details: [
            'Center Stone: 5.20 Carat Pear-Cut Ceylon Sapphire',
            'Accent Stones: 12.4 Carat Total Weight Marquise & Round Diamonds',
            'Metal: Platinum 950',
            'Style: Classic Drop Pendant Necklace',
            'Length: 16-inch custom adjustable chain'
        ],
        inStock: true,
        carat: '5.20ct Sapphire / 12.4ct Dia',
        clarity: 'IF (Accent Diamonds)'
    },
    {
        id: 'emerald-cascade',
        name: 'Emerald Cascade Drop Earrings',
        category: 'Earrings',
        price: 9800,
        description: 'Rare drop earrings framing two deep-hued pear-shaped Colombian emeralds, crowned with brilliant round diamond halos and suspended from matching diamond-encrusted gold levers.',
        material: 'Yellow Gold',
        image: '/earrings_category.png',
        rating: 4.8,
        reviewsCount: 29,
        details: [
            'Gemstones: two Pear-Cut Colombian Emeralds (4.80 Total Carats)',
            'Frame: Micro-pave Diamond Halos (1.20 Total Carats)',
            'Metal: 18k Solid Yellow Gold',
            'Backing: Secure hinge latch posts',
            'Height: 32mm total drop length'
        ],
        inStock: true,
        carat: '4.80ct Emerald',
        clarity: 'VS2'
    },
    {
        id: 'imperia-bangle',
        name: 'Imperia Gold Diamond Bangle',
        category: 'Bracelets',
        price: 16400,
        originalPrice: 18500,
        description: 'A bold, heavyweight luxury bangle of 18k yellow gold, featuring four interlocking, continuous lines of flawless pave-set diamonds designed to reflect light from every angle.',
        material: 'Yellow Gold',
        image: '/bracelet_category.png',
        rating: 4.9,
        reviewsCount: 31,
        details: [
            'Total Carat Weight: 3.85 Carat Pave Diamonds',
            'Diamond Color: F-G',
            'Diamond Clarity: VS1',
            'Metal: 18k Solid Yellow Gold (38.5 grams)',
            'Clasp: Double-safety pressure clasp'
        ],
        inStock: true,
        carat: '3.85ct',
        clarity: 'VS1'
    },
    {
        id: 'eternal-vine',
        name: 'Eternal Vine Rose Gold Band',
        category: 'Rings',
        price: 4200,
        description: 'An organic, nature-inspired wedding or anniversary band styled as interlocking vines, handcrafted in warm 18k rose gold and speckled with tiny brilliant round cut diamonds.',
        material: 'Rose Gold',
        image: '/gold_ring_hero.png',
        rating: 4.7,
        reviewsCount: 22,
        details: [
            'Stones: Round Brilliant Diamonds (0.85 Carat Total)',
            'Metal: 18k Solid Rose Gold',
            'Width: 4.5mm comfort fit styling',
            'Perfect for stacking with solitaire designs'
        ],
        inStock: true,
        carat: '0.85ct',
        clarity: 'VVS2'
    },
    {
        id: 'lumiere-studs',
        name: 'Lumiere White Gold Diamond Studs',
        category: 'Earrings',
        price: 6500,
        description: 'A timeless staple of any fine jewelry collection: matched round brilliant-cut diamonds held in simple, minimalist four-prong baskets of polished 18k white gold.',
        material: 'White Gold',
        image: '/earrings_category.png',
        rating: 4.9,
        reviewsCount: 88,
        details: [
            'Center Diamonds: Matched Pair (1.50 Total Carat Weight)',
            'Color Grade: E (Colorless)',
            'Clarity Grade: VVS2',
            'Metal: 18k Solid White Gold',
            'Fastening: Screw-back posts for high security'
        ],
        inStock: true,
        carat: '1.50ct (Total)',
        clarity: 'VVS2'
    },
    {
        id: 'aria-pearl-necklace',
        name: 'Aria South Sea Golden Pearl Necklace',
        category: 'Necklaces',
        price: 3600,
        originalPrice: 4200,
        description: 'A select, high-lustre golden South Sea pearl floats gracefully suspended from an 18k rose gold box-chain, topped with a micro-diamond teardrop bale.',
        material: 'Rose Gold',
        image: '/necklace_category.png',
        rating: 4.6,
        reviewsCount: 15,
        details: [
            'Pearl: Grade AAA South Sea Golden Pearl (11.2mm)',
            'Lustre: Very High',
            'Bale Diamond: 0.12 Carat Round Brilliant Accent',
            'Chain: 18-inch 18k Rose Gold Box Chain'
        ],
        inStock: false,
        carat: '11.2mm Pearl',
        clarity: 'Slightly spotted (natural)'
    },
    {
        id: 'stellar-cuff',
        name: 'Celestial Diamond Platinum Cuff',
        category: 'Bracelets',
        price: 22000,
        description: 'A bold, hand-hammered platinum cuff depicting stellar constellations. Seven handset bezel diamonds twinkle at the intersection of delicate engraved silver paths.',
        material: 'Platinum',
        image: '/bracelet_category.png',
        rating: 5.0,
        reviewsCount: 9,
        details: [
            'Metal: Matte Finished Platinum 950',
            'Gemstones: 7 Bezel-Set Stellar-Cut Diamonds (1.75ct Total)',
            'Color: F-G',
            'Width: 15mm open-ended cuff style'
        ],
        inStock: true,
        carat: '1.75ct',
        clarity: 'VS1'
    }
];
