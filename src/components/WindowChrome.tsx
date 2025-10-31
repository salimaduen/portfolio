import React from "react";
import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa6";

type WindowChromeProps = {
  title: string;
  variant?: "light" | "dark";
  onClose?: () => void;
};

function CircleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
      {children}
    </div>
  );
}

export default function WindowChrome({ title, variant = "light", onClose }: WindowChromeProps) {
  const barColor = variant === "dark" ? "bg-neutral-900 text-neutral-100" : "bg-gray-200 text-gray-700";

  // helper: prevent drag when clicking controls
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div
      className={`flex relative w-full h-6 items-center justify-end px-2 ${barColor}`}
      data-window-drag-handle
    >
      {/* Title overlays the bar but won't block drag or clicks */}
      <p className="absolute inset-0 text-center truncate select-none pointer-events-none">
        {title}
      </p>

      {/* Controls — prevent their pointerdown from bubbling to the drag handle */}
      <div className="flex space-x-3" onPointerDown={stop}>
        <div className="cursor-pointer" title="Minimize">
          <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
            <FaRegWindowMinimize size={12} color="gray" />
          </div>
        </div>
        <div className="cursor-pointer" title="Maximize">
          <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
            <VscChromeMaximize color="gray" />
          </div>
        </div>
        <div className="cursor-pointer" title="Close" onClick={onClose}>
          <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
            <IoMdClose color="gray" />
          </div>
        </div>
      </div>
    </div>
  );
}
