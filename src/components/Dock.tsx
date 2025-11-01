import React from "react";
import { GrApps } from "react-icons/gr";

type DockItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isOpen?: boolean;
  isMinimized?: boolean;
  onClick: () => void;
};

type Props = {
  items: DockItem[];
  /** Auto-offset from your desktop top bar */
  autoTopFromSelector?: string; // e.g. "[data-desktop-topbar]"
  /** Fallback/manual top inset (px) */
  topInset?: number;
  className?: string;
  widthPx?: number; // default 56
};

export default function Dock({
  items,
  autoTopFromSelector,
  topInset = 0,
  className = "",
  widthPx = 56,
}: Props) {
  const [top, setTop] = React.useState(topInset);

  React.useEffect(() => {
    if (!autoTopFromSelector) {
      setTop(topInset);
      return;
    }
    const el = document.querySelector(autoTopFromSelector) as HTMLElement | null;
    if (!el) {
      setTop(topInset);
      return;
    }
    const update = () => setTop(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoTopFromSelector, topInset]);

  return (
    <aside
      className={`fixed left-0 z-[5] ${className}`}
      style={{ top, bottom: 0, width: widthPx }}
    >
      <div
        className="
          h-full w-full
          bg-black/30 backdrop-blur-sm
          overflow-hidden
          ring-1 ring-black/25 shadow-lg
          flex flex-col
          py-2
        "
      >
        {/* Scrollable app icons */}
        <div className="flex-1 w-full flex flex-col items-center overflow-auto">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={it.onClick}
              className="
                relative w-12 h-12 my-1 rounded-xl
                bg-neutral-900/85 hover:bg-neutral-800
                text-white flex items-center justify-center
                transition-colors
              "
              title={it.label}
            >
              {it.icon}
              {it.isOpen && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 rounded-full
                    ${it.isMinimized ? "bg-neutral-400" : "bg-emerald-400"}`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bottom: "Show Applications" grid (no-op, aesthetic) */}
        <div className="w-full flex items-center justify-center pt-1 pb-1">
            <GrApps size={28} color="white"/>
        </div>
      </div>
    </aside>
  );
}
