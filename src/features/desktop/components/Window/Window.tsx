import React, { useState } from "react";
import { useWindows } from "@app/context/WindowManager";
import { WindowContainer } from "@features/desktop";
import { WindowChrome } from "@features/desktop";

type Props = {
  /** The WindowManager id (e.g., "browser", "files") */
  id: string;
  /** Title in the chrome */
  title: string;
  /** dark|light style for the chrome */
  variant?: "light" | "dark";
  /** If provided, this render prop replaces the default chrome (useful for your classic File Explorer bar) */
  renderTopBar?: (controls: {
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    isMaximized: boolean;
  }) => React.ReactNode;
  /** Children = content area of the window */
  children: React.ReactNode;

  /** Ensures maximize respects your desktop top bar */
  maximizedWithinTopbarSelector?: string;

  /** Optional fixed zIndex if you ever need; usually managed by WindowManager */
  zIndexOverride?: number;
};

export default function Window({
  id,
  title,
  variant = "light",
  renderTopBar,
  children,
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

  return (
    <div onMouseDown={bringToFront} style={{ zIndex: zIndexOverride ?? s.z }}>
      <WindowContainer
        draggable
        zIndex={zIndexOverride ?? s.z}
        maximized={isMax}
        maximizedWithinTopbarSelector={maximizedWithinTopbarSelector}
      >
        {renderTopBar ? (
          renderTopBar({ onClose, onMinimize, onToggleMaximize, isMaximized: isMax })
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
