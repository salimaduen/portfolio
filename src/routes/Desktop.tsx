import { IoMdArrowDropdown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import { FaVolumeHigh } from "react-icons/fa6";
import IconComponent from "../components/IconComponent";
import { getFormattedDate } from "../utils/dateUtils";
import FileExplorer from "../components/FileExplorer";
import BrowserComponent from "../components/BrowserComponent";
import { useState } from "react";

export default function Desktop() {
    const [f, setF ] = useState<boolean>(false);

    const handleClick = () => {
        setF(true);
    }

    return (
        <div className="flex flex-col h-screen w-screen">
            {/* Desktop top bar - Icons like wifi, shutdown, etc */}
            <div className="flex flex-row h-8 w-full items-center justify-between bg-black text-white">
                <div className="pl-2">

                </div>
                <div className="flex flex-row items-center space-x-4">
                    <BsThreeDots />
                    <p>{getFormattedDate()}</p>
                    <div className="flex flex-row space-x-3 pr-2">
                        <LuNetwork />
                        <FaVolumeHigh />
                        <RiShutDownLine />
                        <IoMdArrowDropdown />
                    </div>
                </div>
            </div>

            {/* Desktop contents - Icons, file explorer, etc */}
            <div className='bg-ubuntu-wallpaper-phone bg-cover w-full h-full'>
                <div className="">
                    {true && (
                       <FileExplorer /> 
                    )}
                </div>
                <div>
                    {true && (
                       <BrowserComponent /> 
                    )}
                </div>
                <div className="pt-4 pl-2">
                    <IconComponent iconType={"PDF"} iconName={"folder"} handleClick={handleClick}/>
                </div>
            </div>
        </div>

    );
}
