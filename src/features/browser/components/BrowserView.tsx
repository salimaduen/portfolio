import React from "react";
import { GrPrevious, GrNext, GrUp } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import { MenuBar, NavControls, AddressField } from "@app/ui";

type BrowserViewProps = {
  title?: string;
  address?: string;
  Page?: React.ComponentType<any>;
  pageProps?: any;
  content?: React.ReactNode;
  url?: string;
};

export default function BrowserView({
  address,
  Page,
  pageProps,
  content,
  url,
}: BrowserViewProps) {
  const showIframe = Boolean(url && !Page && !content);

  return (
    <>
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
    </>
  );
}
