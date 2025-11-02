import React, { createContext, useContext, useMemo, useState } from "react";
import type { AppId } from "@/models/appCatalog";

export type WinState = { open: boolean; minimized: boolean; z: number };
type WindowMap = Partial<Record<AppId, WinState>>;

type CtxT = {
  get: (id: AppId) => WinState;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  focus: (id: AppId) => void;
  topZ: number;
  openOrder: AppId[]; // track open apps for a stable dock ordering
};

const Ctx = createContext<CtxT | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [wins, setWins] = useState<WindowMap>({});
  const [topZ, setTopZ] = useState(10);
  const [openOrder, setOpenOrder] = useState<AppId[]>([]);

  const ensure = (id: AppId): WinState => wins[id] ?? { open: false, minimized: false, z: 0 };

  const get = (id: AppId) => ensure(id);

  const open = (id: AppId) => {
    setWins((prev) => {
      const nextTop = topZ + 1;
      setTopZ(nextTop);
      return { ...prev, [id]: { open: true, minimized: false, z: nextTop } };
    });
    setOpenOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const close = (id: AppId) => {
    setWins((prev) => ({ ...prev, [id]: { ...ensure(id), open: false } }));
    setOpenOrder((prev) => prev.filter((x) => x !== id));
  };

  const toggleMinimize = (id: AppId) =>
    setWins((prev) => {
      const cur = ensure(id);
      if (!cur.open) {
        const nextTop = topZ + 1;
        setTopZ(nextTop);
        setOpenOrder((order) => (order.includes(id) ? order : [...order, id]));
        return { ...prev, [id]: { open: true, minimized: false, z: nextTop } };
      }
      return { ...prev, [id]: { ...cur, minimized: !cur.minimized } };
    });

  const focus = (id: AppId) =>
    setWins((prev) => {
      const cur = ensure(id);
      const nextTop = topZ + 1;
      setTopZ(nextTop);
      return { ...prev, [id]: { ...cur, open: true, minimized: false, z: nextTop } };
    });

  const value = useMemo(() => ({ get, open, close, toggleMinimize, focus, topZ, openOrder }), [wins, topZ, openOrder]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWindows() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindows must be used within WindowManagerProvider");
  return ctx;
}
