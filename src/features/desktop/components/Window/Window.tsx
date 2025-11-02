import React, { useState } from "react";
import { AppId } from "@app/models/appCatalog";
import { useWindows } from "@app/context/WindowManager";
import {WindowContainer} from "@features/desktop";
import {WindowChrome} from "@features/desktop";

/** Keep in sync with WindowContainer's type for convenience */
type SelectorInset =
  | number
  | { selector: string; edge: "top" | "left" | "right" | "bottom" };

type Props = {
  id: AppId;
  title: string;
  variant?: "light" | "dark";
  renderTopBar?: (controls: {
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    isMaximized: boolean;
  }) => React.ReactNode;
  children: React.ReactNode;
  maximizedInsets?: Partial<{
    top: SelectorInset;
    right: SelectorInset;
    bottom: SelectorInset;
    left: SelectorInset;
  }>;
  maximizedWithinTopbarSelector?: string;
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
  const { get, close, toggleMinimize, focus, setPosition } = useWindows();
  const s = get(id);

  if (!s.open || s.minimized) return null;

  const [isMax, setIsMax] = useState(false);
  const onClose = () => close(id);
  const onMinimize = () => toggleMinimize(id);
  const onToggleMaximize = () => setIsMax((v) => !v);
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
        maximizedWithinTopbarSelector={maximizedWithinTopbarSelector}
        /** Controlled position from WindowManager (persisted across minimize/restore) */
        position={s.pos}
        onPositionChange={(p) => setPosition(id, p)}
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

        <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      </WindowContainer>
    </div>
  );
}
