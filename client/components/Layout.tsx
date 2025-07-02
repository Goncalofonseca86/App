import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="leirisonda-layout">
      <Sidebar />
      <main className="leirisonda-main">{children}</main>
    </div>
  );
}
