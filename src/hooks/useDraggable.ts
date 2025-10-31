import { useCallback, useEffect, useRef, useState } from "react";

type Bounds = "viewport" | { top: number; left: number; right: number; bottom: number };

type Options = {
  initial: { x: number; y: number };
  disabled?: boolean;
  bounds?: Bounds;
  /** Return element size to constrain precisely (optional but better) */
  getSize?: () => { width: number; height: number } | null;
  onStart?: () => void;
  onMove?: (pos: { x: number; y: number }) => void;
  onEnd?: (pos: { x: number; y: number }) => void;
};

export function useDraggable({
  initial,
  disabled = false,
  bounds = "viewport",
  getSize,
  onStart,
  onMove,
  onEnd,
}: Options) {
  const [pos, setPos] = useState<{ x: number; y: number }>(initial);
  const draggingRef = useRef(false);
  const originRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number } | null>(null);

  const clamp = useCallback(
    (x: number, y: number) => {
      if (bounds === "viewport") {
        const size = getSize?.() || { width: 0, height: 0 };
        const maxX = Math.max(0, (window.innerWidth || 0) - size.width);
        const maxY = Math.max(0, (window.innerHeight || 0) - size.height);
        return { x: Math.min(Math.max(0, x), maxX), y: Math.min(Math.max(0, y), maxY) };
      } else {
        const { left, top, right, bottom } = bounds;
        return {
          x: Math.min(Math.max(left, x), right),
          y: Math.min(Math.max(top, y), bottom),
        };
      }
    },
    [bounds, getSize]
  );

  const start = useCallback((ev: PointerEvent | MouseEvent) => {
    if (disabled) return;
    const e = ev as PointerEvent;
    (e.target as Element)?.setPointerCapture?.(e.pointerId ?? 0);
    draggingRef.current = true;
    originRef.current = { pointerX: e.clientX, pointerY: e.clientY, startX: pos.x, startY: pos.y };
    onStart?.();
  }, [disabled, pos.x, pos.y, onStart]);

  const move = useCallback((ev: PointerEvent | MouseEvent) => {
    if (!draggingRef.current || disabled || !originRef.current) return;
    const e = ev as PointerEvent;
    const dx = e.clientX - originRef.current.pointerX;
    const dy = e.clientY - originRef.current.pointerY;
    const next = clamp(originRef.current.startX + dx, originRef.current.startY + dy);
    setPos(next);
    onMove?.(next);
  }, [disabled, clamp, onMove]);

  const end = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    originRef.current && onEnd?.(pos);
    originRef.current = null;
  }, [onEnd, pos]);

  useEffect(() => {
    if (disabled) return;
    const onPointerMove = (e: PointerEvent) => move(e);
    const onPointerUp = () => end();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [move, end, disabled]);

  const bindStart = useCallback((e: React.PointerEvent | React.MouseEvent) => {
    if (disabled) return;
    const ev = e.nativeEvent as unknown as PointerEvent;
    start(ev);
  }, [start, disabled]);

  return { pos, setPos, bindStart };
}
