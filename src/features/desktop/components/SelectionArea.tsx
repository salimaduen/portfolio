import { useState, useEffect } from "react";

/** Renders the drag-select rectangle under everything except the wallpaper */
export default function SelectionArea({
  className = "z-[1]", // <- LOW layer by default
}: { className?: string }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [rect, setRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Only start selection on bare desktop surface
      if (t.closest("[data-window-container]")) return;
      if (t.closest("[data-desktop-topbar]") || t.closest("[data-desktop-dock]")) return;

      setIsSelecting(true);
      setStart({ x: e.clientX, y: e.clientY });
      setRect({ left: e.clientX, top: e.clientY, width: 0, height: 0 });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isSelecting || !start) return;
      const x1 = Math.min(e.clientX, start.x);
      const y1 = Math.min(e.clientY, start.y);
      const x2 = Math.max(e.clientX, start.x);
      const y2 = Math.max(e.clientY, start.y);
      setRect({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });
    };

    const onMouseUp = () => {
      setIsSelecting(false);
      setStart(null);
      setRect(null);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isSelecting, start]);

  if (!rect) return null;

  return (
    <div
      // IMPORTANT: absolute, not fixed, so it stays inside the desktop stacking context
      className={`absolute pointer-events-none bg-blue-500/30 border border-blue-500 rounded-sm ${className}`}
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}
