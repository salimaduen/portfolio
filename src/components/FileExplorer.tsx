import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose, IoMdRefresh } from "react-icons/io";
import { FaRegWindowMinimize, FaFolder } from "react-icons/fa6";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import FileExplorerPlacesLocation from "./FileExplorerPlacesLocation";
import { CiGlobe } from "react-icons/ci";
import { getWindowBorderStyling } from "../utils/windowBorder";

interface CircleWrapperProps {
    children: React.ReactNode;
}

function CircleWrapper({ children }: CircleWrapperProps) {
    return (
        <div className="flex items-center justify-center bg-gray-300 w-5 h-5 rounded-full">
            {children}
        </div>
    )
}

export default function FileExplorer() {
    const fileExplorerBar = ['File', 'Edit', 'View', 'Go', 'Help'];
    const fileExplorerLocations = ['Documents', 'Music', 'Pictures', 'Videos', 'Downloads'];

    return (
        // File explorer outer most layer, dimensions + location in relationship to view port. Z for overlaying
        <div className={`flex flex-col fixed top-20 left-1/2 transform -translate-x-1/2 w-[80vw] h-[60vh] bg-white z-10 ${getWindowBorderStyling()}`}>

            {/* File explorer top most window bar - close, minimize, etc */}
            <div className="flex relative bg-gray-200 w-full h-6 items-center justify-end px-2">
                <p className="absolute inset-0 text-center text-gray-700">Home</p>
                <div className="flex space-x-3">
                    <CircleWrapper>
                        <FaRegWindowMinimize size="12" color="gray" />
                    </CircleWrapper>
                    <CircleWrapper>
                        <VscChromeMaximize color="gray" />
                    </CircleWrapper>
                    <CircleWrapper>
                        <IoMdClose color="gray" />
                    </CircleWrapper>
                </div>
            </div>

            {/* File explorer top bar - file, edit, etc */}
            <div className="flex pl-1 space-x-4 items-center w-full h-4 border-[1px] border-gray-300">
                {fileExplorerBar.map((element, idx) => (
                    <p className="text-gray-700 text-xs" key={idx}>{element}</p>
                ))}
            </div>

            {/* File explorer navigation bar - Left, back, curr dir path, etc */}
            <div className="flex pl-2 space-x-2 bg-gray-200 w-full h-6 items-center">
                <div className="flex space-x-2">
                    <GrPrevious color="gray" />
                    <GrNext color="gray" />
                    <GrUp color="gray" />
                    <IoHomeOutline color="gray" />
                </div>
                <div className="flex justify-between pl-1 bg-white h-[80%] w-[70%] md:w-[80%] rounded-sm border-[1px] border-gray-300 items-center">
                    {/* TODO: add div for larger viewports to include search bar */}
                    <div className="flex items-center space-x-2">
                        <FaFolder size={12} color="#FFB800"/>
                        <p className="text-gray-700 text-xs">/home/salimaduen/</p>
                    </div>
                    <div className="pr-1">
                        <IoMdRefresh color="gray"/>
                    </div>
                </div>
            </div>

            {/* File explorer left and right divisions - Dirs and curr dir */}
            <div className="flex flex-row h-full text-black">
                
                {/* File explorer left side - Places, folders, etc */}
                <div className="w-[70%] h-full border-2">
                    <p className="pl-1">Places</p>
                    <div className="flex flex-col pl-2">
                        <div className="flex items-center">
                            <IoHomeOutline />
                            <p className="pl-1">salimaduen</p>
                        </div>
                        {fileExplorerLocations.map((location) => (
                            <FileExplorerPlacesLocation locationName={location}/>
                        ))}
                    </div>
                    <p className="pl-1">Network</p>
                    <div className="flex pl-2">
                        <CiGlobe className="bg-purple-400 rounded-full"/>  
                        <p className="text-xs pl-1">Browse Network</p>
                    </div>
                </div>
                
                {/* File explorer right side - Display content of curr dir */}
                <div className="flex w-full border-[2px]">
                    <div>
                        
                    </div>
                    <p className="text-black">Second Box?</p>
                    <p>13123</p>
                </div>
            </div>
        </div>
    );
}