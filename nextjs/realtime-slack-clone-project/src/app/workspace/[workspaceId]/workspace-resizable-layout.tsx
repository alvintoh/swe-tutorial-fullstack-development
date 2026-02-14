"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceResizableLayoutProps {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  groupId: string;
}

export function WorkspaceResizableLayout({
  children,
  defaultLayout,
  groupId,
}: WorkspaceResizableLayoutProps) {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      defaultLayout={defaultLayout}
      id={groupId}
      onLayoutChange={(layout) => {
        document.cookie = `${groupId}=${JSON.stringify(layout)}; path=/;`;
      }}
    >
      <ResizablePanel
        id="sidebar"
        defaultSize={defaultLayout?.[0] ?? 20}
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
  );
}
