import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";

import { EmojiPopover } from "./emoji-popover";
import { Hint } from "./hint";
import { Button } from "./ui/button";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (emoji: string) => void;
  hideThreadButton?: boolean;
}

export const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton = false,
}: ToolbarProps) => {
  return (
    <div className="absolute top-3 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant="ghost" size="icon-sm" disabled={isPending}>
            <Smile size={4} />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon size={4} />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Edit message">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
              onClick={handleEdit}
            >
              <Pencil size={4} />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Delete message">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
              onClick={handleDelete}
            >
              <Trash size={4} />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};
