import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_SPIRITS_URL } from "@/shared/config";
import type {
  CaptureRequest,
  CaptureResponse,
  SpiritsList,
} from "@/shared/models";
import { captureRequestSchema, captureResponseSchema } from "@/shared/models";
import { SPIRITS_QUERY_KEY } from "@/entities/spirit/api/queryKeys";

type CaptureSpiritContext = {
  previousSpirits?: SpiritsList;
};

async function captureSpirit(spiritId: string): Promise<CaptureResponse> {
  const requestBody: CaptureRequest = { spiritId };

  captureRequestSchema.parse(requestBody);

  const response = await fetch(API_SPIRITS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Failed to capture spirit: ${response.statusText}`
    );
  }

  const data = await response.json();
  const validatedData = captureResponseSchema.parse(data);

  return validatedData;
}

/**
 * Mutation hook for capturing spirits with optimistic UI updates.
 *
 * Purpose: Sends capture request to API with instant UI feedback and proper rollback on failure.
 *
 * Returns: Mutation object with mutate function, isPending state, and error handling.
 *
 * Error behavior: No automatic retry (retry: false). Rolls back optimistic update and returns error to caller for UI display.
 *
 * Notes: Mock API has 30% error rate and 2.5s delay. Optimistic update shows "Captured" immediately, then confirms or reverts.
 */
export function useCaptureSpirit() {
  const queryClient = useQueryClient();

  return useMutation<CaptureResponse, Error, string, CaptureSpiritContext>({
    mutationFn: captureSpirit,
    retry: false,

    onMutate: async (spiritId: string) => {
      await queryClient.cancelQueries({ queryKey: SPIRITS_QUERY_KEY });

      const previousSpirits =
        queryClient.getQueryData<SpiritsList>(SPIRITS_QUERY_KEY);

      if (previousSpirits) {
        const optimisticSpirits = previousSpirits.map((spirit) =>
          spirit.id === spiritId
            ? { ...spirit, status: "Captured" as const }
            : spirit
        );

        queryClient.setQueryData<SpiritsList>(
          SPIRITS_QUERY_KEY,
          optimisticSpirits
        );
      }

      return { previousSpirits };
    },

    onSuccess: (data) => {
      const previousSpirits =
        queryClient.getQueryData<SpiritsList>(SPIRITS_QUERY_KEY);

      if (previousSpirits) {
        const updatedSpirits = previousSpirits.map((spirit) =>
          spirit.id === data.spirit.id ? data.spirit : spirit
        );

        queryClient.setQueryData<SpiritsList>(
          SPIRITS_QUERY_KEY,
          updatedSpirits
        );
      }
    },

    onError: (_error, _spiritId, context) => {
      if (context?.previousSpirits) {
        queryClient.setQueryData<SpiritsList>(
          SPIRITS_QUERY_KEY,
          context.previousSpirits
        );
      }
    },
  });
}
