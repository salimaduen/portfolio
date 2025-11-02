import React, { useEffect, useMemo, useRef } from "react";
import { getWindowBorderStyling } from "@utils/windowBorder"; 
import { useDraggable } from "@app/hooks/useDraggable"; 

type Size = { width: number | string; height: number | string };

type Props = {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;

  /** Dragging */
  draggable?: boolean;
  dragHandleSelector?: string;
  initialPosition?: { x: number; y: number };

  /** Maximize */
  maximized?: boolean;
  maximizedInset?: { top?: number; right?: number; bottom?: number; left?: number };
  maximizedWithinTopbarSelector?: string;

  defaultSize?: Size;          // desktop/tablet
  mobileDefaultSize?: Size;    // mobile (optional; falls back to defaultSize)
};

function toCssSize(v: number | string | undefined): string | undefined {
  if (v == null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

export default function WindowContainer({
  children,
  zIndex = 20,
  className = "",
  draggable = true,
  dragHandleSelector = "[data-window-drag-handle]",
  initialPosition = { x: 96, y: 96 },
  maximized = false,
  maximizedInset,
  maximizedWithinTopbarSelector,
  defaultSize = { width: "80vw", height: "60vh" },
  mobileDefaultSize = { width: "96vw", height: "78vh" },
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMemo(
    () => window.matchMedia?.("(max-width: 639px)").matches ?? false,
    []
  );

  const { pos, bindStart } = useDraggable({
    initial: initialPosition,
    disabled: !draggable || isMobile || maximized,
    bounds: isMobile ? "viewport" : "none",   // free-drag desktop, clamped mobile
    getSize: () => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const handle = containerRef.current.querySelector<HTMLElement>(dragHandleSelector);
    if (!handle) return;
    const onPointerDown = (e: PointerEvent) =>
      bindStart({ nativeEvent: e } as unknown as React.PointerEvent);
    handle.addEventListener("pointerdown", onPointerDown);
    return () => handle.removeEventListener("pointerdown", onPointerDown);
  }, [bindStart, dragHandleSelector]);

  // Compute insets when maximized to avoid covering your desktop top bar
  const inset = React.useMemo(() => {
    let top = maximizedInset?.top ?? 0;
    let right = maximizedInset?.right ?? 0;
    let bottom = maximizedInset?.bottom ?? 0;
    let left = maximizedInset?.left ?? 0;

    if (maximized && maximizedWithinTopbarSelector) {
      const el = document.querySelector(maximizedWithinTopbarSelector) as HTMLElement | null;
      if (el && maximizedInset?.top == null) {
        top = el.getBoundingClientRect().height;
      }
    }
    return { top, right, bottom, left };
  }, [maximized, maximizedInset, maximizedWithinTopbarSelector]);

  // Choose default size per device (when NOT maximized)
  const baseSize = isMobile ? mobileDefaultSize : defaultSize;

  // Inline styles for width/height so windows always have a default size
  const sizeStyle: React.CSSProperties = maximized
    ? {} // maximized uses insets; size auto-fills
    : {
        width: toCssSize(baseSize.width),
        height: toCssSize(baseSize.height),
      };

  const baseClasses = `
    ${getWindowBorderStyling()}
    fixed flex flex-col bg-white
    ${isMobile ? "left-0 right-0 mx-auto top-12" : ""}  /* center on mobile */
    ${className}
  `;

  return (
    <div
      ref={containerRef}
      className={baseClasses}
      style={{
        zIndex,
        // position: free drag (desktop) or centered mobile; maximized uses insets
        top: maximized ? inset.top : (isMobile ? undefined : pos.y),
        left: maximized ? inset.left : (isMobile ? undefined : pos.x),
        right: maximized ? inset.right : undefined,
        bottom: maximized ? inset.bottom : undefined,
        ...sizeStyle,
      }}
      role="dialog"
    >
      {children}
    </div>
  );
}
