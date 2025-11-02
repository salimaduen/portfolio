import React, { useState } from "react";
import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { FaRegWindowMinimize, FaFolder } from "react-icons/fa6";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

import FileExplorerPlacesLocation from "./FileExplorerPlacesLocation";
import { WindowContainer } from "@features/desktop";
import { MenuBar } from "@app/ui";
import { NavControls } from "@app/ui";
import { AddressField } from "@app/ui";

function CircleWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">{children}</div>;
}

type Props = {
  onClose?: () => void;
  onMinimize?: () => void;
};

export default function FileExplorer({ onClose, onMinimize }: Props) {
  const [isMax, setIsMax] = useState(false);
  const fileExplorerBar = ["File", "Edit", "View", "Go", "Help"];
  const fileExplorerLocations = ["Documents", "Music", "Pictures", "Videos", "Downloads"];

  const stopDrag = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <WindowContainer draggable zIndex={10} maximized={isMax}>
      {/* Top bar */}
      <div className="relative bg-gray-200 w-full h-6 px-2">
        <div className="absolute inset-y-0 left-0 right-24 z-20" data-window-drag-handle />
        <div className="relative z-10 flex w-full h-full items-center justify-end">
          <p className="absolute inset-0 text-center text-gray-700 truncate select-none pointer-events-none">
            Home
          </p>
          <div className="flex space-x-3" onPointerDown={stopDrag}>
            {/* Minimize */}
            <div className="cursor-pointer" title="Minimize" onClick={onMinimize}>
              <CircleWrapper><FaRegWindowMinimize size={12} color="gray" /></CircleWrapper>
            </div>

            {/* Maximize/Restore */}
            <div className="cursor-pointer" title={isMax ? "Restore" : "Maximize"} onClick={() => setIsMax(v => !v)}>
              <CircleWrapper><VscChromeMaximize color="gray" /></CircleWrapper>
            </div>

            {/* Close */}
            <div className="cursor-pointer" title="Close" onClick={onClose}>
              <CircleWrapper><IoMdClose color="gray" /></CircleWrapper>
            </div>
          </div>
        </div>
      </div>

      <MenuBar items={fileExplorerBar} />

      {/* Nav row */}
      <div className="flex pl-2 space-x-2 bg-gray-200 w-full h-6 items-center">
        <NavControls>
          <GrPrevious color="gray" />
          <GrNext color="gray" />
          <GrUp color="gray" />
          <IoHomeOutline color="gray" />
        </NavControls>

        <AddressField
          leftIcon={<FaFolder size={12} color="#FFB800" />}
          text="/home/salimaduen/"
          rightIcon={<IoMdRefresh color="gray" />}
        />
      </div>

      {/* Body panes */}
      <div className="flex flex-row h-full text-black">
        <div className="w-[70%] h-full border-2">
          <p className="pl-1">Places</p>
          <div className="flex flex-col pl-2">
            <div className="flex items-center">
              <IoHomeOutline />
              <p className="pl-1">salimaduen</p>
            </div>
            {fileExplorerLocations.map((location) => (
              <FileExplorerPlacesLocation key={location} locationName={location} />
            ))}
          </div>
          <p className="pl-1">Network</p>
          <div className="flex pl-2">
            <CiGlobe className="bg-purple-400 rounded-full" />
            <p className="text-xs pl-1">Browse Network</p>
          </div>
        </div>

        <div className="flex w-full border-2">
          <p className="text-black p-2">Second Box?</p>
        </div>
      </div>
    </WindowContainer>
  );
}
