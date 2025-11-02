import { FaFolder } from "react-icons/fa6";

export default function CustomFolder() {
    return (
        <div className="flex relative w-5 h-5">
            <FaFolder className="absolute text-rose-800" />
            <FaFolder size={13} className="absolute text-gray-500 transform -scale-x-125 bottom-1 left-[1.4px]" />
        </div>
    );
}