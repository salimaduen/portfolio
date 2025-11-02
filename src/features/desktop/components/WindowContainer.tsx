import React, { useEffect, useMemo, useRef, useState } from "react";
import { getWindowBorderStyling } from "@utils/windowBorder";
import { useDraggable } from "@app/hooks/useDraggable";

type SelectorInset =
  | number
  | { selector: string; edge: "top" | "left" | "right" | "bottom" };

type Size = { width: number | string; height: number | string };
type XY = { x: number; y: number };

type Props = {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;

  /** Dragging */
  draggable?: boolean;
  dragHandleSelector?: string;

  /** Uncontrolled initial position (used if no `position` is provided) */
  initialPosition?: XY;

  /** Controlled position (when provided, WindowContainer renders at this exact pos) */
  position?: XY;

  /** Called on drag move; useful for persisting to WindowManager */
  onPositionChange?: (pos: XY) => void;

  /** Maximize */
  maximized?: boolean;

  maximizedInsets?: Partial<{
    top: SelectorInset;
    right: SelectorInset;
    bottom: SelectorInset;
    left: SelectorInset;
  }>;

  /** Back-compat: numeric insets */
  maximizedInset?: { top?: number; right?: number; bottom?: number; left?: number };

  /** Back-compat: if provided, treated as { top: {selector, edge:"top"} } */
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
  position, 
  onPositionChange,
  maximized = false,

  maximizedInsets,
  maximizedInset,                 // back-compat numeric
  maximizedWithinTopbarSelector,  // back-compat selector (top)

  defaultSize = { width: "80vw", height: "60vh" },
  mobileDefaultSize = { width: "96vw", height: "78vh" },
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMemo(
    () => window.matchMedia?.("(max-width: 639px)").matches ?? false,
    []
  );

  // Internal (uncontrolled) position state, used only when `position` prop is NOT provided
  const [uncontrolledPos, setUncontrolledPos] = useState<XY>(initialPosition);

  const isControlled = !!position;
  const currentPos = isControlled ? (position as XY) : uncontrolledPos;

  const { bindStart } = useDraggable({
    initial: currentPos,
    disabled: !draggable || isMobile || maximized,
    bounds: isMobile ? "viewport" : "none", // free-drag desktop, clamped mobile
    getSize: () => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
    onMove: (next) => {
      if (isControlled) {
        onPositionChange?.(next);           // parent owns the state
      } else {
        setUncontrolledPos(next);           // local state
        onPositionChange?.(next);           // (optional) let parent know too
      }
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

  // --- Resolve insets when maximized (supports selector-based & numeric) ---
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    const toPx = (s?: SelectorInset): number => {
      if (!s) return 0;
      if (typeof s === "number") return s;
      const el = document.querySelector(s.selector) as HTMLElement | null;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      switch (s.edge) {
        case "top":
        case "bottom":
          return rect.height;
        case "left":
        case "right":
          return rect.width;
        default:
          return 0;
      }
    };

    const mergedTop: SelectorInset | undefined =
      maximizedInsets?.top ??
      (maximizedWithinTopbarSelector
        ? { selector: maximizedWithinTopbarSelector, edge: "top" }
        : undefined) ??
      (maximizedInset?.top ?? 0);

    const mergedRight: SelectorInset | undefined =
      maximizedInsets?.right ?? (maximizedInset?.right ?? 0);

    const mergedBottom: SelectorInset | undefined =
      maximizedInsets?.bottom ?? (maximizedInset?.bottom ?? 0);

    const mergedLeft: SelectorInset | undefined =
      maximizedInsets?.left ?? (maximizedInset?.left ?? 0);

    const compute = () =>
      setInsets({
        top: toPx(mergedTop),
        right: toPx(mergedRight),
        bottom: toPx(mergedBottom),
        left: toPx(mergedLeft),
      });

    compute();

    const ro = new ResizeObserver(compute);
    const observe = (s?: SelectorInset) => {
      if (!s || typeof s === "number") return;
      const el = document.querySelector(s.selector) as HTMLElement | null;
      if (el) ro.observe(el);
    };

    observe(mergedTop);
    observe(mergedRight);
    observe(mergedBottom);
    observe(mergedLeft);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [maximizedInsets, maximizedInset, maximizedWithinTopbarSelector]);

  // Choose default size per device (when NOT maximized)
  const baseSize = isMobile ? mobileDefaultSize : defaultSize;

  const sizeStyle: React.CSSProperties = maximized
    ? {}
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

  const positionedStyle: React.CSSProperties = maximized
    ? {
        top: insets.top,
        left: insets.left,
        right: insets.right,
        bottom: insets.bottom,
        width: `calc(100vw - ${insets.left + insets.right}px)`,
        height: `calc(100vh - ${insets.top + insets.bottom}px)`,
        transform: "none",
      }
    : {
        top: isMobile ? undefined : currentPos.y,
        left: isMobile ? undefined : currentPos.x,
      };

  return (
    <div
      ref={containerRef}
      data-window-container
      className={baseClasses}
      style={{
        zIndex,
        ...positionedStyle,
        ...sizeStyle,
      }}
      role="dialog"
    >
      {children}
    </div>
  );
}
