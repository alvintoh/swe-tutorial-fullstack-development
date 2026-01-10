"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";

import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    // TODO: Clear form
  };

  const handleSubmit = async () => {
    const data = await mutate(
      {
        name: "Workspace 1",
      },
      {
        onSuccess: (data) => {},
        onError: (error) => {},
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value=""
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g 'Work', 'Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false} onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
