import { IoMdClose } from "react-icons/io";
import { getWindowBorderStyling } from "../utils/windowBorder";


export default function BrowserComponent() {
    return (
        <div className={`flex flex-col fixed top-20 left-1/2 transform -translate-x-1/2 w-[80vw] h-[60vh] bg-white z-20 ${getWindowBorderStyling()}`}>
            {/* Window top bar */}
            <div className="flex bg-gradient-to-r from-[#001f3f] to-[#0074D9] to-[#1e90ff] w-full h-6 items-center justify-end px-1">
                <div className="bg-[#C0C0C0] shadow-2xl border-l-[1px] border-l-gray-400 border-t-[1px] border-t-gray-300 border-r-[1px] border-r-gray-700 border-b-[1px] border-gray-800">
                  <IoMdClose color="black" />  
                </div>
            </div>
            {/* Content inside ? */}
            <div className="m-2 text-black">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    );
}