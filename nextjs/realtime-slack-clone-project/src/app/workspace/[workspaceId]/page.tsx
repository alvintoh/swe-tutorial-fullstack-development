"use client";

import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useGetChannels } from "@/features/channels/api/use-get-channel";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || !workspace || !channelId) {
      return;
    }

    router.replace(`/workspace/${workspaceId}/channel/${channelId}`);
  }, [channelId, workspaceLoading, channelsLoading, workspace, router, workspaceId]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || !workspace || channelId) {
      return;
    }

    setOpen(true);
  }, [channelId, workspaceLoading, channelsLoading, workspace, setOpen]);

  if (workspaceLoading || channelsLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default WorkspaceIdPage;
