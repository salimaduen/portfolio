import React from "react";

const Header: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <header className="border-b border-neutral-200 px-4 py-3 shrink-0">
    <h1 className="text-lg font-semibold">{title}</h1>
    {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
  </header>
);

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  children ? (
    <footer className="border-t border-neutral-200 px-4 py-2 text-[11px] text-neutral-500 shrink-0">
      {children}
    </footer>
  ) : null;

/**
 * Page layout where:
 * - Header and footer stay fixed in their zones
 * - Only the content area scrolls
 */
const BrowserPage: React.FC<{
  title: string;
  subtitle?: string;
  footerNote?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, subtitle, footerNote, children }) => {
  return (
    <div className="flex flex-col h-full text-black bg-white">
      {/* Header (fixed top) */}
      <Header title={title} subtitle={subtitle} />

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {children}
      </main>

      {/* Footer (fixed bottom) */}
      <Footer>{footerNote}</Footer>
    </div>
  );
};

export default BrowserPage;
