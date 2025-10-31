import React from "react";
import { getWindowBorderStyling } from "../utils/windowBorder";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
  className?: string; // allow per-window overrides
};

export default function WindowContainer({ children, zIndex = 20, className = "" }: Props) {
  return (
    <div
      className={`
        ${getWindowBorderStyling()}
        flex flex-col bg-white fixed
        /* Mobile: full width/height-ish */
        left-0 right-0 mx-auto top-12 w-[96vw] h-[78vh]
        /* Desktop: your centered classic window */
        sm:left-1/2 sm:-translate-x-1/2 sm:top-20 sm:w-[80vw] sm:h-[60vh]
        lg:w-[70vw]
        ${className}
      `}
      style={{ zIndex }}
      role="dialog"
    >
      {children}
    </div>
  );
}
