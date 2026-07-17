import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { PRODUCTS, type Product } from './data/products';
import { useTheme } from './context/ThemeContext';
import { Filter } from 'lucide-react';
import './App.css';

function App() {
  const { theme } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query) ||
      p.details.some((d) => d.toLowerCase().includes(query));
    const matchesMaterial = selectedMaterial === 'All' || p.material === selectedMaterial;

    return matchesCategory && matchesSearch && matchesMaterial;
  }).sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className={`${theme} min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300`}>
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCatalogClick={scrollToCatalog}
      />

      <Hero onExploreClick={scrollToCatalog} />

      <section className="bg-neutral-100 dark:bg-neutral-980 py-10 border-b border-neutral-200 dark:border-neutral-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Royal Solitaires', image: '/gold_ring_hero.png', category: 'Rings' },
              { label: 'Sapphire Cascades', image: '/necklace_category.png', category: 'Necklaces' },
              { label: 'Emerald Halos', image: '/earrings_category.png', category: 'Earrings' },
              { label: 'Solid Gold Bangles', image: '/bracelet_category.png', category: 'Bracelets' },
            ].map((catItem) => (
              <button
                key={catItem.label}
                onClick={() => {
                  setActiveCategory(catItem.category);
                  scrollToCatalog();
                }}
                className="group relative h-40 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-900 text-left transition-all duration-500 hover:border-amber-500/40"
              >
                <img
                  src={catItem.image}
                  alt={catItem.label}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 dark:opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80 dark:group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent dark:from-neutral-950 dark:via-neutral-950/20" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 dark:text-amber-400 uppercase">
                    Collection
                  </span>
                  <h3 className="font-serif text-base font-semibold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {catItem.label}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main id="catalog" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-amber-600 dark:text-amber-500 uppercase">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white mt-1">
              Select Your Heirloom
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white/80 dark:bg-neutral-950/80 p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-900">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-amber-500/50"
              >
                <option value="All">All Metals</option>
                <option value="Yellow Gold">Yellow Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-amber-500/50"
            >
              <option value="featured">Featured View</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-600 px-2">
              {filteredProducts.length} items found
            </span>
          </div>
        </div>

        {searchQuery.trim() && (
          <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
            Showing results for{' '}
            <span className="font-semibold text-amber-600 dark:text-amber-400">&quot;{searchQuery.trim()}&quot;</span>
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-900 p-16 text-center max-w-md mx-auto">
            <h3 className="font-serif text-lg text-neutral-900 dark:text-white mb-2">No Matches Found</h3>
            <p className="text-xs text-neutral-500 font-light mb-6">
              No jewellery pieces match your search or filters. Try a different keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedMaterial('All');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-amber-400"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
