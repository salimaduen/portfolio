import { IconTypes } from "../../../ui/OSIcon";
import OSIcon from "../../../ui/OSIcon";

export interface DesktopIconProps {
  iconType: IconTypes;
  label: string;
  onOpen: () => void;
}

export default function DesktopIcon({ iconType, label, onOpen }: DesktopIconProps) {
  return (
    <div
      className="
        flex flex-col items-center w-24
        text-white select-none cursor-pointer
        hover:brightness-110 transition
      "
      onClick={onOpen}
      title={label}
    >
      <div className="flex items-center justify-center w-16 h-16 relative">
        <OSIcon type={iconType} variant="desktop" />
      </div>
      <p className="mt-2 text-center text-sm drop-shadow-sm">{label}</p>
    </div>
  );
}
