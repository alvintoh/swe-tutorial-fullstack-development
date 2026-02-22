import dynamic from "next/dist/shared/lib/dynamic";
import Quill from "quill/core/quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className="px-5 w-full">
      <Editor
        placeholder={placeholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};
