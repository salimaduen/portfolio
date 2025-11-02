// Old icons
import { FaGithub, FaLinkedin, FaRegFilePdf } from "react-icons/fa6";
import { BsFillFilePdfFill, BsFillFileEarmarkPdfFill } from "react-icons/bs";
import pdf from '../assets/pdf.png';
import folder from '../assets/folder.png';

export type IconTypes = 'Linkedin' | 'Generic' | 'GitHub' | 'PDF';

function getIconComponent(iconName: IconTypes, textContent: string, handleClick: () => void) {
    let logoSrc;

    switch (iconName) {
        case ('Linkedin'):
            logoSrc = (
                <>
                    <div className='bg-white rounded-lg w-14 h-14 absolute'></div>
                    <FaLinkedin className='relative' color='#0077B5' size={64} />
                </>
            );
            break;
        case ('GitHub'):
            logoSrc = (
                <>
                    <div className='bg-black rounded-full w-16 h-16 absolute'></div>
                    <FaGithub className='relative' color='white' size={64} />
                </>
            );
            break;
        case ('PDF'):
            logoSrc = (
                <>
                    <img className="w-16 h-16 object-contain -translate-x-1" src={pdf} alt="Pdf icons created by Dimitry Miroliubov - Flaticon" />
                </>
            );
            break;
        case ('Generic'):
        default:
            logoSrc = (
                <>
                   <img className="w-16 h-16 object-contain" src={folder} alt="Generic folder icon" /> 
                </>
            );
            break;
    }

    return (
        <div className='flex flex-col items-center w-24' onClick={handleClick}>
            {/* <img className="bg-white w-16 h-16 object-contain rounded-lg" src={imgSrc} alt="Folder Icon" /> */}
            <div className='flex relative items-center justify-center'>
                {logoSrc}
            </div>
            <p className="mt-2 text-center text-white">{textContent}</p>
        </div>
    );
}

export interface IconComponentProps {
    iconType: IconTypes;
    iconName: string;
    handleClick: () => void;
}

export default function DesktopIcon({ iconType, iconName, handleClick }: IconComponentProps) {
    return (
        <>
            {getIconComponent(iconType, iconName, handleClick)}
        </>
    );
}
