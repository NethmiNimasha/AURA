import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onCatalogClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    onCatalogClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setActiveCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 transition-transform duration-500 group-hover:rotate-180">
            <Sparkles className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <span className="block font-serif text-2xl font-bold tracking-[0.2em] text-neutral-900 dark:text-white">
              AURA
            </span>
            <span className="block text-[9px] tracking-[0.43em] text-amber-600 dark:text-amber-500/80 uppercase">
              Haute Joaillerie
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`relative py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                activeCategory === cat
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-500 to-yellow-300" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative hidden lg:block w-48 xl:w-64">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 py-1.5 pl-9 pr-8 text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition focus:border-amber-500/50 focus:bg-white dark:focus:bg-neutral-900"
            />
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-2 text-neutral-700 dark:text-neutral-200 transition hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-900 bg-white/95 dark:bg-neutral-950/95 px-4 py-6 backdrop-blur-lg">
          <div className="relative w-full mb-6">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 py-2 pl-10 pr-4 text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none focus:border-amber-500/50"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
          </div>

          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full py-2.5 text-left text-sm font-semibold tracking-widest uppercase border-b border-neutral-100 dark:border-neutral-900/50 ${
                  activeCategory === cat
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
