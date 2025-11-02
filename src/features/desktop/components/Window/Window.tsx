import React, { useState } from "react";
import { useWindows } from "@app/context/WindowManager";
import { WindowContainer } from "@features/desktop";
import { WindowChrome } from "@features/desktop";

/** Keep a local copy of the SelectorInset type so this file is standalone. */
type SelectorInset =
  | number
  | { selector: string; edge: "top" | "left" | "right" | "bottom" };

type Props = {
  /** The WindowManager id (e.g., "browser", "files") */
  id: string;
  /** Title in the chrome */
  title: string;
  /** dark|light style for the chrome */
  variant?: "light" | "dark";

  /** If provided, replaces the default chrome (for custom bars like Explorer). */
  renderTopBar?: (controls: {
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    isMaximized: boolean;
  }) => React.ReactNode;

  /** Children = content area of the window */
  children: React.ReactNode;

  /**
   * NEW: Multi-edge insets for maximized layout.
   * By default we respect the desktop top bar and the left dock.
   */
  maximizedInsets?: Partial<{
    top: SelectorInset;
    right: SelectorInset;
    bottom: SelectorInset;
    left: SelectorInset;
  }>;

  /** Back-compat: if provided, used for top inset only. */
  maximizedWithinTopbarSelector?: string;

  /** Optional fixed zIndex (usually WindowManager controls this). */
  zIndexOverride?: number;
};

export default function Window({
  id,
  title,
  variant = "light",
  renderTopBar,
  children,

  maximizedInsets,
  maximizedWithinTopbarSelector = "[data-desktop-topbar]",
  zIndexOverride,
}: Props) {
  const { get, close, toggleMinimize, focus } = useWindows();
  const s = get(id);

  // If window is not open or is minimized, do not render anything
  if (!s.open || s.minimized) return null;

  const [isMax, setIsMax] = useState(false);

  const onClose = () => close(id);
  const onMinimize = () => toggleMinimize(id);
  const onToggleMaximize = () => setIsMax((v) => !v);

  // Bring to front when mouse down on the window body
  const bringToFront = () => focus(id);

  // Defaults: avoid covering top bar and the left dock
  const effectiveInsets = {
    top:
      maximizedInsets?.top ??
      ({ selector: "[data-desktop-topbar]", edge: "top" } as SelectorInset),
    left:
      maximizedInsets?.left ??
      ({ selector: "[data-desktop-dock]", edge: "left" } as SelectorInset),
    right: maximizedInsets?.right ?? 0,
    bottom: maximizedInsets?.bottom ?? 0,
  } as const;

  return (
    <div onMouseDown={bringToFront} style={{ zIndex: zIndexOverride ?? s.z }}>
      <WindowContainer
        draggable
        zIndex={zIndexOverride ?? s.z}
        maximized={isMax}
        maximizedInsets={effectiveInsets}
        // keep back-compat for any old callsites:
        maximizedWithinTopbarSelector={maximizedWithinTopbarSelector}
      >
        {renderTopBar ? (
          renderTopBar({
            onClose,
            onMinimize,
            onToggleMaximize,
            isMaximized: isMax,
          })
        ) : (
          <WindowChrome
            title={title}
            variant={variant}
            onClose={onClose}
            onMinimize={onMinimize}
            isMaximized={isMax}
            onToggleMaximize={onToggleMaximize}
          />
        )}

        {/* Content area */}
        <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      </WindowContainer>
    </div>
  );
}
