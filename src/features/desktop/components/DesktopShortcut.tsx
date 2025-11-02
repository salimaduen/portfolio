import { APP_CATALOG, AppId } from "@app/models/appCatalog";

export default function DesktopShortcut({
  id,
  onOpen,
}: {
  id: AppId;
  onOpen: (id: AppId) => void;
}) {
  const meta = APP_CATALOG[id];
  return (
    <div
      onClick={() => onOpen(id)}  // single click
      className="flex flex-col items-center w-24 text-white select-none cursor-pointer hover:brightness-110 transition"
      title={meta.name}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(id)}
    >
      <div className="flex items-center justify-center w-16 h-16 relative">
        {meta.desktopIconType}
      </div>
      <p className="mt-2 text-center text-sm drop-shadow-sm">{meta.name}</p>
    </div>
  );
}
