import React, { createContext, useContext, useMemo, useState } from "react";
import type { AppId } from "@app/models/appCatalog";

export type XY = { x: number; y: number };

export type WinState = {
  open: boolean;
  minimized: boolean;
  z: number;
  pos: XY;
};

type WindowMap = Partial<Record<AppId, WinState>>;

type CtxT = {
  get: (id: AppId) => WinState;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  focus: (id: AppId) => void;
  setPosition: (id: AppId, pos: XY) => void;
  topZ: number;
  openOrder: AppId[]; // stable dock ordering of opened apps
};

const Ctx = createContext<CtxT | null>(null);

// Default state for any window we haven't seen yet
const defaultWin = (): WinState => {
  if (typeof window === "undefined") {
    // Fallback for SSR
    return { open: false, minimized: false, z: 0, pos: { x: 96, y: 96 } };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Default window size (same as WindowContainer)
  const winW = vw * 0.8;
  const winH = vh * 0.6;

  // Insets: top bar & dock
  const topbar = document.querySelector("[data-desktop-topbar]") as HTMLElement | null;
  const dock = document.querySelector("[data-desktop-dock]") as HTMLElement | null;

  const insetTop = topbar ? topbar.getBoundingClientRect().height : 0;
  const insetLeft = dock ? dock.getBoundingClientRect().width : 0;

  // Center within usable space
  const usableW = vw - insetLeft;
  const usableH = vh - insetTop;

  const x = insetLeft + (usableW - winW) / 2;
  const y = insetTop + (usableH - winH) / 2;

  return {
    open: false,
    minimized: false,
    z: 0,
    pos: { x: Math.max(insetLeft, x), y: Math.max(insetTop, y) },
  };
};

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [wins, setWins] = useState<WindowMap>({});
  const [topZ, setTopZ] = useState(10);
  const [openOrder, setOpenOrder] = useState<AppId[]>([]);

  const ensure = (id: AppId): WinState => wins[id] ?? defaultWin();

  const get = (id: AppId) => ensure(id);

  const bumpZ = () => {
    const next = topZ + 1;
    setTopZ(next);
    return next;
  };

  const open = (id: AppId) => {
    const z = bumpZ();
    setWins((prev) => {
      const cur = prev[id] ?? defaultWin();
      return { ...prev, [id]: { ...cur, open: true, minimized: false, z } };
    });
    setOpenOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const close = (id: AppId) => {
    setWins((prev) => {
      const cur = ensure(id);
      return { ...prev, [id]: { ...cur, open: false, minimized: false } };
    });
    setOpenOrder((prev) => prev.filter((x) => x !== id));
  };

  const toggleMinimize = (id: AppId) => {
    setWins((prev) => {
      const cur = ensure(id);
      // If not open, treat as open (like your current behavior)
      if (!cur.open) {
        const z = bumpZ();
        setOpenOrder((order) => (order.includes(id) ? order : [...order, id]));
        return { ...prev, [id]: { ...cur, open: true, minimized: false, z } };
      }
      // Toggle minimized; keep z and pos
      return { ...prev, [id]: { ...cur, minimized: !cur.minimized } };
    });
  };

  const focus = (id: AppId) => {
    const z = bumpZ();
    setWins((prev) => {
      const cur = ensure(id);
      return { ...prev, [id]: { ...cur, open: true, minimized: false, z } };
    });
  };

  const setPosition = (id: AppId, pos: XY) => {
    setWins((prev) => {
      const cur = ensure(id);
      // Don’t change z/minimized/open here—just store the last known position
      return { ...prev, [id]: { ...cur, pos } };
    });
  };

  const value = useMemo(
    () => ({ get, open, close, toggleMinimize, focus, setPosition, topZ, openOrder }),
    [wins, topZ, openOrder]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWindows() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindows must be used within WindowManagerProvider");
  return ctx;
}
