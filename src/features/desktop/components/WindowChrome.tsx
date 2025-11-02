import React from "react";
import { VscChromeMaximize, VscChromeRestore } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa6";

type WindowChromeProps = {
  title: string;
  variant?: "light" | "dark";
  onClose?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onMinimize?: () => void;          // 👈 NEW
};

function CircleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
      {children}
    </div>
  );
}

export default function WindowChrome({
  title,
  variant = "light",
  onClose,
  isMaximized = false,
  onToggleMaximize,
  onMinimize,
}: WindowChromeProps) {
  const barColor = variant === "dark" ? "bg-neutral-900 text-neutral-100" : "bg-gray-200 text-gray-700";
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div className={`relative w-full h-6 ${barColor}`}>
      <div className="absolute inset-y-0 left-0 right-24 z-20" data-window-drag-handle />
      <div className="relative z-10 flex w-full h-full items-center justify-end px-2">
        <p className="absolute inset-0 text-center truncate select-none pointer-events-none">{title}</p>

        <div className="flex space-x-3" onPointerDown={stop}>
          {/* Minimize */}
          <div className="cursor-pointer" title="Minimize" onClick={onMinimize}>
            <CircleWrapper><FaRegWindowMinimize size={12} color="gray" /></CircleWrapper>
          </div>

          {/* Maximize / Restore */}
          <div className="cursor-pointer" title={isMaximized ? "Restore" : "Maximize"} onClick={onToggleMaximize}>
            <CircleWrapper>
              {isMaximized ? <VscChromeRestore color="gray" /> : <VscChromeMaximize color="gray" />}
            </CircleWrapper>
          </div>

          {/* Close */}
          <div className="cursor-pointer" title="Close" onClick={onClose}>
            <CircleWrapper><IoMdClose color="gray" /></CircleWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
