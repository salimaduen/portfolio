import { IoMdRefresh } from "react-icons/io";
import { FaFolder } from "react-icons/fa6";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

import FileExplorerPlacesLocation from "./FileExplorerPlacesLocation";
import WindowContainer from "./WindowContainer";
import MenuBar from "./MenuBar";
import NavControls from "./NavControls";
import AddressField from "./AddressField";
import WindowChrome from "./WindowChrome";

export default function FileExplorer() {
  const fileExplorerBar = ["File", "Edit", "View", "Go", "Help"];
  const fileExplorerLocations = ["Documents", "Music", "Pictures", "Videos", "Downloads"];

  return (
    <WindowContainer draggable zIndex={10}>
      {/* Top bar (keep your exact layout/buttons) */}
      <WindowChrome title="Home" variant="light" />

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
        {/* Left sidebar */}
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

        {/* Right content pane */}
        <div className="flex w-full border-2">
          <p className="text-black p-2">Second Box?</p>
        </div>
      </div>
    </WindowContainer>
  );
}
