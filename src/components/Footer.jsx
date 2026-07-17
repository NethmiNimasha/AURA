import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-980 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-center">
        <span className="font-serif text-xl font-bold tracking-[0.2em] text-neutral-900 dark:text-white">AURA</span>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-500 font-light">
          Frontend jewellery catalogue — search, browse, and view details.
        </p>
        <p className="mt-6 text-[10px] tracking-wide text-neutral-400 dark:text-neutral-600 uppercase">
          © {new Date().getFullYear()} AURA Haute Joaillerie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
