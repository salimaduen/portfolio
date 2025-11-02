import React, { useState } from "react";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FiLock } from "react-icons/fi";

import { WindowChrome } from "@features/desktop";
import { WindowContainer } from "@features/desktop";
import { MenuBar } from "@app/ui";
import { NavControls } from "@app/ui";
import { AddressField } from "@app/ui";

type BrowserProps = {
  title?: string;
  address?: string;
  Page?: React.ComponentType<any>;
  pageProps?: any;
  content?: React.ReactNode;
  url?: string;
  onClose?: () => void; // parent should unmount this window
};

export default function BrowserComponent({
  title = "Browser",
  address,
  Page,
  pageProps,
  content,
  url,
  onClose,
}: BrowserProps) {
  const [isMax, setIsMax] = useState(false);
  const showIframe = Boolean(url && !Page && !content);

  return (
    <WindowContainer draggable zIndex={20} maximized={isMax} maximizedWithinTopbarSelector="[data-desktop-topbar]">
      <WindowChrome
        title={title}
        variant="dark"
        onClose={onClose}
        isMaximized={isMax}
        onToggleMaximize={() => setIsMax((v) => !v)}
      />

      <MenuBar items={["File", "Edit", "View", "Go", "Help"]} />

      {/* Nav row */}
      <div className="flex pl-2 space-x-2 bg-gray-200 w-full h-6 items-center">
        <NavControls>
          <GrPrevious color="gray" />
          <GrNext color="gray" />
          <GrUp color="gray" />
          <IoHomeOutline color="gray" />
        </NavControls>

        <AddressField
          leftIcon={<FiLock className="text-gray-500" />}
          text={address || url || (Page ? "about:page" : content ? "about:content" : "about:blank")}
          rightIcon={<IoMdRefresh color="gray" />}
        />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto">
        {Page ? (
          <Page {...pageProps} />
        ) : content ? (
          content
        ) : showIframe ? (
          <iframe
            title="Static page"
            src={url}
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="p-4 text-sm text-neutral-600">No content.</div>
        )}
      </div>
    </WindowContainer>
  );
}
