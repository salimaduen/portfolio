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
      return (
        <div className="relative flex items-center justify-center">
          {/* Gradient background circle */}
          <div
            className="absolute rounded-full"
            style={{
              width: px,
              height: px,
              background:
                "radial-gradient(circle at 30% 30%, #FFB900 0%, #FF7139 45%, #E33F0E 100%)",
            }}
          />
          {/* Firefox logo overlay (white flame silhouette) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="relative"
            width={px * 0.8}
            height={px * 0.8}
            fill="white"
          >
            <path d="M255.8 32C139.6 32 64 118.9 64 223.8c0 73.9 37.6 136.9 95.4 174.7 1.2.8 2.6.2 3.2-1.1 8.2-18.8 13.8-38.5 15.9-58.9.1-1.3-.7-2.4-2-2.7-28.8-6.3-50.5-30.9-50.5-61.3 0-34.7 28.3-63 63-63 6.6 0 12.9 1 18.9 2.9 1.3.4 2.6-.3 3.1-1.6 13.6-35.2 47.5-59.8 86.4-59.8 52 0 94.3 42.3 94.3 94.3 0 49.3-37.8 90.4-86.5 94.1-1.5.1-2.9-.9-3.1-2.4-1.1-7.3-7.3-12.8-14.8-12.8-8.3 0-15 6.7-15 15 0 36.3 29.5 65.8 65.8 65.8 67.2 0 121.8-54.6 121.8-121.8C448 120.8 362 32 255.8 32z" />
          </svg>
        </div>
      );
    case "Generic":
    default:
      return <img src={folder} alt="Icon" style={{ width: px, height: px }} className={className} />;
  }
}
