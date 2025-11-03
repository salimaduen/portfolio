import { FaGithub, FaLinkedin } from "react-icons/fa6";
import pdf from "@app/assets/pdf.png";
import folder from "@app/assets/folder.png";

export type IconTypes = "Linkedin" | "Generic" | "GitHub" | "PDF" | "Browser" | "Files";

type Props = {
  type: IconTypes;
  variant?: "desktop" | "dock";
  sizePx?: number;
  className?: string;
};

export default function OSIcon({ type, variant = "desktop", sizePx, className }: Props) {
  const isDock = variant === "dock";
  const px = sizePx ?? (isDock ? 34 : 64);

  switch (type) {
    case "Linkedin":
      return <>
        <div className='bg-white rounded-lg w-14 h-14 absolute'></div>
        <FaLinkedin className='relative' color='#0077B5' size={64} />
      </>
    case "GitHub":
      return <>
        <div className='bg-black rounded-full w-16 h-16 absolute'></div>
        <FaGithub className='relative' color='white' size={64} />
      </>
    case "PDF":
      return <img src={pdf} alt="PDF" style={{ width: px, height: px }} className={`-translate-x-1 ${className}`} />;
    case "Files":
      return <img src={folder} alt="Folder" style={{ width: px, height: px }} className={className} />;
    case "Browser":
      // placeholder circle; swap to real logo later
      return (
        <div
          className={className}
          style={{
            width: px,
            height: px,
            borderRadius: px / 2,
            background: "rgba(255,255,255,0.2)",
          }}
        />
      );
    case "Generic":
    default:
      return <img src={folder} alt="Icon" style={{ width: px, height: px }} className={className} />;
  }
}
