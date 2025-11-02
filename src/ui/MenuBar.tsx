import React from "react";

type Props = { items: string[]; className?: string };

export default function MenuBar({ items, className = "" }: Props) {
  return (
    <div className={`flex pl-1 space-x-4 items-center w-full h-4 border border-gray-300 ${className}`}>
      {items.map((label) => (
        <p key={label} className="text-gray-700 text-xs select-none">{label}</p>
      ))}
    </div>
  );
}
