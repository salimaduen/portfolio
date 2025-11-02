import React from "react";

export default function NavControls({ children }: { children: React.ReactNode }) {
  return <div className="flex space-x-2 opacity-60">{children}</div>;
}
