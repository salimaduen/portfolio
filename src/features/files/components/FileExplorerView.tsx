import { IoMdRefresh } from "react-icons/io";
import { FaFolder } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

import FileExplorerPlacesLocation from "./FileExplorerPlacesLocation";
import { MenuBar, NavControls, AddressField } from "@app/ui";

export default function FileExplorerView() {
  const fileExplorerBar = ["File", "Edit", "View", "Go", "Help"];
  const fileExplorerLocations = [
    "Documents",
    "Music",
    "Pictures",
    "Videos",
    "Downloads",
  ];

  const folderContents = [
    { name: "Projects", icon: <FaFolder className="text-yellow-400" /> },
    { name: "Resume.pdf", icon: <FaFileAlt className="text-red-600" /> },
    { name: "Portfolio", icon: <FaFolder className="text-yellow-400" /> },
    { name: "Pictures", icon: <FaFolder className="text-yellow-400" /> },
    { name: "Music", icon: <FaFolder className="text-yellow-400" /> },
  ];

  return (
    <>
      {/* Top Menu */}
      <MenuBar items={fileExplorerBar} />

      {/* Nav Bar */}
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

      {/* Main Body */}
      <div className="flex flex-row h-full text-black overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[30%] min-w-[140px] border-r border-gray-300 bg-gray-50 p-2 text-sm overflow-y-auto">
          <p className="font-medium text-gray-700 mb-1">Places</p>
          <div className="flex flex-col pl-1 space-y-1">
            <div className="flex items-center space-x-1">
              <IoHomeOutline className="text-gray-600" />
              <p>salimaduen</p>
            </div>
            {fileExplorerLocations.map((location) => (
              <FileExplorerPlacesLocation key={location} locationName={location} />
            ))}
          </div>

          <p className="font-medium text-gray-700 mt-3 mb-1">Network</p>
          <div className="flex items-center space-x-1 pl-1">
            <CiGlobe className="bg-purple-400 text-white rounded-full p-[2px]" size={14} />
            <p className="text-xs text-gray-700">Browse Network</p>
          </div>
        </div>

        {/* RIGHT CONTENT PANE */}
        <div className="flex-1 bg-white p-3 sm:p-4 overflow-auto">
          <div
            className="
              grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6
              gap-3 sm:gap-4 place-items-center select-none
            "
          >
            {folderContents.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center hover:brightness-110 transition cursor-default"
              >
                {/* Shrink icon size on smaller screens */}
                <div className="flex items-center justify-center text-[32px] sm:text-[40px] md:text-[48px]">
                  {item.icon}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-700 mt-1 text-center truncate w-16 sm:w-20 md:w-24">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
