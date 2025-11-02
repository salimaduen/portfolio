import React from "react";

type Props = {
  leftIcon?: React.ReactNode;
  text: string;
  rightIcon?: React.ReactNode;
  className?: string;
};

export default function AddressField({ leftIcon, text, rightIcon, className = "" }: Props) {
  return (
    <div
      className={`flex justify-between pl-1 bg-white h-[80%] w-[70%] md:w-[80%]
                  rounded-sm border border-gray-300 items-center ${className}`}
    >
      <div className="flex items-center gap-2 pl-1">
        {leftIcon}
        <p className="text-gray-700 text-xs truncate">{text}</p>
      </div>
      <div className="pr-1 opacity-60">{rightIcon}</div>
    </div>
  );
}
