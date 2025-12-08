import { QueryClient } from "@tanstack/react-query";
import { retryDelayMs } from "@/shared/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: retryDelayMs,
    },
  },
});
