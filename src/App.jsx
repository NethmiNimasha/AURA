import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { useTheme } from './context/ThemeContext';
import { Filter } from 'lucide-react';
import './App.css';

function App() {
  const { theme } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

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
