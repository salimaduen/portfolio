import { APP_CATALOG, AppId } from "@app/models/appCatalog";
import { OSIcon } from "@app/ui";

type Props = {
  id: AppId;
  onOpen: (id: AppId) => void;
  /** Optional overrides */
  label?: string;
  sizePx?: number;          // default 64
  className?: string;
};

export default function DesktopShortcut({
  id,
  onOpen,
  label,
  sizePx = 64,
  className = "",
}: Props) {
  const meta = APP_CATALOG[id];
  const name = label ?? meta.name;

  const handleActivate = () => onOpen(id);

  return (
    <div
      onClick={handleActivate}
      className={`flex flex-col items-center w-24 text-white select-none cursor-pointer hover:brightness-110 transition ${className}`}
      title={name}
      role="button"
      aria-label={name}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleActivate();
      }}
    >
      <div
        className="flex items-center justify-center relative"
        style={{ width: sizePx, height: sizePx }}
        // TODO: implement shortcut dragging
        draggable={false}
      >
        <OSIcon type={meta.desktopIconType} variant="desktop" sizePx={sizePx} />
      </div>
      <p className="mt-2 text-center text-sm drop-shadow-sm">{name}</p>
    </div>
  );
}
