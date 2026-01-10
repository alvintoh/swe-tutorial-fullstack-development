import { useMutation } from "convex/react";
import { useCallback } from "react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces">;

type Options = {
  onSuccess?: (data: Id<"workspaces">) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        const response = await mutation(values);
        options?.onSuccess?.(response);
      } catch (error) {
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate };
};
