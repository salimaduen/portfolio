// src/components/WindowChrome.tsx
import React from "react";
import { VscChromeMaximize } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa6";

type WindowChromeProps = {
  title: string;
  variant?: "light" | "dark";
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximizeToggle?: () => void;
};

function CircleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex items-center justify-center
        rounded-full bg-gray-300
        w-6 h-6        /* larger tap target on mobile */
        sm:w-5 sm:h-5  /* original size from sm+ */
      "
    >
      {children}
    </div>
  );
}

/** Clickable div (no <button> layout side-effects) */
function CircleControl({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      title={title}
      onClick={onClick}
      onKeyDown={onKey}
      className="cursor-pointer focus:outline-none"
    >
      <CircleWrapper>{children}</CircleWrapper>
    </div>
  );
}

export default function WindowChrome({
  title,
  variant = "light",
  onClose,
  onMinimize,
  onMaximizeToggle,
}: WindowChromeProps) {
  const barColor =
    variant === "dark"
      ? "bg-neutral-900 text-neutral-100"
      : "bg-gray-200 text-gray-700";

  return (
    <div
      className={`
        flex relative w-full
        h-8 sm:h-6                 /* taller on mobile for finger comfort */
        items-center justify-end px-2 ${barColor}
      `}
    >
      <p className="absolute inset-0 text-center truncate select-none text-sm sm:text-xs">
        {title}
      </p>
      <div className="flex space-x-3">
        <CircleControl title="Minimize" onClick={onMinimize}>
          <FaRegWindowMinimize size={14} color="gray" />
        </CircleControl>
        <CircleControl title="Maximize" onClick={onMaximizeToggle}>
          <VscChromeMaximize size={16} color="gray" />
        </CircleControl>
        <CircleControl title="Close" onClick={onClose}>
          <IoMdClose size={16} color="gray" />
        </CircleControl>
      </div>
    </div>
  );
}
