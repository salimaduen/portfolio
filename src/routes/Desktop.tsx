import TopBar from "@features/desktop/components/TopBar";
import DesktopSurface from "@features/desktop/components/DesktopSurface";
import { Dock } from "@features/desktop";
import { OSIcon } from "@app/ui";
import { Window } from "@features/desktop";

import { WindowManagerProvider, useWindows } from "@app/context/WindowManager";
import { APP_CATALOG, AppId } from "@app/models/appCatalog";

import BrowserView from "@features/browser/components/BrowserView";
import FileExplorerView from "@features/files/components/FileExplorerView";
import ExplorerTopBar from "@features/files/components/ExplorerTopBar";

import ProjectsPage from "@app/pages/ProjectPage";

function DesktopInner() {
  const { open, focus } = useWindows();

  // Desktop icons
  const desktopIcons: AppId[] = ["resume", "github", "linkedin", "files"];

  const onOpen = (id: AppId) => {
    if (id === "files") { open("files"); focus("files"); return; }
    if (id === "github") { window.open("https://github.com/salimaduen", "_blank"); return; }
    if (id === "linkedin") { window.open("https://www.linkedin.com/in/salomon-aduen", "_blank"); return; }
    open("browser"); focus("browser");
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <TopBar dataAttribute="data-desktop-topbar" />
      <DesktopSurface>
        <Dock autoTopFromSelector="[data-desktop-topbar]" pinned={["browser", "files"]} />

        {/* Desktop icons */}
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

        {/* Windows (one-liners now) */}
        <Window id="browser" title="home" variant="dark">
          <BrowserView address="about:projects" Page={ProjectsPage} />
        </Window>

        <Window
          id="files"
          title="Home"
          renderTopBar={({ onClose, onMinimize, onToggleMaximize }) => (
            <ExplorerTopBar
              onClose={onClose}
              onMinimize={onMinimize}
              onToggleMaximize={onToggleMaximize}
            />
          )}
        >
          <FileExplorerView />
        </Window>
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
