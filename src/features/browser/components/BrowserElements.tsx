import React from "react";

export const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-lg font-semibold">{children}</h1>
);

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-sm font-medium text-neutral-800 mt-2">{children}</h2>
);

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-neutral-700 leading-relaxed">{children}</p>
);

export const List: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="list-disc list-inside text-sm text-neutral-800 space-y-1">{children}</ul>
);

export const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => <li>{children}</li>;

export const LinkA: React.FC<
  { href: string; external?: boolean; children: React.ReactNode }
> = ({ href, external, children }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer" : undefined}
    className="underline hover:no-underline text-blue-700"
  >
    {children}
  </a>
);

export const Figure: React.FC<{ src: string; alt: string; caption?: string }> = ({ src, alt, caption }) => (
  <figure className="my-2">
    <img src={src} alt={alt} className="rounded border border-neutral-200 max-w-full" />
    {caption && <figcaption className="text-[11px] text-neutral-500 mt-1">{caption}</figcaption>}
  </figure>
);

export const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="text-xs bg-neutral-100 border border-neutral-200 rounded p-2 overflow-auto">
    <code>{children}</code>
  </pre>
);

export const Divider: React.FC = () => <hr className="my-3 border-neutral-200" />;

export const Section: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-1">
    {title && <H2>{title}</H2>}
    {children}
  </section>
);
