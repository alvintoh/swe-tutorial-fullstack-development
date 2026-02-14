"use client";

import { useDefaultLayout } from "react-resizable-panels";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "ca-workspace-layout",
    storage: typeof window !== "undefined" ? localStorage : undefined,
  });

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          orientation="horizontal"
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
        >
          <ResizablePanel
            id="sidebar"
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <div> Channels Sidebar </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id="main">Two</ResizablePanel>
        </ResizablePanelGroup>
        {children}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
