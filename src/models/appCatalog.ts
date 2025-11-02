import type { IconTypes } from "@app/ui/OSIcon";

export type AppId = "browser" | "files" | "resume" | "github" | "linkedin";

export type AppMeta = {
  id: AppId;
  name: string;
  /** Store icon TYPES, not JSX, so we choose size at render time */
  dockIconType: IconTypes;
  desktopIconType: IconTypes;
};

export const APP_CATALOG: Record<AppId, AppMeta> = {
  browser:  { id: "browser",  name: "Browser",  dockIconType: "Browser",  desktopIconType: "Browser" },
  files:    { id: "files",    name: "Files",    dockIconType: "Files",    desktopIconType: "Files" },
  resume:   { id: "resume",   name: "Resume",   dockIconType: "PDF",      desktopIconType: "PDF" },
  github:   { id: "github",   name: "GitHub",   dockIconType: "GitHub",   desktopIconType: "GitHub" },
  linkedin: { id: "linkedin", name: "LinkedIn", dockIconType: "Linkedin", desktopIconType: "Linkedin" },
};
