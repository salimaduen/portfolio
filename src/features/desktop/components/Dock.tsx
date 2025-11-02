import React from "react";
import { GrApps } from "react-icons/gr";
import { OSIcon } from "@app/ui";
import { APP_CATALOG, AppId } from "@app/models/appCatalog";
import { useWindows } from "@app/context/WindowManager";

export default function Dock({
  autoTopFromSelector,
  topInset = 0,
  className = "",
  widthPx = 56,
  pinned = ["browser", "files"] as AppId[],
}: {
  autoTopFromSelector?: string;
  topInset?: number;
  className?: string;
  widthPx?: number;
  pinned?: AppId[];
}) {
  const { get, toggleMinimize, focus, openOrder, topZ } = useWindows();

  const [top, setTop] = React.useState(topInset);
  React.useEffect(() => {
    if (!autoTopFromSelector) { setTop(topInset); return; }
    const el = document.querySelector(autoTopFromSelector) as HTMLElement | null;
    if (!el) { setTop(topInset); return; }
    const update = () => setTop(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoTopFromSelector, topInset]);

  const openApps = openOrder.filter((id) => get(id).open);
  const all: AppId[] = [...pinned, ...openApps.filter((id) => !pinned.includes(id))];

  const handleActive = (id: AppId, isOpen: boolean, isMin: boolean) => {
    if (isOpen && !isMin) toggleMinimize(id);
    else focus(id);
  };

  const onKey = (e: React.KeyboardEvent, id: AppId, isOpen: boolean, isMin: boolean) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActive(id, isOpen, isMin);
    }
  };

  return (
    <aside className={`fixed left-0 z-[5] ${className}`} style={{ top, bottom: 0, width: widthPx }}>
      <div className="h-full w-full bg-black/30 backdrop-blur-sm overflow-hidden ring-1 ring-black/25 shadow-lg flex flex-col py-2">
        <div className="flex-1 w-full flex flex-col items-center overflow-auto">
          {all.map((id) => {
            const meta = APP_CATALOG[id];
            if (!meta) return null;
            const s = get(id);
            const isOpen = s.open;
            const isMin = s.minimized;
            const isFocused = s.open && !s.minimized && s.z === topZ;

            return (
              <div
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => handleActive(id, isOpen, isMin)}
                onKeyDown={(e) => onKey(e, id, isOpen, isMin)}
                title={meta.name}
                className="
                  relative w-12 h-12 my-1
                  text-white flex items-center justify-center
                  cursor-pointer select-none
                  transition-[background,transform] duration-150
                  hover:bg-white/10 active:scale-[0.98]
                  rounded-xl
                "
              >
                {/* Focus highlight layer (independent of icon size) */}
                {isFocused && (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="block w-10 h-10 rounded-xl bg-white/15" />
                  </span>
                )}

                {/* Ubuntu-style open indicator on the LEFT */}
                {isOpen && (
                  <span
                    className={`
                      absolute left-1 top-1/2 -translate-y-1/2
                      w-1.5 h-1.5 rounded-full
                      ${isMin ? "bg-neutral-400" : "bg-neutral-300"}
                    `}
                  />
                )}

                {/* ICON — explicit size, independent from the container */}
                <OSIcon type={meta.dockIconType} variant="dock" sizePx={24} />
              </div>
            );
          })}
        </div>

        {/* Bottom: "Show Applications" (aesthetic only) */}
        <div className="w-full flex items-center justify-center pt-1 pb-1">
          <div
            role="button"
            tabIndex={0}
            className="
              w-12 h-12 mb-1 rounded-xl
              bg-transparent hover:bg-white/10
              text-white flex items-center justify-center
              cursor-pointer select-none
              transition-[background,transform] duration-150 active:scale-[0.98]
            "
            title="Show Applications"
          >
            <GrApps size={28} color="white" />
          </div>
        </div>
      </div>
    </aside>
  );
}
