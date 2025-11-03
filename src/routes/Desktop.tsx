import { useEffect } from "react";
import TopBar from "@features/desktop/components/TopBar";
import DesktopSurface from "@features/desktop/components/DesktopSurface";
import { Dock } from "@features/desktop";
import { Window } from "@features/desktop";

import { WindowManagerProvider, useWindows } from "@app/context/WindowManager";
import { AppId } from "@app/models/appCatalog";
import { DesktopShortcut } from "@features/desktop";

import BrowserView from "@features/browser/components/BrowserView";
import FileExplorerView from "@features/files/components/FileExplorerView";
import ExplorerTopBar from "@features/files/components/ExplorerTopBar";

import ProjectsPage from "@app/pages/ProjectPage";
import HomePage from "@app/pages/HomePage";
import OSWelcomePage from "@app/pages/OSWelcomePage";
import ResumePage from "@app/pages/ResumePage";

import SelectionArea from "@app/features/desktop/components/SelectionArea";

function DesktopInner() {
  const { open, focus } = useWindows();

  // Desktop icons
  const desktopIcons: AppId[] = ["resume", "github", "linkedin", "files", "projects"];

  const onOpen = (id: AppId) => {
    if (id === "files") { open("files"); focus("files"); return; }
    if (id === "github") { window.open("https://github.com/salimaduen", "_blank"); return; }
    if (id === "linkedin") { window.open("https://www.linkedin.com/in/salomon-aduen", "_blank"); return; }
    if (id === "resume") { open("resume"); focus("resume"); return; }
    if (id === "projects") { open("projects"); focus("projects"); return; }
    open("browser"); focus("browser");
  };

  useEffect(() => {
    open("welcome");
    focus("welcome");
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <TopBar dataAttribute="data-desktop-topbar" />
      <DesktopSurface>
        <SelectionArea className="z-[1]" />
        <Dock autoTopFromSelector="[data-desktop-topbar]" pinned={["browser", "files"]} />

        {/* Desktop icons */}
        <div className="absolute left-16 top-4 space-y-4">
          {desktopIcons.map((id) => (
            <DesktopShortcut key={id} id={id} onOpen={onOpen} />
          ))}
        </div>

        {/* Windows (one-liners now) */}
        <Window id="browser" title="home" variant="dark">
          <BrowserView address="about:home" Page={HomePage} />
        </Window>

        <Window id="welcome" title="Welcome" variant="dark">
          <BrowserView address="about:welcome" Page={OSWelcomePage} />
        </Window>

        <Window id="resume" title="resume" variant="dark">
          <BrowserView address="about:resume" Page={ResumePage} />
        </Window>

        <Window id="projects" title="projects" variant="dark">
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
