import type { IconTypes } from "@app/ui/OSIcon";

export type AppId = "browser" | "files" | "resume" | "github" | "linkedin" | "projects" | "welcome";

export type AppMeta = {
  id: AppId;
  name: string;
  dockIconType: IconTypes;
  desktopIconType: IconTypes;
};

export const APP_CATALOG: Record<AppId, AppMeta> = {
  browser:  { id: "browser",  name: "Browser",  dockIconType: "Browser",  desktopIconType: "Browser" },
  files:    { id: "files",    name: "Files",    dockIconType: "Files",    desktopIconType: "Files" },
  resume:   { id: "resume",   name: "Resume",   dockIconType: "PDF",      desktopIconType: "PDF" },
  github:   { id: "github",   name: "GitHub",   dockIconType: "GitHub",   desktopIconType: "GitHub" },
  linkedin: { id: "linkedin", name: "LinkedIn", dockIconType: "Linkedin", desktopIconType: "Linkedin" },
  projects: { id: "projects", name: "projects", dockIconType: "Browser", desktopIconType: "Browser" },
  welcome:  { id: "welcome", name: "welcome", dockIconType: "Browser", desktopIconType: "Browser" },
};
