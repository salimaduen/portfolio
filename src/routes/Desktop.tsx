import React from "react";
import TopBar from "../features/desktop/components/TopBar";
import DesktopSurface from "../features/desktop/components/DesktopSurface";
import { Dock } from "../features/desktop";
import OSIcon from "../ui/OSIcon";

import { WindowManagerProvider, useWindows } from "../context/WindowManager";
import { APP_CATALOG, AppId } from "../models/appCatalog";

import { BrowserComponent } from "../features/browser";
import { FileExplorer } from "../features/files";
import ProjectsPage from "../pages/ProjectPage";

function DesktopInner() {
  const { get, open, close, toggleMinimize, focus } = useWindows();

  // Desktop icons are independent of the Dock; define them here:
  const desktopIcons: AppId[] = ["resume", "github", "linkedin", "files"];

  const onOpen = (id: AppId) => {
    if (id === "files") {
      open("files");
      focus("files");
      return;
    }
    if (id === "github") {
      window.open("https://github.com/salimaduen", "_blank");
      return;
    }
    if (id === "linkedin") {
      window.open("https://www.linkedin.com/in/salomon-aduen", "_blank");
      return;
    }
    // Resume or others -> open Browser (you can route inside the Browser later)
    open("browser");
    focus("browser");
  };

  const bringToFront = (id: AppId) => focus(id);

  return (
    <div className="flex flex-col h-screen w-screen">
      <TopBar dataAttribute="data-desktop-topbar" />

      <DesktopSurface>
        <Dock autoTopFromSelector="[data-desktop-topbar]" pinned={["browser", "files"]} />

        {/* Desktop icons (independent list) */}
        <div className="absolute left-16 top-4 space-y-4">
          {desktopIcons.map((id) => {
            const meta = APP_CATALOG[id];
            return (
              <div
                key={id}
                onClick={() => onOpen(id)}
                className="flex flex-col items-center w-24 text-white select-none cursor-pointer hover:brightness-110 transition"
                title={meta.name}
              >
                <div className="flex items-center justify-center w-16 h-16 relative">
                  <OSIcon type={meta.desktopIconType} variant="desktop" sizePx={64} />
                </div>
                <p className="mt-2 text-center text-sm drop-shadow-sm">{meta.name}</p>
              </div>
            );
          })}
        </div>

        {/* WINDOWS — render only if open & not minimized */}
        {(() => {
          const s = get("browser");
          if (!s.open || s.minimized) return null;
          return (
            <div onMouseDown={() => bringToFront("browser")} style={{ zIndex: s.z }}>
              <BrowserComponent
                title="home"
                address="about:projects"
                Page={ProjectsPage}
                onClose={() => close("browser")}
              />
            </div>
          );
        })()}

        {(() => {
          const s = get("files");
          if (!s.open || s.minimized) return null;
          return (
            <div onMouseDown={() => bringToFront("files")} style={{ zIndex: s.z }}>
              <FileExplorer
                onClose={() => close("files")}
              />
            </div>
          );
        })()}
      </DesktopSurface>
    </div>
  );
}

export default function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopInner />
    </WindowManagerProvider>
  );
}
