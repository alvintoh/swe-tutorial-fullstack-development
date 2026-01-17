"use client";

import { useParams } from "next/navigation";

const WorkspaceIdPage = () => {
  const { workspaceId } = useParams();
  return <div>ID: {workspaceId}</div>;
};

export default WorkspaceIdPage;
