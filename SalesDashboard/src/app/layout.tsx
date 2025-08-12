import './globals.css';
import React from 'react';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Sales Dashboard ✨',
  description: 'Colorful, accessible sales dashboard — interactive charts, filters, and performance-first design.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 text-slate-900">
        <a href="#maincontent" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white px-3 py-2 rounded shadow">
          Skip to main content
        </a>
        <div className="min-h-screen antialiased">
          <header className="border-b border-slate-200">
            <div className="container-max py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div aria-hidden className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-amber-400 flex items-center justify-center text-white font-bold shadow-lg">a</div>
                <div>
                  <h1 className="text-xl font-semibold">Abii Sales Dashboard</h1>
                  <p className="text-sm text-slate-600">Colorful insights with accessibility & performance.</p>
                </div>
              </div>
              <nav aria-label="Main navigation">
                <ul className="flex gap-3">
                  <li><a className="text-sm hover:underline" href="#charts">Charts</a></li>
                  <li><a className="text-sm hover:underline" href="#filters">Filters</a></li>
                  <li><a className="text-sm hover:underline" href="#docs">Docs</a></li>
                </ul>
              </nav>
            </div>
          </header>

          <main id="maincontent" className="container-max py-8" tabIndex={-1}>
            {children}
          </main>

          <footer className="border-t border-slate-200 mt-12">
            <div className="container-max py-6 text-sm text-slate-600">
              @2025 Sales Dashboard
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
