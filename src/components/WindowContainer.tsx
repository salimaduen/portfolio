import React, { useEffect, useMemo, useRef } from "react";
import { getWindowBorderStyling } from "../utils/windowBorder";
import { useDraggable } from "../hooks/useDraggable";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;
  /** Enable dragging on desktop (sm+). Mobile is disabled by default. */
  draggable?: boolean;
  /** CSS selector within this window for the drag handle. Default: [data-window-drag-handle] */
  dragHandleSelector?: string;
  /** Initial desktop position (px). */
  initialPosition?: { x: number; y: number };
};

export default function WindowContainer({
  children,
  zIndex = 20,
  className = "",
  draggable = true,
  dragHandleSelector = "[data-window-drag-handle]",
  initialPosition = { x: 96, y: 96 },
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Disable dragging on small screens via a CSS media check
  const isMobile = useMemo(() => window.matchMedia?.("(max-width: 639px)").matches ?? false, []);

  const { pos, bindStart } = useDraggable({
    initial: initialPosition,
    disabled: !draggable || isMobile,
    bounds: "viewport",
    getSize: () => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
  });

  // Attach pointer-down to the handle inside this window
  useEffect(() => {
    if (!containerRef.current) return;
    const handle = containerRef.current.querySelector<HTMLElement>(dragHandleSelector);
    if (!handle) return;
    const onPointerDown = (e: PointerEvent) => bindStart({ nativeEvent: e } as unknown as React.PointerEvent);

    handle.addEventListener("pointerdown", onPointerDown);
    return () => handle.removeEventListener("pointerdown", onPointerDown);
  }, [bindStart, dragHandleSelector, draggable, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`
        ${getWindowBorderStyling()}
        flex flex-col bg-white fixed
        ${!isMobile ? "" : "left-0 right-0 mx-auto top-12 w-[96vw] h-[78vh]"}
        sm:w-[80vw] sm:h-[60vh] lg:w-[70vw]
        ${className}
      `}
      style={{
        zIndex,
        // Desktop: position via top/left; Mobile stays centered by classes above
        top: isMobile ? undefined : pos.y,
        left: isMobile ? undefined : pos.x,
      }}
      role="dialog"
    >
      {children}
    </div>
  );
}
