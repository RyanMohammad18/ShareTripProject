
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't let React Query retry ON TOP of your manual retry
      retry: false,

      // Show cached data for 30s before considering it stale
      staleTime: 30_000,

      // Keep unused cache for 5 min
      gcTime: 5 * 60 * 1000,

      // Don't refetch when window regains focus (flaky API = unnecessary pain)
      refetchOnWindowFocus: false,
    },
  },
});