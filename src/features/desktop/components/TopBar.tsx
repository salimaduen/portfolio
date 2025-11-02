import { BsThreeDots } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useClock } from "@app/hooks/useClock";
import { formatTopbarTime } from "@utils/dateUtils";

type Props = {
  /** Pass a data attribute name to mark this as the desktop topbar (for Dock/window insets) */
  dataAttribute?: string; // e.g., "data-desktop-topbar"
};

export default function TopBar({ dataAttribute }: Props) {
  const now = useClock(); // ticks every minute by default
  const passthrough = dataAttribute ? { [dataAttribute]: true } : {};

  return (
    <div
      className="flex flex-row h-8 w-full items-center justify-between bg-black text-white"
      {...passthrough}
    >
      <div className="pl-2" />
      <div className="flex flex-row items-center space-x-4">
        <BsThreeDots />
        <p>{formatTopbarTime(now)}</p>
        <div className="flex flex-row space-x-3 pr-2">
          <LuNetwork />
          <FaVolumeHigh />
          <RiShutDownLine />
          <IoMdArrowDropdown />
        </div>
      </div>
    </div>
  );
}
