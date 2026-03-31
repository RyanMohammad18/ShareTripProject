// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { setupQueryPersister } from './queryPersister';
import { toastStore } from './toastStore';
import { normalizeError } from '../types/errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30_000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Global error handler — catches ALL query failures, shows toast
// No useEffect, no component-level error handling needed
queryClient.getQueryCache().subscribe((event) => {
  if (event.type !== 'updated' || event.action.type !== 'error') return;

  const error = event.action.error as Error;
  const appError = normalizeError(error);

  // Abort → null → no toast
  if (!appError) return;

  toastStore.add({
    type: 'error',
    message: appError.message,
    hint: appError.hint,
  });
});

// Persistence
setupQueryPersister(queryClient, 'products');