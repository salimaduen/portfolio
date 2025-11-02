import React from "react";
import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa6";

function CircleWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">{children}</div>;
}

export default function ExplorerTopBar({
  onMinimize,
  onToggleMaximize,
  onClose,
}: {
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
}) {
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div className="relative bg-gray-200 w-full h-6 px-2">
      {/* Drag strip excluding right controls */}
      <div className="absolute inset-y-0 left-0 right-24 z-20" data-window-drag-handle />
      <div className="relative z-10 flex w-full h-full items-center justify-end" onPointerDown={stop}>
        <p className="absolute inset-0 text-center text-gray-700 truncate select-none pointer-events-none">Home</p>
        <div className="flex space-x-3">
          <div className="cursor-pointer" title="Minimize" onClick={onMinimize}>
            <CircleWrapper><FaRegWindowMinimize size={12} color="gray" /></CircleWrapper>
          </div>
          <div className="cursor-pointer" title="Maximize" onClick={onToggleMaximize}>
            <CircleWrapper><VscChromeMaximize color="gray" /></CircleWrapper>
          </div>
          <div className="cursor-pointer" title="Close" onClick={onClose}>
            <CircleWrapper><IoMdClose color="gray" /></CircleWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
