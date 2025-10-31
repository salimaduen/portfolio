import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { FaRegWindowMinimize, FaFolder } from "react-icons/fa6";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

import FileExplorerPlacesLocation from "./FileExplorerPlacesLocation";
import WindowContainer from "./WindowContainer";
import MenuBar from "./MenuBar";
import NavControls from "./NavControls";
import AddressField from "./AddressField";

interface CircleWrapperProps { children: React.ReactNode; }
function CircleWrapper({ children }: CircleWrapperProps) {
  return <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">{children}</div>;
}

export default function FileExplorer() {
  const fileExplorerBar = ["File", "Edit", "View", "Go", "Help"];
  const fileExplorerLocations = ["Documents", "Music", "Pictures", "Videos", "Downloads"];

  return (
    <WindowContainer zIndex={10}>
      {/* Top bar (keep your exact layout/buttons) */}
      <div className="flex relative bg-gray-200 w-full h-6 items-center justify-end px-2">
        <p className="absolute inset-0 text-center text-gray-700">Home</p>
        <div className="flex space-x-3">
          <CircleWrapper><FaRegWindowMinimize size={12} color="gray" /></CircleWrapper>
          <CircleWrapper><VscChromeMaximize color="gray" /></CircleWrapper>
          <CircleWrapper><IoMdClose color="gray" /></CircleWrapper>
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
