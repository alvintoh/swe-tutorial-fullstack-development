"use client";

import { useEffect, useState } from "react";
import { useDefaultLayout, type LayoutStorage } from "react-resizable-panels";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

const cookieStorage: LayoutStorage = {
  getItem(key: string) {
    if (typeof document === "undefined") {
      return null;
    }
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === key) {
        return value;
      }
    }
    return null;
  },
  setItem(key: string, value: string) {
    if (typeof document === "undefined") {
      return;
    }
    document.cookie = `${key}=${value}; path=/;`;
  },
};

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "ca-workspace-layout",
    storage: cookieStorage,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          orientation="horizontal"
          defaultLayout={defaultLayout}
          onLayoutChange={onLayoutChanged}
        >
          <ResizablePanel
            id="sidebar"
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id="content" minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
